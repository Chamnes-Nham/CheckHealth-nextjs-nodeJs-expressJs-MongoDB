import React from "react";

interface TextAreaProps {
  label: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaField: React.FC<TextAreaProps> = ({ label, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="relative block mx-auto w-full">
        <textarea
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-3 text-lg outline-none border-[1.3px] rounded-xl hover:border-blue-500 
          duration-200 peer bg-inherit resize-none
          ${value ? "border-blue-500" : "border-zinc-800"}
          peer-focus:border-blue-500`}
          rows={4}
        />
        <div
          className={`absolute left-3 top-3 px-4 text-lg uppercase tracking-wide hover:text-blue-600
          pointer-events-none duration-200 
          ${value ? "-translate-y-5 text-sm bg-white text-blue-500" : ""}
          peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:bg-white peer-focus:text-blue-500 rounded text-[14px]`}
        >
          {label}
        </div>
      </label>
    </div>
  );
};

export default TextAreaField;
