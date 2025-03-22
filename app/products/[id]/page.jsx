"use client";
import { Context } from "@/app/context/AddToCart";
import Button from "@/components/Buttons/Button";
import Title from "@/components/Title";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

// Variants for container and items
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ProductsDetails = ({ singleProduct }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState(""); // Main image state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { handleAddToCart } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setProduct(result);

        // Set the main image to the first image or thumbnail
        setMainImage(
          result?.images?.[0] || result.thumbnail || "/fallback-image.jpg",
        );
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center p-16">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed dark:border-violet-600"></div>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const {
    images = [],
    title = "Unknown Title",
    price = 0,
    discountPercentage = 0,
    description = "No description available.",
    thumbnail = "/fallback-image.jpg", // Default image
    rating = 0,
    brand = "Unknown Brand",
    tags = [],
    warrantyInformation = "No warranty information.",
    returnPolicy = "No return policy.",
    shippingInformation = "No shipping information.",
    reviews = [],
    availabilityStatus = "Unavailable",
  } = product;

  return (
    <motion.div
      className="px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <main className="py-6">
        <motion.div
          className="container mx-auto flex flex-col gap-8 rounded-lg bg-white py-6 shadow-2xl md:flex-row"
          variants={itemVariants}
        >
          {/* Product Image Section */}
          <motion.div className="flex-1" variants={itemVariants}>
            <div className="w-full p-6">
              <motion.img
                src={mainImage || "/fallback-image.jpg"} // Use mainImage or fallback
                alt={title}
                className="h-60 w-full rounded-lg object-contain lg:h-96"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="mx-auto mt-6 flex justify-center gap-4">
              {images.map((img, index) => (
                <motion.img
                  key={index}
                  src={img || "/fallback-image.jpg"}
                  alt={`${title} - ${index + 1}`}
                  className="h-16 w-16 cursor-pointer rounded-lg border object-cover hover:shadow-md"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </motion.div>

          {/* Product Details Section */}
          <motion.div
            className="flex-2 flex w-full flex-col justify-between p-6 md:w-1/2"
            variants={itemVariants}
          >
            <div>
              <h1 className="mb-4 text-3xl font-bold">{title}</h1>
              <p className="mb-4 text-gray-600">{description}</p>

              <div className="mb-4 flex items-center">
                <span className="text-2xl font-bold text-gray-900">
                  ${price}
                </span>
                <span className="ml-4 text-sm text-gray-500 line-through">
                  ${(price + price * (discountPercentage / 100)).toFixed(2)}
                </span>
              </div>

              <div className="mb-6 flex space-x-4">
                <Button onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
                <button className="rounded-lg bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400">
                  Wishlist
                </button>
              </div>
              {/* Additional Details */}
              <div className="space-y-2">
                <h3>
                  <span className="font-semibold">Brand: </span>
                  {brand}
                </h3>
                <h3>
                  <span className="font-semibold">Availability: </span>
                  {availabilityStatus}
                </h3>
                <h3>
                  <span className="font-semibold">Warranty: </span>
                  {warrantyInformation}
                </h3>
                <h3>
                  <span className="font-semibold">Shipping: </span>
                  {shippingInformation}
                </h3>
                <h3>
                  <span className="font-semibold">Return Policy: </span>
                  {returnPolicy}
                </h3>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Reviews Section */}
        <motion.section variants={itemVariants} className="mt-10">
          <Title titleName="Customer Reviews" className="mb-6" />
          <AnimatePresence>
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="mx-auto mb-6 w-[200px] rounded-lg bg-gray-50 p-6 shadow-md xl:w-[500px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
                      {review.reviewerName?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold capitalize">
                        {review.reviewerName}
                      </h2>
                      <p className="text-xs text-gray-500">
                        {review.reviewerEmail}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <FaStar key={i} className="text-yellow-500" size={18} />
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
                <div className="mt-3 text-right">
                  <p className="text-xs text-gray-400">
                    Reviewed on: {review.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.section>
      </main>
    </motion.div>
  );
};

export default ProductsDetails;
