// src/components/EditProductForm.js
import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($productId: ID!, $productInput: ProductInput!) {
    updateProduct(productId: $productId, productInput: $productInput) {
      _id
      name
      price
      description
    }
  }
`;

function EditProductForm({ product, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    // Set the form data with the product details if the product is available
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        description: product.description,
      });
    }
  }, [product]);

  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, price, description } = formData;
      await updateProduct({
        variables: {
          productId: product._id,
          productInput: {
            name,
            price: parseFloat(price),
            description,
          },
        },
      });
      // Handle success (e.g., show a success message or update the product list)
    } catch (error) {
      console.error("Error updating product:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Add a check to render a loading message or null if product is not available yet
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Product Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Save Changes</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default EditProductForm;
