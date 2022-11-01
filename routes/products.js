import express from "express";
import {
  getAllProducts,
  addProducts,
  getProductById,
  deleteProductById,
} from "../helper.js";

const router = express.Router();
router.get("/", async (request, response) => {
  const product = await getAllProducts(request);
  response.send(product);
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
   const product = await getProductById(id)
  product
    ? response.send(product)
    : response.status(404).send({ message: "No product found" });
});
router.post("/", async (request, response) => {
  const newProducts = request.body;
  console.log(newProducts);
  //   db.movies.insertMany(products);
  const result = await addProducts(newProducts);
  response.send(result);
});

export const productRouter = router;
