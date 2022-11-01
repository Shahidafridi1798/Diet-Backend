import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
import {getAllProducts, addProducts, getProductById, deleteProductById } from "./helper.js";
import { productRouter } from './routes/products.js';

dotenv.config()


const app = express();



const MONGO_URL=process.env.MONGO_URL;
const PORT=process.env.PORT;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  return client;
}

export const client = await createConnection();

app.use(express.json());

app.get("/", (request, response) => {
  response.send("Hello Everyone");
});


app.use('/products', productRouter)

// app.use('/user', userRouter)



app.listen(PORT, () => console.log("Server started on port", PORT));
