'use client'

import React, { useState } from 'react';
// Icons
import { FaHeart } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faCcVisa, 
    faCcMastercard, 
    faCcPaypal, 
    faCcApplePay, 
    faGooglePay, 
    faCcAmex 
  } from "@fortawesome/free-brands-svg-icons";
  import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Footer = () => {
  const [showGeneral, setShowGeneral] = useState(false);
  const [showForHosts, setShowForHosts] = useState(false);
  const [showForGuests, setShowForGuests] = useState(false);
  const [showHubs, setShowHubs] = useState(false);

  return (
<div className='w-full md:px-20 px-5 py-5 bg-[#F1F5F9] text-gray-600'>
<div className='flex-col md:flex-row flex justify-center items-start gap-5 pb-5'>
        <section className=''>
            <div className='flex flex-row text-sm font-light mb-1'>
                <p><strong>Made with</strong></p>
                <FaHeart className='mx-1 text-sm text-red-600'/>
                <p><strong>by</strong></p>
            </div>
            <div className="flex items-center mb-4">
                <a href="https://bookretreats.com/" target="_blank" rel="noopener noreferrer">
                <img 
                    src="/bookretreats-logo-number-1.svg" 
                    alt="BookRetreats" 
                    className="w-[180px] cursor-pointer"
                />
                </a>
            </div>
            <div className='mb-4'>
                <h5 className='text-[#6F7E93] font-semibold mb-3'>WHO ARE WE?</h5>
                <p className='text-sm'>We are a team of yogis who came together to put our energy into making the world a better place by connecting you with life-changing yoga retreats, meditation retreats, wellness retreats, and yoga teacher trainings. We are all about spreading love!
                </p>
            </div>
            <div className='mb-4'>
                <h5 className='text-[#6F7E93] font-semibold mb-3'>WHY CHOOSE US?</h5>
                <p className='text-sm'>
                We aren’t just a business, we are family. When you book with us, you can be sure that your experience will be full of love, security, understanding, and joy every step of the way. From helping you find the perfect retreat to taking care of you when things go wrong, we treat you like family.
                </p>
            </div>
        </section>


{/* General Section with Dropdown on Mobile */}
        <section className="w-full flex flex-col gap-8">
          <div className="border-b border-gray-300 pb-2 md:border-none">
            <div 
              className="flex justify-between items-center cursor-pointer md:cursor-default" 
              onClick={() => setShowGeneral(!showGeneral)}
            >
              <h4 className="text-[#6F7E93] font-semibold mb-2">GENERAL</h4>
              <span className="md:hidden">{showGeneral ? <FaChevronUp /> : <FaChevronDown />}</span>
            </div>
            <ul className={`space-y-2 text-sm ${showGeneral ? 'block' : 'hidden'} md:block`}>
              <li><a href="#" className="text-gray-600 hover:text-blue-500">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Jobs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Press</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Reviews</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Affiliates</a></li>
            </ul>
          </div>

          {/* For Hosts Section with Dropdown on Mobile */}
          <div className="border-b border-gray-300 pb-2 md:border-none">
            <div 
              className="flex justify-between items-center cursor-pointer md:cursor-default" 
              onClick={() => setShowForHosts(!showForHosts)}
            >
              <h4 className="text-[#6F7E93] font-semibold mb-2">FOR HOSTS</h4>
              <span className="md:hidden">{showForHosts ? <FaChevronUp /> : <FaChevronDown />}</span>
            </div>
            <ul className={`space-y-2 text-sm ${showForHosts ? 'block' : 'hidden'} md:block`}>
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Add a Retreat</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Host Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Host FAQs</a></li>
            </ul>
          </div>
        </section>



        {/* For Guests Section with Dropdown on Mobile */}
        <section className="w-full flex flex-col gap-8">
          <div className="border-b border-gray-300 pb-2 md:border-none">
            <div 
              className="flex justify-between items-center cursor-pointer md:cursor-default" 
              onClick={() => setShowForGuests(!showForGuests)}
            >
              <h4 className="text-[#6F7E93] font-semibold mb-2">FOR GUESTS</h4>
              <span className="md:hidden">{showForGuests ? <FaChevronUp /> : <FaChevronDown />}</span>
            </div>
            <ul className={`space-y-2 text-sm ${showForGuests ? 'block' : 'hidden'} md:block`}>
              <li><a href="#">Cancellation Policies</a></li>
              <li><a href="#">Buy Gift Cards</a></li>
              <li><a href="#">Guest FAQs</a></li>
              <li><a href="#">Join Our Community</a></li>
              <li><a href="#">Search Facilitators</a></li>
              <li><a href="#">Search Centers</a></li>
              <li><a href="#">Getaways</a></li>
            </ul>
          </div>

          {/* Hubs Section with Dropdown on Mobile */}
          <div className="border-b border-gray-300 md:border-none pb-2">
            <div 
              className="flex justify-between items-center cursor-pointer md:cursor-default" 
              onClick={() => setShowHubs(!showHubs)}
            >
              <h4 className="text-[#6F7E93] font-semibold mb-2">HUBS</h4>
              <span className="md:hidden">{showHubs ? <FaChevronUp /> : <FaChevronDown />}</span>
            </div>
            <ul className={`space-y-2 text-sm ${showHubs ? 'block' : 'hidden'} md:block`}>
              <li><a href="#">Categories</a></li>
              <li><a href="#">Dates</a></li>
              <li><a href="#">Locations</a></li>
              <li><a href="#">Styles</a></li>
            </ul>
          </div>
        </section>

    <section>
        <h4 className='text-[#6F7E93] font-semibold mb-4'>SECURE PAYMENTS WITH</h4>
        <div className="flex space-x-1 mb-4">
            <FontAwesomeIcon icon={faCcVisa} className="text-blue-500 w-8 h-8 shadow-xl" />
            <FontAwesomeIcon icon={faCcMastercard} className="text-red-500 w-8 h-8 shadow-xl" />
            <FontAwesomeIcon icon={faCcPaypal} className="text-blue-400 w-8 h-8 shadow-xl" />
            <FontAwesomeIcon icon={faCcApplePay} className="text-black w-8 h-8 shadow-xl" />
            <FontAwesomeIcon icon={faGooglePay} className="text-black w-8 h-8 shadow-xl" />
            <FontAwesomeIcon icon={faCcAmex} className="text-blue-600 w-8 h-8 shadow-xl" />
        </div>

        <h4>Currency</h4>
    </section>
</div>
        
{/* bottom footer */}
<section className='w-full h-[100px] my-5 md:my-0 text-sm flex flex-col md:flex-row justify-evenly items-center border-t border-opacity-50 border-gray-400'>
        <p className='py-5'>&copy; BookRetreats.com 2025</p>

    <div className="flex flex-row gap-4">
        <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="h-[35px] w-[35px] p-2 text-gray-600 bg-gray-300 rounded-full hover:text-gray-800 hover:bg-gray-400 transition" />
        </a>
    
        <a href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
        <FaFacebookF className="h-[35px] w-[35px] p-2 text-gray-600 bg-gray-300 rounded-full hover:text-gray-800 hover:bg-gray-400 transition" />
        </a>
    
        <a href="https://www.pinterest.com/yourprofile" target="_blank" rel="noopener noreferrer">
        <FaPinterestP className="h-[35px] w-[35px] p-2 text-gray-600 bg-gray-300 rounded-full hover:text-gray-800 hover:bg-gray-400 transition" />
        </a>
    </div>

    <div className="flex flex-row gap-5 py-5 md:py-0 justify-center items-center text-gray-400">
        <a href="/terms-and-conditions" className="hover:text-gray-600 transition">
            Terms and Conditions
        </a>
        <a href="/privacy-policy" className="hover:text-gray-600 transition">
            Privacy Policy
        </a>
    </div>

</section>
</div>
  )
}

export default Footer