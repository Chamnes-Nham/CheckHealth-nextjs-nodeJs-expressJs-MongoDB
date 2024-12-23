import React, { MouseEventHandler, useState } from "react";
import Button from "@/components/atoms/button";
import WheelPicker from "./WheelPicker"; // Ensure this path is correct

interface PopupProps {
  getReminder: () => void;
  isVisible: boolean;
  togglePopup: () => void;
  selectedDays: string[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  textArea: string;
  handleChangeTextArea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleTimeChange: (
    hours: number,
    minutes: number,
    period: "AM" | "PM"
  ) => void;
}

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Popup: React.FC<PopupProps> = ({
  getReminder,
  isVisible,
  togglePopup,
  selectedDays,
  handleChange,
  textArea,
  handleChangeTextArea,
  handleTimeChange,
}) => {
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState(0);

  if (!isVisible) return null;

  const handleOverlayClick = () => {
    togglePopup();
  };

  const handlePopupClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
  };

  const handleHourChange = (index: number) => {
    setSelectedHour(index);
    handleTimeChange(
      index + 1,
      selectedMinute,
      selectedPeriod === 0 ? "AM" : "PM"
    );
  };

  const handleMinuteChange = (index: number) => {
    setSelectedMinute(index);
    handleTimeChange(
      selectedHour + 1,
      index,
      selectedPeriod === 0 ? "AM" : "PM"
    );
  };

  const handlePeriodChange = (index: number) => {
    setSelectedPeriod(index);
    handleTimeChange(
      selectedHour + 1,
      selectedMinute,
      index === 0 ? "AM" : "PM"
    );
  };

  const hours = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  const minutes = Array.from(
    { length: 60 },
    (_, i) => `${i < 10 ? `0${i}` : i}`
  );
  const periods = ["AM", "PM"];

  const addReminder = async () => {
    try {
      const formattedTime = `${selectedHour + 1}:${
        selectedMinute < 10 ? `0${selectedMinute}` : selectedMinute
      } ${selectedPeriod === 0 ? "AM" : "PM"}`;

      const response = await fetch("http://localhost:5001/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: textArea,
          days: selectedDays,
          time: formattedTime, // Use the dynamically selected time here
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add reminder");
      }
      console.log(getReminder)
      const newReminder = await response.json();
      console.log("Reminder added:", newReminder);
      getReminder();
    } catch (error) {
      console.error("Error adding reminder:", error);
    }
  };

  return (
    <>
      {/* Darkened background overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[51]"
        onClick={handleOverlayClick}
      />
      {/* Popup content */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[52] p-4 w-full max-w-[400px]"
        onClick={handlePopupClick}
      >
        <div
          className="border rounded-[10px] bg-white pt-[29px] pb-[29px] px-[20px] w-full relative" // Added relative positioning
          onClick={handlePopupClick}
        >
          <div className="flex flex-col items-center">
            <div className="text-lg font-semibold text-gray-700 pb-[29px]">
              Set Time
            </div>

            {/* Time Picker */}
            <div className="flex justify-center space-x-4 pb-[20px]">
              {/* Hour Picker */}
              <WheelPicker
                items={hours}
                selectedIndex={selectedHour}
                onChange={handleHourChange}
                loop={true}
              />

              {/* Minute Picker */}
              <WheelPicker
                items={minutes}
                selectedIndex={selectedMinute}
                onChange={handleMinuteChange}
                loop={true}
              />

              {/* AM/PM Picker */}
              <WheelPicker
                items={periods}
                selectedIndex={selectedPeriod}
                onChange={handlePeriodChange}
                loop={true}
              />
            </div>
            <div>
              <label htmlFor="">Every</label>
            </div>

            {/* Day selection */}
            <div className="pt-[20px] pb-[20px] flex w-full justify-between">
              {daysOfWeek.map((day) => (
                <label
                  key={day}
                  className="flex flex-col items-center cursor-pointer whitespace-nowrap"
                >
                  <span className="mb-[5px] text-sm text-gray-600">{day}</span>
                  <input
                    type="checkbox"
                    value={day}
                    checked={selectedDays.includes(day)}
                    onChange={handleChange}
                    className="form-checkbox text-blue-600 h-5 w-5"
                  />
                </label>
              ))}
            </div>

            {/* Text area */}
            <textarea
              value={textArea}
              onChange={handleChangeTextArea}
              className="w-full h-[80px] p-3 mt-[12px] border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-300 placeholder-white text-gray-700"
              placeholder="បញ្ចូលការកំណត់នៅទីនេះ"
            />

            {/* Action buttons */}
            <div className="flex justify-between w-full mt-[20px]">
              <div className="w-[120px]" onClick={handleOverlayClick}>
                <Button label={"Cancel"} width={"100%"} height="39px" />
              </div>
              <div className="w-[120px]">
                <Button
                  label={"Add"}
                  width={"100%"}
                  height="39px"
                  onClick={() => {
                    addReminder(); // Call addReminder function
                    handleOverlayClick();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
