import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addToCart = async (productId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    if (token) {
      try {
        const response = await axios.post(
          `${backendUrl}/cart/add-to-cart`,
          { productId, size },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 201) {
          toast.success(response.data.msg);
          getUserCart();
        }
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    } else {
      toast.error("Please Login to continue");
      navigate("/login");
    }
  };

  const getCartCount = () => {
    if (token && cartItems && cartItems.length > 0) return cartItems.length;
    else return 0;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items of cartItems) {
      let itemInfo = products.find(
        (product) => product._id === items.productId
      );
      totalAmount += itemInfo.price * items.quantity;
    }
    return totalAmount;
  };

  const updateQuantity = async (itemId, quantity) => {
    if (token) {
      try {
        const response = await axios.patch(
          `${backendUrl}/cart/update-cart`,
          { itemId, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status == 200) {
          toast.success(response.data.msg);
          getUserCart();
        }
      } catch (error) {
        toast(error?.response?.data?.msg);
      }
    }
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/product/get-all-products`
      );

      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const getUserCart = async () => {
    try {
      const response = await axios.get(`${backendUrl}/cart/get-cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if ((response.status = 200)) {
        setCartItems(response.data);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const deleteItem = async (itemId) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/cart/remove-from-cart/${itemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(response.data.msg);
      getUserCart();
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart();
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    getUserCart,
    deleteItem,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
