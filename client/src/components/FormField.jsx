import React from "react";

function FormField({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-md font-medium"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#ececf1] py-1 px-2 rounded-[5px] text-black cursor-pointer hover:bg-[#d0cfcf] transition-all duration-200"
          >
            Surprise Me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-gray-50 border border-gray-300 text-md text-black rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3 font-semibold"
      />
    </div>
  );
}

export default FormField;
