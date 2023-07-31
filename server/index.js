// server.js
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://localhost:27017/shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

const Product = mongoose.model("Product", ProductSchema);

const typeDefs = gql`
  type Product {
    _id: ID!
    name: String!
    price: Float!
    description: String!
  }

  input ProductInput {
    name: String!
    price: Float!
    description: String!
  }

  type Query {
    products: [Product]
  }

  type Mutation {
    createProduct(productInput: ProductInput): Product
    deleteProduct(productId: ID!): Boolean
    updateProduct(productId: ID!, productInput: ProductInput): Product
  }
`;
const resolvers = {
  Query: {
    products: async () => {
      return await Product.find();
    },
  },
  Mutation: {
    createProduct: async (_, { productInput }) => {
      const { name, price, description } = productInput;
      const product = new Product({
        name,
        price,
        description,
      });
      await product.save();
      return product;
    },
    deleteProduct: async (_, { productId }) => {
      try {
        await Product.findByIdAndDelete(productId);
        return true;
      } catch (error) {
        console.error("Error deleting product:", error);
        return false;
      }
    },
    updateProduct: async (_, { productId, productInput }) => {
      try {
        const { name, price, description } = productInput;
        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          { name, price, description },
          { new: true } // To return the updated product after the update
        );
        return updatedProduct;
      } catch (error) {
        console.error("Error updating product:", error);
        return null;
      }
    },
  },
};
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  const port = 4000;
  app.listen(port, () => {
    console.log(
      `Server running on http://localhost:${port}${server.graphqlPath}`
    );
  });
}

startServer().catch((error) =>
  console.error("Error starting the server:", error)
);
