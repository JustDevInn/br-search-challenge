"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { stringifyQuery } from "@/modules/shared/utils/jsUtils";
// Icons
import { MdOutlineDateRange } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { VscFlame } from "react-icons/vsc";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// Components
import Spinner from './Spinner';
import DateSelection from "./DatePicker";

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

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);


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



  // Function to update the search results based on selected filters (category, location, or date picker).
// It updates the URL so that the search state is preserved even if the page reloads.
  const formatDate = (date) => {
    if (!date) return undefined;
    return date.getFullYear() + "-" + 
           String(date.getMonth() + 1).padStart(2, "0") + "-" + 
           String(date.getDate()).padStart(2, "0");
  };

const updateResults = (selectedStartDate, selectedEndDate) => {

  // Format dates for API
  const formattedStartDate = formatDate(selectedStartDate);
  const formattedEndDate = formatDate(selectedEndDate);

  const updatedSearchState = {
    ...searchState,
    scopes: {
      category: selectedCategories !== "None selected" ? selectedCategories : undefined,
      location: selectedLocation !== "None selected" ? selectedLocation : undefined,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    },
    searchQuery: searchQuery || undefined,
  };

  const queryString = stringifyQuery(updatedSearchState);
  const url = `/search?${queryString}`;
  console.log("Fetching from URL:", url);  // <== ADD THIS
  router.push(url);
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

// Spinner
const showSpinner = () => {
  setLoading(true);
  setTimeout(() => setLoading(false), 1500);
};



  return (
  <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden">
      {/* insert image here. */}
      <div className="mt-3 relative h-[300px] w-full bg-[url('/br-group-photo.avif')] bg-cover bg-center md:rounded-2xl overflow-hidden">
       {/* Overlay (Optional, for better text contrast) */}
       <div className="absolute inset-0 bg-black/20"></div>
       <div className="relative z-10 text-center text-white">
      <h1 className="text-4xl font-semibold pt-20 pb-5">
        <strong>Retreats & Trainings</strong>
      </h1>
      <h5 className="text-2xl font-semibold pb-5">
        Discover stunning retreats across the world. Your journey awaits...</h5>
        </div>
      </div>
{/* Navigation Search bar */}
<div className="w-full flex justify-center">
  <div className="md:w-11/12 w-full relative z-10 -mt-10 ">
      <form onSubmit={(e) => e.preventDefault()} className="w-full p-2 flex flex-col md:flex-row gap-4 justify-center items-center
          bg-white md:rounded-full py-4
            shadow-lg hover:shadow-blue-200 transition-shadow duration-300">
  
  {/* Location Bar*/}
    <div className="flex justify-center items-center relative py-2 px-4 group hover:rounded-full hover:bg-gray-200 border-2 border-opacity-10 border-[#64748B] rounded-full
       md:border-0 md:rounded-none" ref={locationDropdownRef}>
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
                    showSpinner();
                    setSelectedLocation(location.label);
                    setLocationQuery("");
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
      <div className="flex justify-center items-center  relative py-2 px-4 group hover:rounded-full hover:bg-gray-200 border-2 border-opacity-10 border-[#64748B] rounded-full
       md:border-0 md:rounded-none" ref={categoriesDropdownRef}>
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
                    showSpinner();
                    setSelectedCategories(category.name);
                    setCategoriesQuery("");
                    setCategoriesResults([]);
                  }}
                  className="p-2 bg-white  hover:bg-gray-200 cursor-pointer z-10"
                >
                  {category.name}
                </li>
              ))}
            </ul>
          )}
      </div>

        {/* Date selection */}
      <div className="flex justify-center items-center relative py-2 px-4 group hover:rounded-full hover:bg-gray-200 border-2 border-opacity-10 border-[#64748B] rounded-full
       md:border-0 md:rounded-none">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <span className="pr-1 text-gray-400"><MdOutlineDateRange /></span>
            <span className="pr-1"></span>
          </div>
          <div className="flex flex-col">
            <p className="text-black font-sans text-sm font-semibold">Date</p>
            <DateSelection
              onDateChange={(start, end) => {
                setSelectedStartDate(start);
                setSelectedEndDate(end);
                showSpinner();
                updateResults(start, end);
                }}
              />
        </div>
        </div>
      </div>

      
      </form>
    </div>
  </div>


{/* Selected Filters */}
<div className={`flex flex-row text-[#676767] m-4 gap-2`}>
  
  {/* Categories Filter (Only show if selectedCategories is set) */}
  {selectedCategories && (
    <div className="flex flex-row p-3 rounded-full bg-[#31A6FF] text-white">
      <p>{selectedCategories}</p>
      <button 
        onClick={() => {
          showSpinner();
          setSelectedCategories("");
          setCategoriesQuery("");
          setCategoriesResults([]);
          updateResults();
        }}
        className="pl-2 flex justify-end items-start text-sm hover:cursor-pointer font-bold"
      >
        x
      </button>
    </div>
  )}

  {/* Location Filter (Only show if selectedLocation is set) */}
  {selectedLocation && (
    <div className="flex flex-row p-3 rounded-full bg-[#31A6FF] text-white">
      <p>{selectedLocation}</p>
      <button 
        onClick={() => {
          showSpinner();
          setSelectedLocation("");
          setLocationQuery("");
          setLocationResults([]);
          updateResults();
        }}
        className="pl-2 flex justify-end items-start text-sm hover:cursor-pointer font-bold"
      >
        x
      </button>
    </div>
  )}
  
    {/* Date Filter (Only Show If Dates Are Selected) */}
    {selectedStartDate && selectedEndDate && (
    <div className="flex flex-row p-3 rounded-full bg-[#31A6FF] text-white">
      <p>{selectedStartDate.toISOString().split("T")[0]} / {selectedEndDate.toISOString().split("T")[0]}</p>
      <button 
        onClick={() => {
          showSpinner();
          setSelectedStartDate(null);
          setSelectedEndDate(null);
          updateResults(null, null);
        }}
        className="pl-2 flex justify-end items-start text-sm hover:cursor-pointer font-bold"
      >
        x
      </button>
    </div>
  )}

</div>

      {/* Error Message */}
      {error && <div className="text-red-500">{error}</div>}

      {/* Results */}
      {loading ? (
        <div className="flex justify-center items-center">Loading... <Spinner /></div>
      ) : (


<ul className="max-w-5xl mx-auto ">
    {retreats.length > 0 ? (
      retreats.map((retreat) => {
return (
  <li key={retreat.id} className="p-2">
  {/* Card */}
<article className="h-full w-full rounded-xl flex flex-col md:flex-row mx-auto p-5 gap-4 flex-wrap
bg-white shadow-2xl hover:shadow-xl">
  
{/* Card info */} 
<div className="flex-1 md:flex-[3] order-2 md:py-2 flex justify-between flex-col">
  <div className="flex-1 min-w-[250px] flex flex-col justify-start items-start">
    <p className="text-[#475569] text-lg mb-4"><strong>{retreat.name}</strong></p>
    <div className="flex flex-row items-center py-2 md:py-5 gap-1">
        <CiLocationOn className="text-[#0F182A] text-md mr-1" />
        <p className="text-[#0F182A] text-md">{retreat.location?.[0]}</p>
    </div>
    <div className="flex flex-row items-center">
      <MdOutlineDateRange className="text-[#0F182A] mr-1 text-md" />
      <div className="text-[#0F182A] text-md">{retreat.formattedDates}</div>
    </div>
  </div>
  {/* Review */}
    <div className="py-2 hidden md:block">
      <p className="text-[#64748B] text-sm italic">"{retreat.snippet}..."</p>
    </div>
 
</div>

{/* description */}
<div className="flex-1 md:flex-[2] order-3 md:py-2">
  <div className="text-[#475569] hidden md:block">
    <p className="text-xs text-[#475569]">From:</p>
    <p><strong>${Math.floor(retreat.dates[0].priceFrom)}</strong></p>
  </div>
  <div className="flex flex-row py-2">
    <VscFlame className="text-lg text-orange-400"/>
    <p className="text-[#64748B] text-sm">{retreat.interestedPeople} people are interested</p>
  </div>
  <div className="flex flex-row">
    <IoIosCheckmarkCircleOutline className="text-lg text-green-700"/>
    <p className="text-[#64748B] text-sm"><strong>FREE Cancelation</strong></p>
  </div>
  <div className="flex flex-row md:justify-start md:items-center py-2">
    <div className="text-[#475569] text-sm"><strong>{Number(retreat.rating).toFixed(1)}</strong></div>
    <FaStar className="text-[#31A6FF] mx-1"/>
    <div className="text-[#64748B] text-sm ">({Math.floor(retreat.reviewCount)} reviews)</div>
  </div>
  <div className="py-2 md:hidden block">
      <p className="text-[#64748B] text-sm">{retreat.snippet}...</p>
  </div>
  <div className="text-[#475569] block md:hidden py-2">
    <p className="text-2xl"><strong>${Math.floor(retreat.dates[0].priceFrom)}</strong></p>
  </div>
  {/* buttons */}
  <div className="flex flex-row justify-center md:items-start md:flex-col w-full py-2 gap-2">
    <a 
    href="https://bookretreats.com/r/4-day-juice-fasting-daily-spa-yoga-wellness-eco-retreat-bali" 
    alt="specific page information"
    target="_blank"
    rel="noopener noreferrer"
    className="">
      <button className="flex justify-center items-center w-[140px] md:w-[250px] text-sm hover:cursor-pointer font-bold p-3 rounded-full 
      bg-white text-[#31A6FF] hover:bg-[#31A6FF] hover:text-white border-[#31A6FF] border">
        Details
      </button>
    </a>
    <a 
    href="https://bookretreats.com/r/4-day-juice-fasting-daily-spa-yoga-wellness-eco-retreat-bali" 
    alt="specific page information"
    target="_blank"
    rel="noopener noreferrer"
    className="">
      <button className="flex justify-center items-center w-[140px] md:w-[250px] text-sm hover:cursor-pointer font-bold p-3 rounded-full 
      bg-[#31A6FF] text-white">
        Book now
      </button>
    </a>
  </div>
</div>

  {/* Image */}
  <div className="flex-1 md:flex-[2] flex flex-col justify-center items-center order-1">
{/* Image */}
    <div className="relative w-full flex justify-end items-center">
      <button
        className="absolute top-5 right-5 text-xl cursor-pointer transition-colors duration-300">
        <FaHeart />
      </button>
      <button
        className="absolute top-5 left-5 text-xs cursor-pointer transition-colors duration-300
        bg-gray-100 rounded-full px-2 py-1">
        <p className="text-black uppercase font-normal"><strong>{retreat.ribbon?.text}</strong></p>
      </button>
      {retreat.photos?.[0]?.url ? (
        <img
          src={`https://stage.bookretreats.com/${retreat.photos[0].url}`}
          id={retreat.photos[0].id}
          alt={retreat.photos[0].altText || "Retreat Image"}
          className="w-full h-[200px] md:h-[220px] object-cover rounded-2xl"
        />
      ) : (
        <div className="w-full h-[200px] md:w-[300px] md:h-[220px] bg-gray-300 flex justify-center items-center">
          <span className="text-gray-600">No Image</span>
        </div>
      )}
    </div>


  </div>
</article>
</li>);
})
          ) : (
            <p>No results found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;

