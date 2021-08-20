import { OrdersContext } from "./ContextOrders";
import { useContext } from "react";

export const useOrders = () => {
  const order = useContext(OrdersContext);
  return order;
};
