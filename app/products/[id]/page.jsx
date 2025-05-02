"use client";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State to manage selected image

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:5000/products/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch product: ${res.status}`);
        }
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.image || null); // Initialize selected image
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  // Dummy image URL in case the product doesn't have one.
  const imageUrl = product.image || "https://via.placeholder.com/400";

  // Parse dimensions string into an object
  let dimensions = {};
  try {
    dimensions = JSON.parse(product.dimensions || "{}");
  } catch (e) {
    console.error("Error parsing dimensions:", e);
    dimensions = { length: "N/A", width: "N/A", height: "N/A" };
  }

  // Parse productTags string into an array
  let tags = [];
  try {
    tags = JSON.parse(product.productTags || "[]");
  } catch (e) {
    console.error("Error parsing tags", e);
    tags = [];
  }

  // Handle variants images.  If variants exist, use those images, otherwise, use the main image
  const images =
    product.variants &&
    Array.isArray(product.variants) &&
    product.variants.length > 0
      ? product.variants.flatMap((variant) => variant.images || [])
      : [imageUrl];

  // Ensure images array has at least one element.
  const safeImages = images.length > 0 ? images : [imageUrl];

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Image Section */}
        <div className="w-full">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div className="flex gap-2 overflow-x-auto">
              {safeImages.map((img, index) => (
                <div key={index} className="h-20 w-20 flex-none">
                  <img
                    src={
                      "https://ecommerce-backend-sand-eight.vercel.app" + img
                    }
                    alt={`${product.productTitle} - ${index + 1}`}
                    className="h-full w-full cursor-pointer rounded-lg object-cover"
                    onClick={() => setSelectedImage(img)}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Show selected image.  Use a modal if you want a more interactive experience */}
          {selectedImage && (
            <div className="mt-4 overflow-hidden rounded-lg shadow-lg">
              <img
                src={
                  "https://ecommerce-backend-sand-eight.vercel.app" +
                  selectedImage
                }
                alt={`${product.productTitle} - Selected`}
                className="h-auto w-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            {product.productTitle}
          </h1>
          <div
            className="mb-4 text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: product.productDescription }}
          />
          <p className="mb-4 text-2xl font-semibold text-blue-600 dark:text-blue-400">
            Price: ${product.productAmount}
          </p>

          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Category:</span>{" "}
              {product.productCategory}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Brand:</span>{" "}
              {product.productBrand || "N/A"}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold">SKU:</span> {product.sku}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Stock:</span>{" "}
              {product.stockQuantity}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Dimensions:</span>
              {dimensions.length} x {dimensions.width} x {dimensions.height}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold">Weight:</span> {product.weight} kg
            </p>
            {product.warrantyInfo && (
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Warranty:</span>{" "}
                {product.warrantyInfo}
              </p>
            )}
          </div>
          <div className="mt-4">
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Tags:{" "}
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
