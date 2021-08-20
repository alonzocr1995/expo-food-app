// import { AuthContext } from "./ContextProvider";
import { ProductContext } from "./ContextProducts";
import { useContext } from "react";

export const useProduct = () => {
  const product = useContext(ProductContext);
  return product;
};
