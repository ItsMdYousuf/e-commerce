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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Check,
  CheckCircle,
  CreditCard,
  Loader2,
  Mail,
  MapPin,
  User,
} from "lucide-react";
import { useContext, useState } from "react";
import { Context } from "../context/AddToCart";

// Mock Payment Gateway (Replace with actual integration like Stripe)
const processPayment = async (paymentDetails) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // In your Checkout component, modify the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (addCarts.length === 0) {
      setError("Your cart is empty.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Process payment (keep your existing mock implementation)
      const paymentResult = await processPayment({
        amount: cartTotal,
      });

      if (!paymentResult.success) {
        throw new Error("Payment failed.");
      }

      // Create order object
      const newOrder = {
        customerInfo: {
          name: formData.name,
          email: formData.email,
          address: formData.address,
        },
        items: addCarts.map((item) => ({
          productId: item.id,
          title: item.productTitle,
          quantity: item.quantity,
          price: item.unitPrice,
        })),
        total: cartTotal,
        paymentStatus: "completed",
        transactionId: paymentResult.transactionId,
      };

      // Send order to backend
      const response = await fetch(
        "https://ecommerce-backend-sand-eight.vercel.app/orders",
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

  // Update the order confirmation JSX
  if (orderConfirmation) {
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
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h2 className="mb-8 text-center text-3xl font-bold">Checkout</h2>

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
          <CardContent>
            {addCarts.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <>
                {addCarts.map((item) => (
                  <div
                    key={item.id}
                    className="mb-4 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-right font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
                <div className="mt-4 border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block flex items-center gap-1.5 text-sm font-medium"
                >
                  <User className="h-4 w-4" />
                  Full Name <span className="text-red-500">*</span>
                </label>
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
                <label
                  htmlFor="email"
                  className="mb-1 block flex items-center gap-1.5 text-sm font-medium"
                >
                  <Mail className="h-4 w-4" />
                  Email <span className="text-red-500">*</span>
                </label>
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
                <label
                  htmlFor="address"
                  className="mb-1 block flex items-center gap-1.5 text-sm font-medium"
                >
                  <MapPin className="h-4 w-4" />
                  Shipping Address <span className="text-red-500">*</span>
                </label>
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

              <Button
                type="submit"
                className={cn(
                  "w-full bg-blue-600 py-3 text-white transition-colors",
                  isSubmitting
                    ? "cursor-wait bg-blue-500"
                    : "hover:bg-blue-700",
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
                    <Check className="mr-2 h-4 w-4" />
                    Place Order
                  </>
                )}
              </Button>
            </form>
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
    </div>
  );
};

export default Checkout;
