import React from 'react'
import Image from 'next/image'

const MockupComponent = () => {
  return (
    <div className='w-full py-14 lg:py-16 bg-[var(--accent)] h-[700px] md:h-[800px] lg:h-[500px] flex flex-col lg:flex-row items-center justify-center text-center gap-10 lg:gap-15 my-10'>
      <div className="flex flex-col items-center justify-center lg:items-start lg:justify-start mt-10 lg:mt-0 gap-4">
        <h4 className="text-2xl md:text-5xl lg:text-4xl text-white text-center lg:text-left font-bold">Download the <br /><span className="text-2xl md:text-5xl lg:text-3xl xl:text-5xl 2xl:text-6xl">The Monash Wellness App</span></h4>
        <p className="text-gray-200 font-medium text-lg md:text-2xl px-6 md:px-0 lg:text-lg xl:text-xl mt-4">bring your journey towards making people healthy</p>
        {/* <div className="flex items-center justify-start gap-4 mt-2">
          <Image src="/playstore.png" alt="playstore" width={1000} height={1000} className="cursor-pointer w-30 xl:w-48 md:w-42"/>
          <Image src="/appstore.png" alt="playstore" width={1000} height={1000} className="cursor-pointer w-30 xl:w-48 md:w-42"/>
        </div> */}
        <button className="w-1/2 hover:bg-gray-200 text-black cursor-pointer font-semibold text-lg bg-white ring-1 px-4 py-2 rounded-xl">Join Now For Free</button>
      </div>
      <Image src="/HWD_Mockup.png" alt="mockup" width={500} height={500} className=" lg:w-[38vw] xl:w-[35vw]" />
    </div>
  )
}

export default MockupComponent