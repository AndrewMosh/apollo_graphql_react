// src/App.js
import React from "react";
import ProductList from "./components/ProductList";
import AddProductForm from "./components/AddProductForm";

function App() {
  return (
    <div>
      <h1>Online Shop</h1>
      <ProductList />
      <AddProductForm />
    </div>
  );
}

export default App;
