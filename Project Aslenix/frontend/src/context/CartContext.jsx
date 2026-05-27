import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

/**
 * CartProvider
 * - Wraps entire app
 * - Stores cart globally
 */
export const CartProvider = ({
  children,
}) => {
  const [cartItems, setCartItems] =
    useState([]);

  // LOAD CART FROM LOCALSTORAGE
  useEffect(() => {
    const storedCart =
      localStorage.getItem("cart");

    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // SAVE CART TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // ADD TO CART
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id
      );

      // IF PRODUCT EXISTS
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        );
      }

      // NEW PRODUCT
      return [
        ...prev,
        {
          ...product,
          qty: 1,
        },
      ];
    });
  };

  // REMOVE PRODUCT
  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  // INCREASE QUANTITY
  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item
      )
    );
  };

  // DECREASE QUANTITY
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                qty: item.qty - 1,
              }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // CLEAR CART
  const clearCart = () => {
    setCartItems([]);
  };

  // TOTAL PRICE
  const cartTotal = cartItems.reduce(
    (total, item) =>
      total +
      item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/**
 * useCart Hook
 */
export const useCart = () => {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used within CartProvider"
    );
  }

  return context;
};