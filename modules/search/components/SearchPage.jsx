"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { stringifyQuery } from "@/modules/shared/utils/jsUtils";

const SearchPage = ({ searchResults, searchState }) => {
  console.log("SearchPage Props", searchResults, searchState);

  const router = useRouter(); // For navigation
  const [searchQuery, setSearchQuery] = useState(searchState?.searchQuery || "");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(searchState?.scopes?.category || "None selected");
  const [locationQuery, setLocationQuery] = useState("");
  const [locationResults, setLocationResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(searchState?.scopes?.location || "None selected");
  const [retreats, setRetreats] = useState(searchResults?.hits || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const locationDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
        setLocationResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/api/categories?query=`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data.items || []);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Ensure initial results are shown
  useEffect(() => {
    if (searchResults?.hits?.length > 0) {
      console.log("Using preloaded search results.");
      setRetreats(searchResults.hits);
    }
  }, [searchResults]);

  const updateResults = () => {
    const updatedSearchState = {
      ...searchState,
      scopes: {
        category: selectedCategory !== "None selected" ? selectedCategory : undefined,
        location: selectedLocation !== "None selected" ? selectedLocation : undefined,
      },
      searchQuery: searchQuery || undefined,
    };

    const queryString = stringifyQuery(updatedSearchState);
    router.push(`/search?${queryString}`);
  };

  const handleLocationSearch = async (query) => {
    setLocationQuery(query);
    if (!query.trim()) {
      setLocationResults([]);
      return;
    }

    const response = await fetch(`/api/locations?query=${query}`);
    if (response.ok) {
      const data = await response.json();
      setLocationResults(data.items || []);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="w-full text-2xl font-semibold my-4 flex justify-center">
        Retreats
      </h1>

      {/* Search Form */}
      <form onSubmit={(e) => e.preventDefault()} className="mb-4 flex flex-row gap-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search retreats..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            updateResults();
          }}
          className="border p-2 w-[300px]"
        />

        {/* Category Dropdown */}
        <select
          className="border p-2 w-[300px] text-gray-500"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            updateResults();
          }}
        >
          <option value="None selected">Select a Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.label}>
              {category.label}
            </option>
          ))}
        </select>

        {/* Location Filter */}
        <div className="relative" ref={locationDropdownRef}>
          <input
            type="text"
            placeholder="Filter by location..."
            value={locationQuery}
            onChange={(e) => handleLocationSearch(e.target.value)}
            className="border p-2 w-[300px] text-gray-500"
          />
          {/* Dropdown */}
          {locationResults.length > 0 && (
            <ul className="absolute bg-white text-black border mt-1 w-full z-10 shadow-md">
              {locationResults.map((location) => (
                <li
                  key={location.id}
                  onClick={() => {
                    setSelectedLocation(location.label);
                    setLocationQuery(location.label);
                    setLocationResults([]);
                    updateResults();
                  }}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {location.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>

      {/* Selected Filters */}
      <div className="mb-4">
        <p>Selected Category: {selectedCategory}</p>
        <p>Selected Location: {selectedLocation}</p>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500">{error}</div>}

      {/* Results */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <ul className="p-5">
          {retreats.length > 0 ? (
            retreats.map((retreat) => (
              <li key={retreat.id}>
{/* Card */}
<div className="w-full flex flex-col md:flex-row mx-auto p-2 m-5 border border-gray-400 gap-4 flex-wrap">
  
  {/* Card info */}
  <div className="flex-1 min-w-[250px] flex flex-col justify-start items-start">
    <h2 className="text-lg font-semibold">{retreat.label}</h2>
    <p className="text-gray-600">{retreat.location?.[0]}</p>
  </div>

  {/* Image */}
  <div className="flex-1 min-w-[250px] flex justify-center items-center">
    <div className="w-full h-[200px] md:w-[300px] md:h-[220px] flex justify-center items-center">
      {retreat.photos?.[0]?.url ? (
        <img
          src={`https://stage.bookretreats.com/${retreat.photos[0].url}`}
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
            ))
          ) : (
            <p>No results found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;


