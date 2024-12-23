// PopupEdit.tsx
import React, {
  MouseEventHandler,
  useState,
  useCallback,
  useMemo,
} from "react";
import Button from "@/components/atoms/button";
import WheelPicker from "./WheelPicker";
import { FaTrash } from "react-icons/fa";

interface PopupProps {
  getReminder: () => void;
  isVisible: boolean;
  togglePopup: () => void;
  selectedDays: string[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  textArea: string;
  handleChangeTextArea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  reminderId?: string; // Optional reminderId
  initialHour: number; // Initial hour for WheelPicker
  initialMinute: number; // Initial minute for WheelPicker
  initialPeriod: "AM" | "PM"; // Initial AM/PM period
}

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const PopupEdit: React.FC<PopupProps> = ({
  getReminder,
  isVisible,
  togglePopup,
  selectedDays,
  handleChange,
  textArea,
  handleChangeTextArea,
  reminderId,
  initialHour,
  initialMinute,
  initialPeriod,
}) => {
  const [time, setTime] = useState({
    hour: initialHour,
    minute: initialMinute,
    period: initialPeriod,
  });

  const formattedTime = useMemo(
    () =>
      `${time.hour}:${time.minute < 10 ? `0${time.minute}` : time.minute} ${time.period}`,
    [time]
  );

  // Handlers for changing time
  const handleHourChange = useCallback((index: number) => {
    setTime((prev) => ({ ...prev, hour: index + 1 }));
  }, []);

  const handleMinuteChange = useCallback((index: number) => {
    setTime((prev) => ({ ...prev, minute: index }));
  }, []);

  const handlePeriodChange = useCallback((index: number) => {
    setTime((prev) => ({ ...prev, period: index === 0 ? "AM" : "PM" }));
  }, []);

  // Update reminder function
  const updateReminder = useCallback(async () => {
    if (!reminderId) {
      console.error("No reminder ID provided");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5001/reminders/${reminderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: textArea,
            days: selectedDays,
            time: formattedTime,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update reminder");
      getReminder();
      console.log("Reminder updated:", await response.json());
      togglePopup();
    } catch (error) {
      console.error("Error updating reminder:", error);
    }
  }, [formattedTime, selectedDays, textArea, reminderId, togglePopup]);

  // Delete reminder function
  const deleteReminder = useCallback(async () => {
    if (!reminderId) {
      console.error("No reminder ID provided");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/reminders/${reminderId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete reminder");
      getReminder();
      console.log(`Reminder ${reminderId} deleted`);
      togglePopup();
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  }, [reminderId, togglePopup]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[51]"
        onClick={togglePopup}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[52] p-4 w-full max-w-[400px]">
        <div className="border rounded-[10px] bg-white pt-[29px] pb-[29px] px-[20px] w-full relative">
          <div className="absolute top-5 right-5 cursor-pointer text-gray-600 hover:text-red-600">
            <FaTrash size={20} onClick={deleteReminder} />
          </div>
          <div className="flex flex-col items-center">
            <div className="text-lg font-semibold text-gray-700 pb-[29px]">
              Edit Reminder
            </div>
            <div className="flex justify-center space-x-4 pb-[20px]">
              <WheelPicker
                items={Array.from({ length: 12 }, (_, i) => `${i + 1}`)}
                selectedIndex={time.hour - 1}
                onChange={handleHourChange}
                loop={true}
              />
              <WheelPicker
                items={Array.from(
                  { length: 60 },
                  (_, i) => `${i < 10 ? `0${i}` : i}`
                )}
                selectedIndex={time.minute}
                onChange={handleMinuteChange}
                loop={true}
              />
              <WheelPicker
                items={["AM", "PM"]}
                selectedIndex={time.period === "AM" ? 0 : 1}
                onChange={handlePeriodChange}
                loop={true}
              />
            </div>
            <div className="pt-[20px] pb-[20px] flex w-full justify-between">
              {daysOfWeek.map((day) => (
                <label
                  key={day}
                  className="flex flex-col items-center cursor-pointer"
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
            <textarea
              value={textArea}
              onChange={handleChangeTextArea}
              className="w-full h-[80px] p-3 mt-[12px] border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-300 placeholder-white text-gray-700"
              placeholder="Input title here"
            />
            <div className="flex justify-between w-full mt-[20px]">
              <Button
                label={"Cancel"}
                width={"120px"}
                height="39px"
                onClick={togglePopup}
              />
              <Button
                label={"Update"}
                width={"120px"}
                height="39px"
                onClick={updateReminder}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupEdit;
