"use client"
import { useEffect, useState } from 'react';

export default function Home() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('https://dummyjson.com/products/categories');
            const data = await response.json();
            // Assuming data is an array of objects with keys {slug, name, url}
            const formattedCategories = data.map((item) => ({
                slug: item.slug || item,
                name: item.name || item,
                url: item.url || '',
            }));
            setCategories(formattedCategories);
        };

        fetchCategories();
    }, []);

    // Fetch products based on selected category
    useEffect(() => {
        if (selectedCategory) {
            const fetchProducts = async () => {
                const response = await fetch(
                    `https://dummyjson.com/products/category/${selectedCategory}?sort=${sortOrder}`
                );
                const data = await response.json();
                setProducts(data.products || []);
            };

            fetchProducts();
        }
    }, [selectedCategory, sortOrder]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Product Categories</h1>

            {/* Category Selection */}
            <div className="mb-4">
                <select
                    className="border p-2"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category.slug} value={category.slug}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Sorting Options */}
            <div className="mb-4">
                <button
                    className={`border p-2 ${sortOrder === 'asc' ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => setSortOrder('asc')}
                >
                    Sort Ascending
                </button>
                <button
                    className={`border p-2 ml-2 ${sortOrder === 'desc' ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => setSortOrder('desc')}
                >
                    Sort Descending
                </button>
            </div>

            {/* Product List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="border p-4 rounded">
                        <img
                            src={product.thumbnail}
                            alt="product pic"
                            className="h-1/2 w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                        <h3 className="font-bold">{product.title}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
