"use client";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Context } from "@/app/context/AddToCart";
import Button from "@/components/Buttons/Button";
import Title from "@/components/Title";
import Link from "next/link";

const ProductsDetails = ({ singleProduct }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { handleAddToCart } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setProduct(result);
        setMainImage(result?.images?.[0] || result.thumbnail || "/fallback-image.jpg");
        setLoading(false);

        const relatedResponse = await fetch(
          `https://dummyjson.com/products/category/${result.category}`
        );
        if (!relatedResponse.ok) throw new Error("Failed to fetch related products");
        const relatedResult = await relatedResponse.json();
        setRelatedProducts(relatedResult.products.filter((p) => p.id !== result.id));
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const {
    images = [],
    title,
    price,
    discountPercentage,
    description,
    brand,
    availabilityStatus,
    warrantyInformation,
    shippingInformation,
    returnPolicy,
    reviews
  } = product;

  return (
    <div className="px-16">
      <main className="py-6">
        <div className="item-center container mx-auto flex flex-col gap-8 rounded-lg bg-white py-4 shadow-lg md:flex-row">
          {/* Product Image */}
          <div className="flex-1">
            <div className="w-full p-6">
              <img
                src={mainImage || "/fallback-image.jpg"} // Use mainImage or fallback
                alt={title}
                className="h-60 w-full rounded-lg object-contain lg:h-96"
              />
            </div>
            <div className="mx-auto mt-6 flex justify-center gap-6">
              <div className="mx-auto mt-6 flex justify-center gap-2">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img || "/fallback-image.jpg"} // Use fallback for invalid images
                    alt={`${title} - ${index + 1}`}
                    className="h-16 w-16 cursor-pointer rounded-lg object-cover"
                    onClick={() => setMainImage(img)} // Update main image on click
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-2 flex w-full flex-col justify-between p-6 md:w-1/2">
            <div>
              <h1 className="mb-4 text-3xl font-bold">{title}</h1>
              <p className="mb-4 text-gray-600">{description}</p>

              <div className="mb-4 flex items-center">
                <span className="text-2xl font-bold text-gray-900">
                  ${price}
                </span>
                <span className="ml-4 text-sm text-gray-500 line-through">
                  ${price + price * (discountPercentage / 100)}
                </span>
              </div>

              <div className="mb-6 flex space-x-4">
                <Button
                  onClick={() => handleAddToCart(product)} // Pass product details
                  children="Add to Cart"
                />
                <button className="rounded-lg bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400">
                  Wishlist
                </button>
              </div>
              {/* Rating */}
              <div className="flex flex-col gap-4">
                <h3>
                  <span className="font-semibold">Brand:</span>
                  {brand}
                </h3>
                <h3>
                  <span className="font-semibold">Availability Status :</span>
                  {availabilityStatus}
                </h3>
                {/* here rating component */}
                <h3>
                  <span className="font-semibold">Warranty Information:</span>
                  {warrantyInformation}
                </h3>
                <h3>
                  <span className="font-semibold">Shipping Information: </span>
                  {shippingInformation}
                </h3>
                <h3>
                  <span className="font-semibold">Return Policy: </span>
                  {returnPolicy}
                </h3>
              </div>
            </div>
          </div>
        </div>
        {/* Reviews section */}
        <section>
          <Title titleName="Reviews" className="" />
          <div>
            {reviews.map((review, index) => (
              <div key={index} className="my-2 w-1/2">
                <div className="border-2 border-gray-300 p-2">
                  <div className="flex">
                    <h2 className="leading-1 font-semibold capitalize">
                      {review.reviewerName}
                    </h2>
                    <p className="pl-5 text-gray-600">{review.reviewerEmail}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500">Date: {review.date}</p>
                    <p className="">Comment: {review.comment}</p>
                    <div className="flex items-center">
                      <span className="mr-2 font-semibold">Rating:</span>
                      <div className="flex">
                        {/* Dynamically render stars based on review.rating */}
                        {Array.from({ length: review.rating }, (_, i) => (
                          <FaStar
                            key={i}
                            className="text-yellow-500"
                            size={20}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* Related Products Section */}
        <section className="mt-12 py-8">
          <Title titleName="Related Products" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
            {relatedProducts.map((related) => (
              <div key={related.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                <img src={related.thumbnail || "/fallback-image.jpg"} alt={related.title} className="w-full h-40 object-cover rounded " />
                <Link href={`/products/${id}`} className="mt-4 text-lg font-semibold hover:underline">{related.title}</Link>
                <p className="text-gray-700 mt-2">${related.price.toFixed(2)}</p>
                <Button onClick={() => handleAddToCart(related)} className="mt-4">
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductsDetails;
