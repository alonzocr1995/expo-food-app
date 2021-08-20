import React, { useCallback, useState } from "react";

const ProductContext = React.createContext({});

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const handleAddProduct = useCallback(
    (product) => {
      setProducts((prev) => {
        const newProducts = [...prev];
        const productIndex = newProducts.findIndex(
          (prod) => prod.id === product.id
        );
        if (productIndex > -1) {
          newProducts[productIndex].quantity =
            newProducts[productIndex].quantity + product.quantity;
          return newProducts;
        }
        return [...prev, product];
      });
    },
    [setProducts]
  );

  const handleProductQuantity = useCallback(
    (id, quantity) => {
      setProducts((prev) => {
        const newProducts = [...prev];
        const productIndex = newProducts.findIndex((prod) => prod.id === id);
        newProducts[productIndex].quantity = quantity;
        return newProducts;
      });
    },
    [setProducts]
  );

  const deleteProduct = useCallback(
    (id) => {
      setProducts((prev) => prev.filter((product, i) => product.id !== id));
    },
    [setProducts]
  );

  const deleteProducts = useCallback(() => {
    setProducts((prev) => []);
  }, [setProducts]);

  return (
    <ProductContext.Provider
      value={{
        products,
        handleAddProduct,
        deleteProduct,
        handleProductQuantity,
        deleteProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
