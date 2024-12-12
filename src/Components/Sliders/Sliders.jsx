import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/JORDAN1.png";
import image1 from "../../assets/JORDAN4.png";
import image2 from "../../assets/JORDAN2.png";
import image3 from "../../assets/JORDAN5.png";

const InfiniteScrolls = () => {
  const [duplicates, setDuplicates] = useState(2);
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const scrollRef3 = useRef(null);

  const images = [logo, image1, image2, image3, image1];

  useEffect(() => {
    const calculateDuplicates = () => {
      if (scrollRef1.current) {
        const containerWidth = scrollRef1.current.offsetWidth;
        const imageWidth = containerWidth / 5; // Dynamically calculate width
        const imagesNeeded = Math.ceil(containerWidth / imageWidth) + 1;
        setDuplicates(Math.max(2, imagesNeeded));
      }
    };

    calculateDuplicates();
    window.addEventListener("resize", calculateDuplicates);

    return () => window.removeEventListener("resize", calculateDuplicates);
  }, []);

  const renderImages = (count, reverse = false, uniquePrefix = "") => {
    const repeatedImages = [];

    for (let iteration = 0; iteration < count; iteration++) {
      const iterationImages = images.map((img, index) => (
        <img
          key={`${uniquePrefix}-${iteration}-${index}`}
          className="inline-block h-32 md:h-36 lg:h-48 w-auto mr-4 md:mr-8 lg:mr-12"
          src={img}
          alt={`Image ${index + 1}`}
        />
      ));

      repeatedImages.push(...iterationImages);
    }

    return reverse ? repeatedImages.reverse() : repeatedImages;
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-8 pt-20 bg-[#FBFAF1]">
      {/* Row 1 */}
      <div ref={scrollRef1} className="w-full overflow-hidden">
        <div className="group flex animate-scrollHorizontalLeft whitespace-nowrap">
          {renderImages(duplicates)}
        </div>
      </div>

      <hr className="border-t border-black opacity-20 w-[90%] lg:w-[70%] my-4" />

      {/* Row 2 */}
      <div ref={scrollRef2} className="w-full overflow-hidden">
        <div className="group flex animate-scrollHorizontalRight whitespace-nowrap">
          {renderImages(duplicates, true)}
        </div>
      </div>

      <hr className="border-t border-black opacity-20 w-[90%] lg:w-[70%] my-4" />

      {/* Row 3 */}
      <div ref={scrollRef3} className="w-full overflow-hidden">
        <div className="group flex animate-scrollHorizontalLeft whitespace-nowrap">
          {renderImages(duplicates)}
        </div>
      </div>
    </div>
  );
};

export default InfiniteScrolls;
