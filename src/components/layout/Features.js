import React from 'react';
import { faUpload, faPencilAlt, faArrowRight, faA } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Features = () => {
    
  function createIcon(iconName, labelText) {
    return (
      <div className="flex flex-col items-center p-8">
        <div className="relative w-[105px] h-[105px]">
          {/* Outer Circle */}
          <div className="absolute w-full h-full bg-pink-500 rounded-full"></div>
          {/* Inner Circle with Icon */}
          <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center">
          <FontAwesomeIcon className='text-black' icon={iconName} />
          </div>
        </div>
        <div className="mt-2 text-lg">{labelText}</div>
      </div>
    );
  }

  return (
    <div className="bg-cover bg-center bg-no-repeat flex flex-col font-base items-center text-white justify-center min-h-screen bg-black"style={{ backgroundImage: `url('/bg3.jpg')` }}>
      {/* Headline */}
      <h1 className="text-4xl font-bold mb-4 bg-white text-black p-2">MAIN FEATURES</h1>
      <h2 className='text-2xl font-bold mb-16 bg-white text-black p-2'>Everything you need</h2>

      {/* First Row - 3 Icons */}
      <div className="flex justify-center space-x-16 mb-10 w-full max-w-6xl">
        {createIcon(faArrowRight, "User-Friendly Interface")}      {/* Icon of a coffee cup */}
        {createIcon(faArrowRight, "Multiple types of import")}      {/* Icon of a laptop */}
        {createIcon(faArrowRight, "Multiple types of export")}    {/* Icon of an umbrella */}
      </div>

      {/* Second Row - 2 Icons */}
      <div className="flex justify-center space-x-16 w-full max-w-4xl">
        {createIcon(faArrowRight, "Customizable Annotations")}      {/* Icon of a camera */}
        {createIcon(faArrowRight, "Multi-language Support")}        {/* Icon of a book */}
      </div>
    </div>
  );
}

export default Features;
