import { products } from "../products.js";
export const getProducts = async (req, res) => {
  res.send(products);
};
