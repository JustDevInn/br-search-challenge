"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { stringifyQuery } from "@/modules/shared/utils/jsUtils";
// Icons
import { MdOutlineDateRange } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { FaLocationCrosshairs } from "react-icons/fa6";


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

// Load the initial set of search results when the page first loads.
    useEffect(() => {
      if (searchResults?.hits?.length > 0) {
        console.log("Using preloaded search results.");
        setRetreats(searchResults.hits);
      }
    }, [searchResults]);


  // Closing dropdown menu's for both location and category
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



  // Whenever a category or location is selected, update the results.
  useEffect(() => {
    if (!selectedCategories && !selectedLocation) return;
    updateResults();  
  }, [selectedCategories, selectedLocation]);


// Function to update the search results based on selected filters (category, location, or search query).
// It updates the URL so that the search state is preserved even if the page reloads.
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



// Calls the API with the user's input to get matching categories and updates the dropdown list.
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

{/* Navigation Search bar */}
      <div className="w-full">
      <form onSubmit={(e) => e.preventDefault()} className="w-full mb-4 p-4 flex flex-col md:flex-row gap-4 justify-center items-center
          bg-white rounded-full
            shadow-lg hover:shadow-blue-200 transition-shadow duration-300">
  
  {/* Location Bar*/}
       <div className="relative py-2 px-4 group hover:rounded-full hover:bg-gray-200" ref={locationDropdownRef}>
       <div className="flex flex-row">
          <div className="flex flex-col">
            <span className="pr-1 text-gray-400"><FaLocationCrosshairs />
            </span>
            <span className="pr-1"></span>
          </div>
        <div className="flex flex-col">
          <p className="text-black font-sans text-sm font-semibold">Location</p>
          <input
            type="text"
            placeholder="Where are you going?"
            value={locationQuery}
            onChange={(e) => handleLocationSearch(e.target.value)}
            className="text-gray-500 font-semibold bg-transparent focus:outline-none"
          />
          </div>
          </div>
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

        {/* Category Bar */}
      <div className="relative py-2 px-4 group hover:rounded-full hover:bg-gray-200" ref={categoriesDropdownRef}>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <span className="pr-1 text-gray-400"><BiCategory /></span>
            <span className="pr-1"></span>
          </div>
        <div className="flex flex-col">
          <p className="text-black font-sans text-sm font-semibold">Category</p>
        
        <input
          type="text"
          placeholder="What are you seeking?"
          value={categoriesQuery}
          onChange={(e) => handleCategorySearch(e.target.value)}
          className="text-gray-500 font-semibold bg-transparent focus:outline-none"
        />
        </div>
      </div>
           {/* Dropdown */}
           {categoriesResults.length > 0 && (
            <ul className="absolute text-black border t-1 w-full z-10 shadow-md">
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

        {/* Search Bar */}
      <div className="relative py-2 px-4 group hover:rounded-full hover:bg-gray-200">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <span className="pr-1 text-gray-400"><MdOutlineDateRange /></span>
            <span className="pr-1"></span>
          </div>
          <div className="flex flex-col">
            <p className="text-black font-sans text-sm font-semibold">Date</p>
        <input
          type="text"
          placeholder="When are you going?"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            updateResults();
          }}
          className="text-gray-500 font-semibold bg-transparent focus:outline-none"
        />
        </div>
        </div>
      </div>

      
      </form>
    </div>

      {/* Selected Filters */}
      <div className={`flex flex-row text-[#676767] m-4 ${!selectedCategories && !selectedLocation ? "hidden" : ""}`}>
      {/* Categories filter */}
        <div className="flex flex-row p-3 rounded-full bg-[#31A6FF] text-white mx-1">
          {selectedCategories && <p className="">{selectedCategories}</p>}
          <div>
            <button 
            onClick={() => {
              setSearchQuery("");
              setSelectedCategories("");
              setCategoriesQuery("");
              setCategoriesResults([]);
              setLocationQuery("");
              setLocationResults([]);
              updateResults();
              }}
            className="pl-2 flex justify-end items-start text-xs hover:cursor-pointer font-bold"
            >x
            </button>
            <div className="pl-2"></div>
          </div>
        </div>

        {/* Location filter */}
        <div className="flex flex-row p-3 rounded-full bg-[#31A6FF] text-white mx-1">
        {selectedLocation && <p className="">{selectedLocation}</p>}
        <div>
            <button 
            onClick={() => {
              setSearchQuery("");
              setSelectedLocation("");
              setCategoriesQuery("");
              setCategoriesResults([]);
              setLocationQuery("");
              setLocationResults([]);
              updateResults();
              }}
            className="pl-2 flex justify-end items-start text-xs hover:cursor-pointer font-bold">x</button>
            <div className="pl-2"></div>
          </div>
        </div>
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
    <div className="text-[#0F182A]">${Math.floor(retreat.dates[0].priceFrom)},-</div>
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

