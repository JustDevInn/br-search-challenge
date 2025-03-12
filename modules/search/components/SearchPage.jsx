"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { stringifyQuery } from "@/modules/shared/utils/jsUtils";

const SearchPage = ({ searchResults, searchState }) => {
  console.log("SearchPage Props", searchResults, searchState);

  const router = useRouter(); // For navigation
  const [searchQuery, setSearchQuery] = useState(searchState?.searchQuery || "");
  const [categories, setCategories] = useState([]);

  const [categoriesQuery, setCategoriesQuery] = useState("");
  const [categoriesResults, setCategoriesResults] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(searchState?.scopes?.category || "");

  const [locationQuery, setLocationQuery] = useState("");
  const [locationResults, setLocationResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(searchState?.scopes?.location || "");

  const [retreats, setRetreats] = useState(searchResults?.hits || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const locationDropdownRef = useRef(null);
  const categoriesDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
        setLocationResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesDropdownRef.current && !categoriesDropdownRef.current.contains(event.target)) {
        setCategoriesResults([]);
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

  useEffect(() => {
    if (!selectedCategories && !selectedLocation) return;
    updateResults();  
  }, [selectedCategories, selectedLocation]);
  


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
        category: selectedCategories !== "None selected" ? selectedCategories : undefined,
        location: selectedLocation !== "None selected" ? selectedLocation : undefined,
      },
      searchQuery: searchQuery || undefined,
    };

    const queryString = stringifyQuery(updatedSearchState);
    router.push(`/search?${queryString}`);
  };


  const handleCategorySearch = async (query) => {
    setCategoriesQuery(query);
    if (!query.trim()) {
      setCategoriesResults([]);
      return;
    }

    const response = await fetch(`/api/categories?query=${query}`);
    if (response.ok) {
      const data = await response.json();
      setCategoriesResults(data.items || []);
    }
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
      <h1 className="w-full text-4xl font-semibold my-4 flex justify-center text-[#31A6FF] pt-20 pb-10">
        <strong>Search for retreats</strong>
      </h1>

      {/* Search Form */}
      <form onSubmit={(e) => e.preventDefault()} className="mb-4 flex flex-col md:flex-row gap-4 w-full">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search retreats..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            updateResults();
          }}
          className="border p-2"
        />

        {/* Category Dropdown */}
        <div className="relative" ref={categoriesDropdownRef}>
        <input
          type="text"
          placeholder="Filter by category..."
          value={categoriesQuery}
          onChange={(e) => handleCategorySearch(e.target.value)}
          className="border p-2 text-gray-500"
        />
           {/* Dropdown */}
           {categoriesResults.length > 0 && (
            <ul className="absolute bg-white text-black border t-1 w-full z-10 shadow-md">
              {categoriesResults.map((category) => (
                <li
                  key={category.id}
                  onClick={() => {
                    setSelectedCategories(category.name);
                    setCategoriesQuery(category.name);
                    setCategoriesResults([]);
                  }}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {category.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Location Filter */}
        <div className="relative" ref={locationDropdownRef}>
          <input
            type="text"
            placeholder="Filter by location..."
            value={locationQuery}
            onChange={(e) => handleLocationSearch(e.target.value)}
            className="border p-2 text-gray-500"
          />
          {/* Dropdown */}
          {locationResults.length > 0 && (
            <ul className="absolute bg-white text-black border t-1 w-full z-10 shadow-md">
              {locationResults.map((location) => (
                <li
                  key={location.id}
                  onClick={() => {
                    setSelectedLocation(location.label);
                    setLocationQuery(location.label);
                    setLocationResults([]);
                  }}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {location.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input type="reset" value="Reset" className="bg-[#31A6FF] text-white w-[100px] rounded text-lg"></input>
      </form>

      {/* Selected Filters */}
      <div className={`text-[#676767] mb-4 ${!selectedCategories && !selectedLocation ? "hidden" : ""}`}>
        {selectedCategories && <p>Selected Category: {selectedCategories}</p>}
        {selectedLocation && <p>Selected Location: {selectedLocation}</p>}
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
<div className="w-full rounded-xl flex flex-col md:flex-row mx-auto p-2 m-5 gap-4 flex-wrap
bg-[#F8FAFC]">
  
  {/* Card info */}
  <div className="md:w-1/2 order-2 md:order-1">
  <div className="flex-1 min-w-[250px] flex flex-col justify-start items-start py-2">
    <p className="text-[#0F182A]"><strong>{retreat.name}</strong></p>
    <p className="text-[#0F182A] text-sm">{retreat.location?.[0]}</p>
    <p className="text-[#676767] text-sm">{retreat.organizer}</p>
  </div>
  <div>
  <p className="text-[#0F182A] text-xs p-1 md:px-2 text-justify">{retreat.description}</p>
  </div>
  </div>
  {/* Image */}
  <div className="flex-1 min-w-[250px] flex flex-col justify-center items-center order-1 md:order-2">
    <div className="w-full flex flex-row justify-between p-2">
    <div className="text-[#676767]">${Math.floor(retreat.dates[0].priceFrom)},-</div>
    <div className="text-[#31A6FF]"><strong>{retreat.dates[0].startDate}</strong></div>
    </div>
    <div className="w-full flex justify-end items-center">
      {retreat.photos?.[0]?.url ? (
        <img
          src={`https://stage.bookretreats.com/${retreat.photos[0].url}`}
          id={retreat.photos[0].id}
          alt={retreat.photos[0].altText || "Retreat Image"}
          className="w-full h-[200px] md:h-[220px] object-cover"
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

