// src/components/AddProductForm.js
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const ADD_PRODUCT = gql`
  mutation CreateProduct($productInput: ProductInput!) {
    createProduct(productInput: $productInput) {
      _id
      name
      price
      description
    }
  }
`;

function AddProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [addProduct] = useMutation(ADD_PRODUCT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, price, description } = formData;
      await addProduct({
        variables: {
          productInput: {
            name,
            price: parseFloat(price),
            description,
          },
        },
      });
      // Reset the form after successful submission
      setFormData({
        name: "",
        price: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProductForm;
