"use client";

import React, { useEffect, useState } from "react";
import BackArrow from "@/components/atoms/back-arrow";
import Button from "@/components/atoms/button";
import Popup from "./pop-up";
import PopupEdit from "./pop-up-edit";
import Link from "next/link";

interface Reminder {
  _id: string;
  title: string;
  time: string;
  days: string[];
  isOn: boolean;
}

const ReminderPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false); // For Add Reminder Popup
  const [isEditPopupVisible, setIsEditPopupVisible] = useState<boolean>(false); // For Edit Reminder Popup
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [textArea, setTextArea] = useState<string>("");
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(
    null
  );

  // Fetch reminders from the backend
  const fetchReminders = async () => {
    try {
      const response = await fetch("http://localhost:5001/reminders");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Reminder[] = await response.json();
      setReminders(data);

    } catch (error) {
      console.error("Failed to fetch reminders:", error);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  // Toggle for the Add Reminder popup
  const togglePopup = () => {
    setIsVisible((prevState) => !prevState);
  };

  // Toggle for the Edit Reminder popup
  const toggleEditPopup = (reminder: Reminder | null) => {
    setSelectedReminder(reminder);
    setIsEditPopupVisible((prev) => !prev);
  };

  // Handle checkbox change for selecting days
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedDays((prevSelectedDays) =>
      checked
        ? [...prevSelectedDays, value]
        : prevSelectedDays.filter((day) => day !== value)
    );
  };

  const handleChangeTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextArea(event.target.value);
  };

  // Toggle reminder's 'isOn' state both locally and on the server
  const handleToggle = async (_id: string) => {
    const reminderToUpdate = reminders.find(reminder => reminder._id === _id);

    if (reminderToUpdate) {
      // Optimistically update the local state first
      const updatedReminder = { ...reminderToUpdate, isOn: !reminderToUpdate.isOn };

      // Update the state locally
      setReminders(prevReminders =>
        prevReminders.map(reminder =>
          reminder._id === _id ? updatedReminder : reminder
        )
      );

      try {
        // Make the API call to update the state on the server
        const response = await fetch(`http://localhost:5001/reminders/${_id}`, {
          method: "PATCH", // Use PATCH for partial updates
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isOn: updatedReminder.isOn }),
        });

        // Handle unsuccessful response
        if (!response.ok) {
          throw new Error("Failed to update reminder on the server");
        }

        console.log(`Reminder ${_id} updated successfully`);
      } catch (error) {
        console.error("Failed to update reminder on the server:", error);

        // If the API call fails, revert the local state
        setReminders(prevReminders =>
          prevReminders.map(reminder =>
            reminder._id === _id ? reminderToUpdate : reminder // Revert to the original state
          )
        );
      }
    }
  };

  const parseTime = (time: string) => {
    const [timePart, period] = time.split(" ");
    const [hour, minute] = timePart.split(":").map(Number);
    return { hour, minute, period: period as "AM" | "PM" };
  };

  // Handle the double-click on a reminder to open edit popup
  const handleDoubleClick = (reminder: Reminder) => {
    toggleEditPopup(reminder);
  };

  return (
    <div className="flex flex-col min-h-screen pl-[20px] pr-[20px] pt-[71px] relative">
      <Link href="/user-profile">
        <BackArrow text={"កំណត់ការរំលឹក"} />
      </Link>

      {/* Reminder List */}
      {reminders.length === 0 ? (
        <div>
        {/* Skeleton loader for each reminder */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="border rounded-xl p-[19px] mb-[10px] relative shadow flex items-center justify-between animate-pulse"
          >
            <div>
              <div className="mb-[5px] h-6 w-32 bg-gray-300 rounded"></div>
              <div className="mb-[5px] h-8 w-20 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div>
              <div className="w-10 h-5 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
      ) : (
        reminders.map((reminder) => (
          <div
            key={reminder._id}
            className="border rounded-xl p-[19px] mb-[10px] relative shadow flex items-center justify-between"
            onDoubleClick={() => handleDoubleClick(reminder)}
          >
            <div>
              <div className="mb-[5px] text-lg font-medium">
                {reminder.title}
              </div>
              <div className="text-[31px] text-gray-500 mb-[5px]">
                {reminder.time}
              </div>
              <div className="text-gray-500">{reminder.days.join(", ")}</div>
            </div>
            <div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  // checked={reminder.isOn}
                  onChange={() => handleToggle(reminder._id)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-500 rounded-full peer-checked:bg-blue-500"></div>
                <span className="w-4 h-3 bg-white rounded-full absolute left-1 top-1 transition-transform peer-checked:translate-x-full"></span>
              </label>
            </div>
          </div>
        ))
      )}

      {/* Add Reminder Popup */}
      <Popup
        getReminder={fetchReminders}
        isVisible={isVisible}
        togglePopup={togglePopup}
        selectedDays={selectedDays}
        handleChange={handleChange}
        textArea={textArea}
        handleChangeTextArea={handleChangeTextArea}
        handleTimeChange={function (
          _hours: number,
          _minutes: number,
          _period: "AM" | "PM"
        ): void {}}
      />

      {/* Edit Reminder Popup */}
      {selectedReminder && (
        <PopupEdit
          getReminder={fetchReminders}
          isVisible={isEditPopupVisible}
          togglePopup={() => toggleEditPopup(selectedReminder)}
          selectedDays={selectedReminder.days}
          handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const day = event.target.value;
            setSelectedReminder((prev) =>
              prev
                ? {
                    ...prev,
                    days: prev.days.includes(day)
                      ? prev.days.filter((d) => d !== day)
                      : [...prev.days, day],
                  }
                : prev
            );
          }}
          textArea={selectedReminder.title}
          handleChangeTextArea={(
            event: React.ChangeEvent<HTMLTextAreaElement>
          ) => {
            setSelectedReminder((prev) =>
              prev ? { ...prev, title: event.target.value } : prev
            );
          }}
          reminderId={selectedReminder._id}
          initialHour={parseTime(selectedReminder.time).hour}
          initialMinute={parseTime(selectedReminder.time).minute}
          initialPeriod={parseTime(selectedReminder.time).period}
        />
      )}

      {/* Add Reminder Button */}
      <div className="fixed bottom-0 left-0 w-full px-[20px] py-[30px] z-10">
        <Button
          label="Add Reminder"
          textColor="white"
          backgroundColor="#3385FF"
          width={"100%"}
          height="47px"
          onClick={togglePopup}
        />
      </div>
    </div>
  );
};

export default ReminderPage;
