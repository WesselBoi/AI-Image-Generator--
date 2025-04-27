import React, { useState } from 'react'
import { download } from '../../assets'
import { downloadImage } from '../utils'

const Card = ({_id, name, prompt, photo}) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  
  // Toggle details visibility for mobile
  const toggleDetails = () => {
    setIsDetailsVisible(prev => !prev);
  }
  
  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
      <img
        className='w-full h-auto object-cover rounded-xl'
        src={photo}
        alt={prompt}
        onClick={toggleDetails} //click handler for mobile
      />
      
      <div 
        className={`${isDetailsVisible ? 'flex' : 'hidden'} md:hidden flex-col max-h-[94.5%] absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md`}
      >
        <p className='text-white text-sm overflow-y-auto prompt'>{prompt}</p>
        <div className='mt-5 flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <div className='bg-green-700 w-7 h-7 rounded-full flex justify-center items-center text-xs font-bold'>
              {name[0]}
            </div>
            <p className='text-white text-sm'>{name}</p>
          </div>
          <button 
            type='button' 
            onClick={(e) => {
              e.stopPropagation(); // Prevent toggleDetails from firing
              downloadImage(_id, photo);
            }} 
            className='outline-none bg-transparent border-none cursor-pointer'
          >
            <img
              src={download}
              alt='download'
              className='w-6 h-6 object-contain invert'
            />
          </button>
        </div>
      </div>
      
      {/* Desktop hover details - only shown on larger screens */}
      <div className='group-hover:flex md:flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md'>
        <p className='text-white text-sm overflow-y-auto prompt'>{prompt}</p>
        <div className='mt-5 flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <div className='bg-green-700 w-7 h-7 rounded-full flex justify-center items-center text-xs font-bold'>
              {name[0]}
            </div>
            <p className='text-white text-sm'>{name}</p>
          </div>
          <button 
            type='button' 
            onClick={() => downloadImage(_id, photo)} 
            className='outline-none bg-transparent border-none cursor-pointer'
          >
            <img
              src={download}
              alt='download'
              className='w-6 h-6 object-contain invert'
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card