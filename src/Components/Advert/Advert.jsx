import React from 'react';
import style from "../../assets/running.jpg";
import run from "../../assets/run.jpg";
import runner from "../../assets/runner.jpg";

const Advert = () => {

  return (
    <div className="p-4 bg-[#FBFAF4]">
      {/* Header */}
      <h1 className="text-5xl font-semibold text-center text-[#24A5A8] font-contrail">GIVE A SPORT</h1>
      <p className="text-lg text-center text-[#473C3C] mt-2">Inspire them with gifts designed for championship athletes</p>
      <p className="text-black font-inter text-3xl mt-6">Latest & Greatest</p>
      
      {/* Images in a responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        <div className="text-left">
          <img 
            src={style} 
            alt="Style" 
            className="w-full h-[33rem] object-cover rounded-lg shadow-md" 
          />
          <p className="mt-4 text-lg text-black font-inter">Style Your Game</p>
        </div>
        <div className="text-left">
          <img 
            src={run} 
            alt="Run" 
            className="w-full h-[33rem] object-cover rounded-lg shadow-md" 
          />
          <p className="mt-4 text-lg text-black font-inter">Run Like a Champion</p>
        </div>
        <div className="text-left">
          <img 
            src={runner} 
            alt="Runner" 
            className="w-full h-[33rem] object-cover rounded-lg shadow-md" 
          />
          <p className="mt-4 text-lg text-black font-inter">Run Like a Champion</p>
        </div>
      </div>
    </div>
  );
};

export default Advert;
