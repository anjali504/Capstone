import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCartItems(cart);
    const total = cart.reduce(
      (acc, item) => acc + item.ticketPrice * item.quantity,
      0
    );
    setTotalPrice(total);
  }, []);

  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: parseInt(quantity) } : item
    );
    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    const total = updatedCart.reduce(
      (acc, item) => acc + item.ticketPrice * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    const total = updatedCart.reduce(
      (acc, item) => acc + item.ticketPrice * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="sm:flex shadow-md my-10">
        <div className="w-full sm:w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">
              {cartItems.reduce((total, item) => total + item.quantity, 0)} Items
            </h2>
          </div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="md:flex items-stretch py-8 md:py-10 lg:py-8 border-t border-gray-50"
            >
              <div className="md:w-4/12 2xl:w-1/4 w-full">
                <img
                  src={item.image}
                  alt={item.eventName}
                  className="h-full object-center object-cover md:block hidden"
                />
                <img
                  src={item.image}
                  alt={item.eventName}
                  className="md:hidden w-full h-full object-center object-cover"
                />
              </div>
              <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                <div className="flex items-center justify-between w-full">
                  <p className="text-base font-black leading-none text-gray-800">
                    {item.eventName}
                  </p>
                  <select
                    aria-label="Select quantity"
                    className="w-10  py-2 px-1 border border-gray-200 mr-6 focus:outline-none"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  >
                    {[...Array(10).keys()].map((n) => (
                      <option key={n + 1} value={n + 1}>
                        {n + 1}
                      </option>
                    ))}
                  </select>
                  <p className="text-base font-black leading-none text-gray-800">
                    ${item.ticketPrice * item.quantity}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 text-white px-3 py-1 rounded"
                  >
                    x
                  </button>
                </div>
                <p className="text-sm leading-3 text-gray-600 pt-2">
                  {new Date(item.date).toLocaleDateString()}
                </p>
                <p className="text-sm leading-3 text-gray-600 py-4">{item.venue}</p>
                <p className="text-sm leading-3 text-gray-600">
                  {item.city}, {item.state}, {item.country}, {item.zipCode}
                </p>
                <p className="text-sm leading-3 text-gray-600 mt-4">
                  Contact: {item.phoneNumber}, {item.emailAddress}
                </p>
              </div>
            </div>
          ))}
          <Link to="/events" className="flex font-semibold  ">
            <svg  className="fill-current mr-2  w-4" viewBox="0 0 448 512">
              <path
                d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"
              />
            </svg>
            Continue Shopping
          </Link>
          {cartItems.length > 0 && (
            <div className="mt-10">
              <Elements stripe={stripePromise}>
                <CheckoutForm cartItems={cartItems} totalPrice={totalPrice + 10} />
              </Elements>
            </div>
          )}
        </div>
        <div id="summary" className="w-full sm:w-1/4 md:w-1/2 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Items {cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
            <span className="font-semibold text-sm">${totalPrice}</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - $10.00</option>
            </select>
          </div>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>${totalPrice + 10}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
