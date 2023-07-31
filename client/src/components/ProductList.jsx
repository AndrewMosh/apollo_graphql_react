// src/components/ProductList.js
import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import EditProductForm from "./EditProductForm";
const GET_PRODUCTS = gql`
  query {
    products {
      _id
      name
      price
      description
    }
  }
`;
const DELETE_PRODUCT = gql`
  mutation DeleteProduct($productId: ID!) {
    deleteProduct(productId: $productId)
  }
`;
function ProductList() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const handleDelete = async (id) => {
    try {
      await deleteProduct({
        variables: {
          productId: id,
        },
      });
      // Handle success (e.g., show a success message or update the product list)
    } catch (error) {
      console.error("Error deleting product:", error);
      // Handle error (e.g., show an error message)
    }
  };
  return (
    <div>
      {data.products.map((product) => (
        <div key={product._id}>
          <h2>{product.name}</h2>
          <p>Price: ${product.price}</p>
          <p>{product.description}</p>
          <button onClick={() => handleDelete(product._id)}>delete</button>
          <EditProductForm product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
