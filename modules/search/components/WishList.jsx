'use client'

import React from 'react';
import { useWishlistContext } from '../context/WishlistContext';

const WishList = () => {
  const { favorites, removeFromFavorites } = useWishlistContext();

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h2 className="text-2xl font-semibold text-[#31A6FF] mb-4">Your Wishlist</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500">No retreats in your wishlist.</p>
      ) : (
        <ul className="grid md:grid-cols-2 gap-5">
          {favorites.map((retreat) => (
            <li key={retreat.id} className="p-5 bg-white shadow-lg rounded-xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#475569]">{retreat.name}</h3>
                <p className="text-sm text-gray-600">{retreat.location?.[0]}</p>
              </div>
              
              {/* Image */}
              <div className="relative mt-3">
                {retreat.photos?.[0]?.url ? (
                  <img
                    src={`https://stage.bookretreats.com/${retreat.photos[0].url}`}
                    alt={retreat.photos[0].altText || "Retreat Image"}
                    className="w-full h-[180px] object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-[180px] bg-gray-300 flex justify-center items-center">
                    <span className="text-gray-600">No Image</span>
                  </div>
                )}
              </div>

              {/* Remove from Wishlist Button */}
              <button
                onClick={() => removeFromFavorites(retreat.id)}
                className="mt-3 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishList;
