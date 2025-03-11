"use client";

import { useState } from "react";

const SearchPage = ({ searchResults, searchState }) => {
  console.log('SearchPage Props', searchResults, searchState);

  // Get selected category and location from searchState
  const selectedCategory = searchState?.scopes?.category || "None selected";
  const selectedLocation = searchState?.scopes?.location || "None selected";

  return (
    <div className='max-w-5xl mx-auto px-4'>
      <h1 className="w-full text-2xl font-semibold my-4 flex justify-center">
        Retreats
      </h1>

      {/* Display selected category and location */}
      <div className="mb-4">
        <p>Selected Category: {selectedCategory}</p>
        <p>Selected Location: {selectedLocation}</p>
      </div>

      {/* Create a UL to display the searchResults. Map over searchResults.hits 
          to create li for each result. If empty, display "No results found." */}
      {searchResults?.hits?.length > 0 ? (
        <ul className="p-5">
        {searchResults.hits.map((retreat) => (
          <li key={retreat.id}>
            {/* Card */}
            <div className="w-full flex flex-col md:flex-row mx-auto p-2 m-5 border border-gray-400 gap-4 flex-wrap">
              
            {/* Card info */}
            <div className="flex-1 min-w-[250px] flex flex-col justify-start items-start">
              <h2 className="text-lg font-semibold">{retreat.name}</h2>
              <p className="text-gray-600">{retreat.location?.[0]}</p>
            </div>
      
            {/* Image */}
            <div className="flex-1 min-w-[250px] flex justify-center items-center">
                <div className="w-full h-[200px] md:w-[300px] md:h-[220px] flex justify-center items-center">
                {console.log("Image URL:", retreat.photos[0]?.url)};
                {retreat.photos?.[0]?.url ? (
                <img 
                id={retreat.photos[0].id}
                src={`https://stage.bookretreats.com/${retreat.photos[0]?.url}`} 
                alt={retreat.photos[0].altText || "Retreat Image"} 
                  className="w-full h-[200px] md:w-[300px] md:h-[220px] object-cover"
                />
                
              ) : (
              <div className="w-full h-[200px] md:w-[300px] md:h-[220px] bg-gray-300 flex justify-center items-center">
                <span className="text-gray-600">No Image</span>
              </div>
              )}
                </div>
          </div>
      
            </div>
          </li>
        ))}
      </ul>
      
      
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
