import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv'

dotenv.config()
console.log(process.env)

const app = express();
const PORT = 5000;


const MONGO_URL="mongodb://localhost"

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  return client;
}

const client = await createConnection();

app.use(express.json());

app.get("/", (request, response) => {
  response.send("Hello Everyone");
});

app.get("/products", async (request, response) => {
  const product = await client
    .db("DietSuggestions")
    .collection("Diet")
    .find(request.query)
    .toArray();
  response.send(product);
});

app.get("/products/:id", async (request, response) => {
  const { id } = request.params;
  const product = await client
    .db("DietSuggestions")
    .collection("Diet")
    .findOne({ id: id });
  product
    ? response.send(product)
    : response.status(404).send({ message: "No product found" });
});

// app.get("/", (request, response) =>  {
//     response.send("Hello Everyone")
// });

// //specify movie router

// // app.use('/movies', moviesRouter)

// app.use('/user', userRouter)

app.post("/products", async (request, response) => {
  const newProducts = request.body;
  console.log(newProducts);
//   db.movies.insertMany(products);

  const result = await client
    .db("DietSuggestions")
    .collection("Diet")
    .insertMany(newProducts);
     response.send(result);
});

app.listen(PORT, () => console.log("Server started on port", PORT));
