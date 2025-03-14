import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import styles

const DateSelection = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  
    if (start && end) {
      console.log("Passing Dates to Parent:", { start, end }); // Ensure this logs correctly
      onDateChange(start, end); // Make sure values are sent
      // Clear selection after passing to parent (resets input)
      setTimeout(() => {
        setStartDate(null);
        setEndDate(null);
      }, 1500);
    }
  };
  

  return (
    <div className="relative py-2 px-4 group hover:rounded-full hover:bg-gray-200">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            placeholderText="When are you going?"
            selectsRange
            className="text-gray-500 font-semibold bg-transparent focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default DateSelection;
