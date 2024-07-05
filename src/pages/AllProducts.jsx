import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'http://20.244.56.144/test/companies';
const COMPANIES = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
const CATEGORIES = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    company: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    availability: ''
  });

  const fetchProducts = async () => {
    const token = localStorage.getItem('token'); 

    try {
      const response = await axios.get(`${API_URL}/${filters.company}/categories/${filters.category}/products`, {
        params: {
          top: 10,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice
        },
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
      setProducts(response.data);
      console.log("this is response");
      console.log(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (filters.company && filters.category) {
      fetchProducts();
    }
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <select name="company" value={filters.company} onChange={handleFilterChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
            <option value="">Select Company</option>
            {COMPANIES.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select name="category" value={filters.category} onChange={handleFilterChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
            <option value="">Select Category</option>
            {CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">Min Price</label>
          <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">Max Price</label>
          <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
        </div>
        <button className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm" onClick={fetchProducts}>Filter</button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(product => (
          <div key={product.productName} className="border border-gray-300 rounded-md p-4">
            <Link to={`/product/${product.productName}`}>
              <h2 className="text-lg font-semibold">{product.productName}</h2>
            </Link>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}%</p>
            <p>Availability: {product.availability}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
