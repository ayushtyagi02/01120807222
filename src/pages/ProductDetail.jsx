import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_URL = 'http://20.244.56.144/test/companies';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem('authToken');

      try {
        const response = await axios.get(`${API_URL}/product/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{product.productName}</h1>
      <p className="mb-2">Price: ${product.price}</p>
      <p className="mb-2">Rating: {product.rating}</p>
      <p className="mb-2">Discount: {product.discount}%</p>
      <p className="mb-2">Availability: {product.availability}</p>
     
    </div>
  );
};

export default ProductDetail;
