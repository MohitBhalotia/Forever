import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center text-centerpx-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-black text-white shadow-md transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
