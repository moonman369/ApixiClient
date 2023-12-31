import React from "react";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  onKeyDown,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <label
          htmlFor={name}
          className="block text-md font-medium text-gray-200"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text- bg-[#ececf1] py-1 px-2 rounded-[5px] text-black"
          >
            Surprise Me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        required
        className="bg-gray-600 border border-gray-400 text-md rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3 mb-7 text-white"
      />
    </div>
  );
};

export default FormField;
