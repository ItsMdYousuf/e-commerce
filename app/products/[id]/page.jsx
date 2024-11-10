"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const ProductsDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [mainImage, setMainImage] = useState(""); // Main image state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleAddedCart = () => {
        alert("Added to cart");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                setProduct(result);
                setMainImage(result.thumbnail);
                setLoading(false);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [id]);


    if (loading) {
        return (
            <div className="flex items-center justify-center p-16 h-screen">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
            </div>
        );
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }
    const {
        images,
        title,
        price,
        discountPercentage,
        description,
        thumbnail,
        rating,
        brand,
        tags,
        warrantyInformation,
        returnPolicy,
        shippingInformation,
        reviews,
        availabilityStatus,
    } = product;

    return (
        <div className="px-4">
            <main className="py-6">
                <div className="container py-4 mx-auto gap-8 flex item-center flex-col md:flex-row bg-white shadow-lg rounded-lg">
                    {/* Product Image */}
                    <div className="flex-1">
                        <div className="w-full p-6">
                            <img
                                src={mainImage} // Main image changes here
                                alt={title}
                                className="w-full h-60 lg:h-96 object-contain rounded-lg"
                            />
                        </div>
                        <div className="mt-6 flex justify-center gap-6 mx-auto">
                            {images?.length
                                ? images.map((imageItem, index) => (
                                    <div
                                        key={index}
                                        className="p-2 shadow-md cursor-pointer"
                                        onClick={() => setMainImage(imageItem)} // Clicking the thumbnail changes the main image
                                    >
                                        <img
                                            className="w-24 h-24 object-contain"
                                            src={imageItem}
                                            alt=""
                                        />
                                    </div>
                                ))
                                : null}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="w-full flex-2 md:w-1/2 p-6 flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-4">{title}</h1>
                            <p className="text-gray-600 mb-4">{description}</p>

                            <div className="flex items-center mb-4">
                                <span className="text-2xl font-bold text-gray-900">
                                    ${price}
                                </span>
                                <span className="text-gray-500 ml-4 text-sm line-through">
                                    ${price + price * (discountPercentage / 100)}
                                </span>
                            </div>

                            <div className="flex space-x-4 mb-6">
                                <button
                                    onClick={() => handleAddedCart(product)}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                >
                                    Add to Cart
                                </button>
                                <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400">
                                    Wishlist
                                </button>
                            </div>
                            {/* Rating */}
                            <div className="flex flex-col gap-4">
                                <h3>
                                    <span className="font-semibold">Brand:</span>
                                    {brand}
                                </h3>{" "}
                                <h3>
                                    <span className="font-semibold">Availability Status :</span>
                                    {availabilityStatus}
                                </h3>{" "}
                                {/* here rating component */}
                                <h3>
                                    {" "}
                                    <span className="font-semibold">
                                        Warranty Information:
                                    </span>{" "}
                                    {warrantyInformation}
                                </h3>{" "}
                                <h3>
                                    <span className="font-semibold">
                                        Shipping Information:{" "}
                                    </span>
                                    {shippingInformation}
                                </h3>{" "}
                                <h3>
                                    <span className="font-semibold">Return Policy: </span>
                                    {returnPolicy}
                                </h3>{" "}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductsDetails;
