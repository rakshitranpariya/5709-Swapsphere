import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import product_image from "../images/product.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import '../css/HomePage.css'
import slider1 from '../images/slider1.png'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomePage() {


  // categories and subcategories feature
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const handleClickEvent = () => {

  }


  const categories = [
    {
      id: 1,
      name: "Home Appliance",
      subcategories: ["Kitchen", "Living Room", "Bedroom", "Bathroom"],
    },
    {
      id: 2,
      name: "Electronics",
      subcategories: [
        "Laptop",
        "Phones",
        "Computer Accessories",
        "Video Games & Consoles",
        "Smart Watch",
      ],
    },
    {
      id: 3,
      name: "Computer Parts",
      subcategories: ["Hard-disk", "Screen", "Keyboards"],
    },
    {
      id: 4,
      name: "Vehile",
      subcategories: ["Car", "Motorcycle", "Bicycle", "Truck"],
    },
    {
      id: 5,
      name: "Furniture",
      subcategories: ["Table", "Chair", "Cabinet", "Bed"],
    },
    {
      id: 6,
      name: "Instruments",
      subcategories: ["Guitar", "Piano", "Violin", "Drums"],
    },
    {
      id: 7,
      name: "Tools",
      subcategories: ["Hand Tools", "Power Tools", "Gardening Tools", "Automotive Tools"]
    }

  ];

  const productListings = [
    {
      id: 1,
      title: "Product 1",
      imageSrc: product_image,
      price: "$100",
      category: "Furniture",
      subcategory: "Table",
    },
    {
      id: 2,
      title: "Product 2",
      imageSrc: product_image,
      price: "$200",
      category: "Furniture",
      subcategory: "Chair",
    },
    {
      id: 3,
      title: "Product 3",
      imageSrc: product_image,
      price: "$300",
      category: "Furniture",
      subcategory: "Bedframe",
    },
    {
      id: 4,
      title: "Product 4",
      imageSrc: product_image,
      price: "$50",
      category: "Sports",
      subcategory: "Football",
    },
    {
      id: 5,
      title: "Product 5",
      imageSrc: product_image,
      price: "$80",
      category: "Sports",
      subcategory: "Tennis Racquet",
    },
    {
      id: 6,
      title: "Product 6",
      imageSrc: product_image,
      price: "$120",
      category: "Sports",
      subcategory: "Bat",
    },
    {
      id: 7,
      title: "Product 7",
      imageSrc: product_image,
      price: "$150",
      category: "Computer Parts",
      subcategory: "Hard-disk",
    },
    {
      id: 8,
      title: "Product 8",
      imageSrc: product_image,
      price: "$250",
      category: "Computer Parts",
      subcategory: "Screen",
    },
    {
      id: 9,
      title: "Product 9",
      imageSrc: product_image,
      price: "$180",
      category: "Computer Parts",
      subcategory: "Keyboards",
    },
    {
      id: 10,
      title: "Product 10",
      imageSrc: product_image,
      price: "$150",
      category: "Furniture",
      subcategory: "Table",
    },
    {
      id: 11,
      title: "Product 11",
      imageSrc: product_image,
      price: "$250",
      category: "Furniture",
      subcategory: "Chair",
    },
    {
      id: 12,
      title: "Product 12",
      imageSrc: product_image,
      price: "$120",
      category: "Sports",
      subcategory: "Football",
    },
    {
      id: 13,
      title: "Product 13",
      imageSrc: product_image,
      price: "$180",
      category: "Sports",
      subcategory: "Tennis Racquet",
    },
    {
      id: 14,
      title: "Product 14",
      imageSrc: product_image,
      price: "$200",
      category: "Computer Parts",
      subcategory: "Hard-disk",
    },
    {
      id: 15,
      title: "Product 15",
      imageSrc: product_image,
      price: "$300",
      category: "Computer Parts",
      subcategory: "Screen",
    },
  ];

  const filteredProductListings = productListings.filter(
    (product) =>
      product.category === selectedCategory &&
      (selectedSubcategory === null || product.subcategory === selectedSubcategory)
  );

  // wishlist feature
  const [wishlist, setWishlist] = useState([]);
  const isWishlisted = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const handleWishlistButtonClick = (product) => {
    if (isWishlisted(product.id)) {
      return;
    }
    handleClick(product);
  };

  const handleClick = (product) => {
    setWishlist([...wishlist, product]);
    console.log(product.title + ' added to wishlist!')
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
    }
    const url = 'http://localhost:8080/wishlist/addproduct';
    const email = "test@12.cs"; // Hardcoded email
    const productID = product.id
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ email: email, productID: productID }) // Replace with your request payload
    };

    fetch(url, requestOptions)
      .then(async (response) => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();
        console.log(data);
        if (response.status === 201 || response.status === 200) {
          toast.success(product.title + ' added to wishlist!');
          console.log(data.message);
        } else {
          toast.error('Failed to add ' + product.title + ' to wishlist!');
        }
      })
      .catch((error) => {
        toast.error('Failed to add ' + product.title + ' to wishlist!');
        console.error('There was an error!', error);
      });
  };


  return (
    <div>
      <Navbar />
      <div className="flex sm:py-12">
        <div className="w-1/5 px-4 py-8">
          {/* Sidebar */}
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  className={`${category.name === selectedCategory
                    ? "bg-gray-200"
                    : "bg-gray-100"
                    } w-full px-4 py-2 rounded-md`}
                  onClick={() => handleCategoryChange(category.name)}
                >
                  {category.name}
                </button>
                {selectedCategory === category.name && (
                  <ul className="pl-5 space-y-2">
                    {category.subcategories.map((subcategory) => (
                      <li key={subcategory}>
                        <button
                          className={`${subcategory === selectedSubcategory
                            ? "bg-gray-200"
                            : "bg-gray-100"
                            } w-full px-6 py-2 rounded-md`}
                          onClick={() => handleSubcategoryChange(subcategory)}
                        >
                          {subcategory}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-4/5 px-4 py-8">
          {/* Product Listing */}
          {selectedCategory && selectedSubcategory ? (
            <h2 className="text-2xl font-bold mb-4">
              Products in {selectedSubcategory}
            </h2>
          ) : (
            <h2 className="text-2xl font-bold mb-4">All Products</h2>
          )}
          <div className="grid grid-cols-3 gap-4">
            {selectedCategory || selectedSubcategory ? (
              filteredProductListings.length > 0 ? (
                filteredProductListings.map((product) => (
                  <div key={product.id}>
                    <Card
                      title={product.title}
                      imageSrc={product.imageSrc}
                      price={product.price}
                    />

                    {/* insert slider 1 image here */}
                    <img src={slider1} alt="Slider 1" />

                    {isWishlisted(product.id) ? (
                      <button disabled className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    ) : (
                      <button onClick={() => handleWishlistButtonClick(product)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )
            ) : (
              productListings.map((product) => (
                <div key={product.id}>
                  <Card
                    title={product.title}
                    imageSrc={product.imageSrc}
                    price={product.price}
                  />
                  {isWishlisted(product.id) ? (
                    <button disabled className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  ) : (
                    <button onClick={() => handleWishlistButtonClick(product)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                      </svg>
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
          <ToastContainer position="bottom-right" />
        </div>
      </div>
    </div>
  );
}
