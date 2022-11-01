import { client } from "./index.js";
import bcrypt from "bcrypt";


export async function getAllProducts(request) {
    return await client.db("DietSuggestions").collection("Diet").find(request.query).toArray();
}
export async function getProductById(id) {
    return await client.db("DietSuggestions").collection("Diet").findOne({ id: id });
}
export async function deleteProductById(id) {
    return await client.db("DietSuggestions").collection("Diet").deleteOne({ id: id });
}
export async function addProducts(newProducts) {
    return await client.db("DietSuggestions").collection("Diet").insertMany(newProducts);
}

export async function updateMovieById(id, updateDiet) {
    return await client.db("DietSuggestions").collection("Diet").updateOne({ id: id }, { $set: updateDiet })
}



// export async function genPassword(password)
// {
//   const salt  = await bcrypt.genSalt(10); //bcrypt.genSalt(no of rounds)
//   console.log(salt)
//   const hashPassword =  await bcrypt.hash(password, salt)
//   return hashPassword
// }


// export async function createUser(username, hashedPassword) {
//     return await client.db("b37wd").collection("users")
//     .insertOne({username: username, password: hashedPassword});
// }


// export async function getUserByName(username) {
//     return await client.db("b37wd").collection("users")
//     .findOne({username: username});
// }