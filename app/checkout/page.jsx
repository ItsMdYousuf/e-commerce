"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import User from "@/components/User";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Banknote,
  CheckCircle,
  CreditCard,
  Gift,
  IndianRupee,
  Loader2,
  Mail,
  MapPin,
  Percent,
  QrCode,
  Smartphone,
  Truck,
  Wallet,
} from "lucide-react";
import { useContext, useState } from "react";
import { Context } from "../context/AddToCart"; // Adjust the path if needed

// Mock Payment Gateway (Replace with actual integration like Stripe, PayPal, etc.)
const processPayment = async (paymentDetails) => {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate payment processing
  if (Math.random() < 0.8) {
    return {
      success: true,
      transactionId: "txn_" + Math.random().toString(36).substring(7),
    };
  } else {
    throw new Error("Payment failed. Please try again.");
  }
};

const Checkout = () => {
  const { addCarts, cartTotal, clearCart } = useContext(Context);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("online"); // Default to online
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [error, setError] = useState(null);
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0); // In cents

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const applyDiscount = () => {
    // Mock discount logic
    if (discountCode === "SAVE10") {
      setDiscountAmount(cartTotal * 0.1); // 10% discount
    } else if (discountCode === "FREESHIP") {
      //  setShippingCost(0); // Assume you have a shipping cost state.
      setDiscountAmount(500); //5$
    } else {
      setError("Invalid discount code.");
      setDiscountAmount(0);
      return;
    }
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!addCarts || addCarts.length === 0) {
      setError("Your cart is empty.");
      setIsSubmitting(false);
      return;
    }

    try {
      let paymentResult = { success: true, transactionId: "CASH_ON_DELIVERY" };
      if (paymentMethod === "online") {
        paymentResult = await processPayment({
          amount: cartTotal - discountAmount,
        });
        if (!paymentResult.success) {
          throw new Error("Payment failed.");
        }
      }

      // Create order object
      const newOrder = {
        customerInfo: {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          postalCode: formData.postalCode,
        },
        items: addCarts.map((item) => ({
          productId: item.id,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
        })),
        total: cartTotal,
        discount: discountAmount,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === "cod" ? "pending" : "completed",
        transactionId: paymentResult.transactionId,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "pending", // Initial status
      };

      // Send order to backend
      const response = await fetch(
        "http://localhost:5000/orders", // Replace with your actual backend endpoint. Use a constant!
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOrder),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save order");
      }

      const savedOrder = await response.json();
      clearCart();
      setOrderConfirmation({
        orderId: savedOrder._id,
        email: formData.email,
      });
    } catch (err) {
      setError(err.message || "An error occurred while processing your order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderOrderConfirmation = () => {
    return (
      <div className="mx-auto max-w-2xl p-6 text-center">
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
        <h2 className="mb-2 text-2xl font-semibold">Order Confirmed!</h2>
        <p className="mb-4 text-gray-600">
          Thank you for your purchase. Your order ID is:
          <span className="font-medium"> {orderConfirmation.orderId}</span>
        </p>
        <p className="mb-6 text-gray-600">
          We've sent a confirmation email to {orderConfirmation.email}.
        </p>
        <Button
          onClick={() => setOrderConfirmation(null)}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Continue Shopping
        </Button>
      </div>
    );
  };

  const renderOrderSummary = () => {
    if (!addCarts || addCarts.length === 0) {
      return <p className="text-gray-500">Your cart is empty.</p>;
    }

    const finalTotal = cartTotal - discountAmount;

    return (
      <>
        {addCarts.map((item) => (
          <div key={item.id} className="mb-4 flex items-center justify-between">
            <div>
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-sm text-gray-500">
                {item.quantity} x ${item.price?.toFixed(2) || "0.00"}
              </p>
            </div>
            <p className="text-right font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
        <div className="mt-4 border-t pt-4">
          {discountAmount > 0 && (
            <div className="flex justify-between text-sm font-medium">
              <span>Discount:</span>
              <span className="text-green-500">
                -${discountAmount.toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${finalTotal?.toFixed(2) || "0.00"}</span>
          </div>
        </div>
      </>
    );
  };

  const renderShippingForm = () => {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label
            htmlFor="name"
            className="mb-1 block flex items-center gap-1.5 text-sm font-medium"
          >
            <User className="h-4 w-4" />
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            name="name"
            required
            placeholder="John Doe"
            className="w-full"
            value={formData.name}
            onChange={handleInputChange}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label
            htmlFor="email"
            className="mb-1 block flex items-center gap-1.5 text-sm font-medium"
          >
            <Mail className="h-4 w-4" />
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            required
            placeholder="john.doe@example.com"
            className="w-full"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label
            htmlFor="address"
            className="mb-1 block flex items-center gap-1.5 text-sm font-medium"
          >
            <MapPin className="h-4 w-4" />
            Shipping Address <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="address"
            name="address"
            required
            placeholder="123 Main St, Anytown, USA"
            className="w-full"
            value={formData.address}
            onChange={handleInputChange}
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="city" className="mb-1 block text-sm font-medium">
              City <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="city"
              name="city"
              required
              className="w-full"
              value={formData.city}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Label htmlFor="country" className="mb-1 block text-sm font-medium">
              Country <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.country}
              onValueChange={(value) =>
                setFormData({ ...formData, country: value })
              }
              disabled={isSubmitting}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USA">United States</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="UK">United Kingdom</SelectItem>
                {/* Add more countries as needed */}
                <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                <SelectItem value="India">India</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label
              htmlFor="postalCode"
              className="mb-1 block text-sm font-medium"
            >
              Postal Code <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="postalCode"
              name="postalCode"
              required
              className="w-full"
              value={formData.postalCode}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </div>
        </div>
        {/* Discount Code */}
        <div>
          <Label
            htmlFor="discountCode"
            className="mb-1 block text-sm font-medium"
          >
            <Percent className="mr-1 inline-block h-4 w-4" />
            Discount Code
          </Label>
          <div className="flex gap-2">
            <Input
              type="text"
              id="discountCode"
              name="discountCode"
              placeholder="Enter code"
              className="w-full"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              disabled={isSubmitting}
            />
            <Button
              type="button"
              onClick={applyDiscount}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              disabled={isSubmitting}
            >
              Apply
            </Button>
          </div>
        </div>

        <div>
          <Label className="mb-2 block text-sm font-medium">
            Payment Method
          </Label>
          <RadioGroup
            defaultValue="online"
            onValueChange={handlePaymentMethodChange}
          >
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="online"
                  id="online"
                  className="peer h-4 w-4 border border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Label
                  htmlFor="online"
                  className="flex items-center gap-1 text-sm font-medium peer-checked:font-semibold"
                >
                  <CreditCard className="h-4 w-4" /> Online Payment
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="cod"
                  id="cod"
                  className="peer h-4 w-4 border border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Label
                  htmlFor="cod"
                  className="flex items-center gap-1 text-sm font-medium peer-checked:font-semibold"
                >
                  <Wallet className="h-4 w-4" /> Cash on Delivery
                </Label>
              </div>
              {/* Add more payment methods here */}
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="mobile_banking"
                  id="mobile_banking"
                  className="peer h-4 w-4 border border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Label
                  htmlFor="mobile_banking"
                  className="flex items-center gap-1 text-sm font-medium peer-checked:font-semibold"
                >
                  <Smartphone className="h-4 w-4" /> Mobile Banking
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="gift_card"
                  id="gift_card"
                  className="peer h-4 w-4 border border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Label
                  htmlFor="gift_card"
                  className="flex items-center gap-1 text-sm font-medium peer-checked:font-semibold"
                >
                  <Gift className="h-4 w-4" /> Gift Card
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="installments"
                  id="installments"
                  className="peer h-4 w-4 border border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Label
                  htmlFor="installments"
                  className="flex items-center gap-1 text-sm font-medium peer-checked:font-semibold"
                >
                  <Banknote className="h-4 w-4" /> Installments
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="qr_code"
                  id="qr_code"
                  className="peer h-4 w-4 border border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Label
                  htmlFor="qr_code"
                  className="flex items-center gap-1 text-sm font-medium peer-checked:font-semibold"
                >
                  <QrCode className="h-4 w-4" /> QR Code Payment
                </Label>
              </div>
              {/* Example of a local payment method */}
              {formData.country === "Bangladesh" && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="bkash"
                    id="bkash"
                    className="peer h-4 w-4 border border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Label
                    htmlFor="bkash"
                    className="flex items-center gap-1 text-sm font-medium peer-checked:font-semibold"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Bikash_logo.svg/800px-Bikash_logo.svg.png"
                      alt="bKash"
                      className="h-4 w-auto"
                    />{" "}
                    bKash
                  </Label>
                </div>
              )}
              {formData.country === "India" && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="upi"
                    id="upi"
                    className="peer h-4 w-4 border border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Label
                    htmlFor="upi"
                    className="flex items-center gap-1 text-sm font-medium peer-checked:font-semibold"
                  >
                    <IndianRupee className="h-4 w-4" /> UPI
                  </Label>
                </div>
              )}
              {formData.country === "USA" && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="paypal"
                    id="paypal"
                    className="peer h-4 w-4 border border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Label
                    htmlFor="paypal"
                    className="flex items-center gap-1 text-sm font-medium peer-checked:font-semibold"
                  >
                    <img
                      src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg"
                      alt="PayPal"
                      className="h-4 w-auto"
                    />{" "}
                    PayPal
                  </Label>
                </div>
              )}
            </div>
          </RadioGroup>
        </div>

        <Button
          type="submit"
          className={cn(
            "w-full bg-blue-600 py-3 text-white transition-colors",
            isSubmitting ? "cursor-wait bg-blue-500" : "hover:bg-blue-700",
          )}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Truck className="mr-2 h-4 w-4" />
              Place Order
            </>
          )}
        </Button>
      </form>
    );
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h2 className="mb-8 text-center text-3xl font-bold">Checkout</h2>
      {orderConfirmation ? (
        renderOrderConfirmation()
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {/* Order Summary */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <CreditCard className="h-5 w-5" />
                Order Summary
              </CardTitle>
              <CardDescription>Review your items and total</CardDescription>
            </CardHeader>
            <CardContent>{renderOrderSummary()}</CardContent>
          </Card>

          {/* Shipping Information Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <MapPin className="h-5 w-5" />
                Shipping Information
              </CardTitle>
              <CardDescription>Enter your shipping details</CardDescription>
            </CardHeader>
            <CardContent>
              {renderShippingForm()}
              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Checkout;
