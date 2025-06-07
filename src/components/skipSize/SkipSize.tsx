import { useState } from "react";
import { useSkipSize } from "@/hooks/skip-size";

import img4 from "../../assets/4-yarder-skip.jpg";
import img6 from "../../assets/4-yarder-skip.jpg";
import img8 from "../../assets/4-yarder-skip.jpg";
import img10 from "../../assets/4-yarder-skip.jpg";
import img14 from "../../assets/4-yarder-skip.jpg";
import SkipCardSkeleton from "../skeletonLoading/SkipCardSkeleton";
import { SkipData } from "@/types/skip";

const SkipSize = () => {
  const { data: skipSizeData, isLoading, isError } = useSkipSize();
  const [selectedSkip, setSelectedSkip] = useState<SkipData | null>(null);

  const skipImages: Record<number, string> = {
    4: img4,
    6: img6,
    8: img8,
    10: img10,
    14: img14,
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
      <div className="p-14 mt-8">
        <h3 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          Choose Your Skip Size
        </h3>
        <p className="text-base text-center">
          Select the skip size that best suits your needs
        </p>
      </div>

      <div className="pl-6 gap-6 grid grid-cols-3">
        {skipSizeData?.map((skip) => (
          <div
            key={skip.id}
            onClick={() => setSelectedSkip(skip)}
            className={`cursor-pointer max-w-sm border rounded-lg shadow-sm transition-all
              ${
                selectedSkip?.id === skip.id
                  ? "border-blue-500 bg-blue-50 dark:border-blue-400"
                  : "bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
              }`}
          >
            <img
              className="rounded-t-lg w-full object-cover"
              src={skipImages[skip.size] || img4}
              alt={`${skip.size}-yard skip`}
            />
            <div className="p-5">
              <h5 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {skip.size} Yard Skip
              </h5>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                14 day hire period
              </p>
              <p className="text-blue-700 font-semibold text-lg mb-4">
                £{skip.price_before_vat}
              </p>
              <button
                onClick={() => setSelectedSkip(skip)}
                className={`w-full inline-flex justify-center items-center px-4 py-2 text-sm font-medium rounded-lg 
                  ${
                    selectedSkip?.id === skip.id
                      ? "bg-blue-600"
                      : "bg-blue-700 hover:bg-blue-800"
                  } text-white`}
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
        <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex justify-between items-center z-50 shadow-inner">
          <div className="text-lg font-medium">
            {selectedSkip.size} Yard Skip
            <span className="text-blue-400 font-bold ml-2">
              £{selectedSkip.price_before_vat}
            </span>
            <span className="ml-1">14 day hire</span>
          </div>
          <div className="flex gap-3">
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
