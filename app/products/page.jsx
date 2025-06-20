"use client";

import Filter from "@/components/Filter";
import Title from "@/components/Title";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProductSkeleton from "../../components/ProductSkeleton";
import ProductItem from "./ProductItem";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("price-asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://ecommerce-backend-sand-eight.vercel.app/products",
        );
        const result = await response.json();
        setData(result || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter using the correct key (productCategory)
  const filteredProducts = data
    .filter((product) =>
      selectedCategory === "all"
        ? true
        : product.productCategory === selectedCategory,
    )
    .sort((a, b) => {
      if (sortBy === "price-asc")
        return parseFloat(a.productAmount) - parseFloat(b.productAmount);
      if (sortBy === "price-desc")
        return parseFloat(b.productAmount) - parseFloat(a.productAmount);
      return 0;
    });

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 8, filteredProducts.length));
  };

  return (
    <div className="container mx-auto px-4 pb-12 md:px-6 lg:px-8">
      <title>Modern E-Commerce</title>

      <div className="mb-8 space-y-4">
        <Title
          titleName="Discover Our Products"
          className="text-3xl font-bold text-gray-900 dark:text-white"
        />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Filter
            onCategoryChange={setSelectedCategory}
            onSortChange={setSortBy}
            currentCategory={selectedCategory}
            currentSort={sortBy}
          />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {Math.min(visibleCount, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="col-span-full py-12 text-center">
          <div className="text-2xl font-semibold text-gray-500 dark:text-gray-400">
            No products found
          </div>
          <p className="mt-2 text-gray-400 dark:text-gray-500">
            Try adjusting your filters
          </p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredProducts.slice(0, visibleCount).map((item) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                exit={{ opacity: 0, y: 20 }}
                className="transform transition-all hover:scale-105 hover:shadow-xl"
              >
                <ProductItem
                  singleProduct={{
                    id: item._id,
                    title: item.productTitle,
                    price: parseFloat(item.productAmount),
                    description: item.productDescription,
                    image: item.image, // mapping product image
                    category: item.productCategory,
                    // add other fields as needed
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {!loading && visibleCount < filteredProducts.length && (
        <div className="mt-12 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05, gap: 8 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-medium text-white shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            onClick={handleShowMore}
          >
            <span>Load More</span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Products;
