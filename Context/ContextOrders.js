import React, { useCallback, useState } from "react";

const OrdersContext = React.createContext({});

const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const getOrder = useCallback(
    (order) => {
      setOrders((prev) => [...prev, order]);
    },
    [setOrders]
  );

  const deleteOrder = (id) => {
    const filteredOrders = orders.filter((order) => order.id !== id);
    setOrders(filteredOrders);
  };

  return (
    <OrdersContext.Provider value={{ orders, getOrder, deleteOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export { OrdersContext, OrdersProvider };
