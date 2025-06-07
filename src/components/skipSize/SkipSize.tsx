import { useState } from "react";
import { useSkipSize } from "@/hooks/skip-size";
import { TriangleAlert } from "lucide-react";

import img4 from "../../assets/4-yarder-skip.jpg";
import img5 from "../../assets/5-yarder-skip.jpg";
import img6 from "../../assets/6-yarder-skip.jpg";
import img8 from "../../assets/8-yarder-skip.jpg";
import img10 from "../../assets/10-yarder-skip.jpg";

import img12 from "../../assets/12-yarder-skip.jpg";
import img14 from "../../assets/14-yarder-skip.jpg";
import img16 from "../../assets/16-yarder-skip.jpg";
import img20 from "../../assets/20-yarder-skip.jpg";
import img40 from "../../assets/40-yarder-skip.jpg";

import SkipCardSkeleton from "../skeletonLoading/SkipCardSkeleton";
import { SkipData } from "@/types/skip";

const SkipSize = () => {
  const { data: skipSizeData, isLoading, isError } = useSkipSize();
  const [selectedSkip, setSelectedSkip] = useState<SkipData | null>(null);

  const skipImages: Record<number, string> = {
    4: img4,
    5: img5,
    6: img6,
    8: img8,
    10: img10,
    12: img12,
    14: img14,
    16: img16,
    20: img20,
    40: img40,
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-y-3 pl-6">
        {[...Array(3)].map((_, i) => (
          <SkipCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-800 font-serif text-base flex justify-center mt-32">
        Something went wrong!
      </div>
    );
  }

  return (
    <>
      <div className="p-14 pt-8 bg-black">
        <h3 className="text-2xl font-bold text-center mb-2 text-white dark:text-white">
          Choose Your Skip Size
        </h3>
        <p className="text-[16px] text-center  text-gray-200 font-semibold font-sans">
          Select the skip size that best suits your needs
        </p>
      </div>

      <div className=" gap-y-6  gap-x-5  bg-black pb-32 px-16  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:px-6 lg:px-16">
        {skipSizeData?.map((skip) => (
          <div
            key={skip.id}
            onClick={() => setSelectedSkip(skip)}
            className={` hover:border-gray-600 cursor-pointer  border rounded-lg shadow-sm transition-all bg-gray-900 pb-4 pr-3
              ${
                selectedSkip?.id === skip.id
                  ? "border-blue-500 bg-blue-50 dark:border-blue-400"
                  : "bg-white border-gray-800 dark:bg-gray-800 dark:border-gray-700"
              }`}
          >
            <div className="relative p-4">
              <img
                className="rounded-lg w-full h-[220px] object-cover"
                src={skipImages[skip.size] || img4}
                alt={`${skip.size}-yard skip`}
              />
              {/* Top-right overlay */}
              <div className="absolute top-2 right-2 mt-4 mr-5 bg-blue-700 text-gray-100 font-700 text-[15px] px-4 py-[1.4px]  rounded-2xl shadow-md">
                {skip.size} Yards
              </div>

              {/* Bottom-left overlay */}
              {skip.allowed_on_road == false && (
                <div className="absolute bottom-2 left-2 bg-black/70 text-xs font-medium px-2 py-1 ml-3 mb-3 rounded-md shadow-md text-white flex items-center gap-1">
                  <TriangleAlert className="text-yellow-400 w-4 h-4" />
                  <span className="text-yellow-400">
                    Not Allowed On The Road
                  </span>
                </div>
              )}
            </div>

            <div className=" pl-5">
              <div className=" flex justify-between pr-3">
                <h5 className="text-xl font-bold text-gray-300 dark:text-gray-100 mb-2">
                  {skip.size} Yard Skip
                </h5>
                <p className="text-blue-700 font-semibold text-lg ">
                  £{skip.price_before_vat}
                </p>
              </div>
              <p className="text-gray-400 dark:text-gray-400 mb-4 text-sm">
                14 day hire period
              </p>

              <button
                onClick={() => setSelectedSkip(skip)}
                className={` mt-5 w-full inline-flex justify-center items-center px-4 py-3 text-sm font-medium rounded-lg 
                  ${
                    selectedSkip?.id === skip.id
                      ? "bg-blue-600"
                      : "bg-gray-700 hover:bg-gray-800"
                  } text-gray-100`}
              >
                {selectedSkip?.id === skip.id ? "Selected" : "Select This Skip"}
                <svg
                  className="w-3.5 h-3.5 ml-2"
                  fill="none"
                  viewBox="0 0 14 10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      {selectedSkip && (
        <div className="fixed  bottom-0 left-0 w-full bg-gray-900 border-t-[0.5px]  border-t-gray-300 text-white p-4 sm:flex justify-between items-center z-50 shadow-inner">
          <div className="text-lg font-medium sm:border-b-[0.3px] ml-6 ">
            {selectedSkip.size} Yard Skip ,
            <span className="text-blue-400 font-bold ml-4">
              £{selectedSkip.price_before_vat}
            </span>
            <span className="ml-3 text-sm ">14 day hire</span>
          </div>
          <div className="flex  justify-between gap-3 sm:mt-0 mt-6 ">
            <button
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md"
              onClick={() => setSelectedSkip(null)}
            >
              Back
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md">
              Continue →
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SkipSize;
