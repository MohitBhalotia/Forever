import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/cartTotal";
const Cart = () => {
  const {
    products,
    currency,
    updateQuantity,
    cartItems,
    deleteItem,
    navigate,
  } = useContext(ShopContext);
  return (
    <div className="border-t pt-14 ">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartItems.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item.productId
          );

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[3fr_0.5fr_0.3fr_0.8fr] sm:grid-cols-[4fr_1fr_0.5fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20" src={productData.image[0]} />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                className="border text-center max-w-8 sm:max-w-16 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(item._id, Number(e.target.value))
                }
                defaultValue={item.quantity}
              />
              <img
                onClick={() => deleteItem(item._id)}
                className="w-4  sm:w-5 cursor-pointer"
                src={assets.bin_icon}
              />
              <div className="font-semibold text-end text-sm sm:text-lg">
                {currency} {item.quantity*productData.price}
              </div> 
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20 ">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
