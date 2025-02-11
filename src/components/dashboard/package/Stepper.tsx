import { usePackageStore } from "@/store/usePackageStore";

const steps = [
  { id: 1, title: "Sender info." },
  { id: 2, title: "Receiver info." },
  { id: 3, title: "Package info." },
  { id: 4, title: "Package detail..." },
  { id: 5, title: "Review & Submit" },
];

const Stepper = () => {
  const { currentStep } = usePackageStore();

  return (
    <div className="flex  ml-0 sm:ml-14 mr-0 sm:-mr-24  max-w-full mx-auto">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;
        const isUpcoming = currentStep < step.id;
        console.log(isUpcoming);

        return (
          <div key={step.id} className="w-full">
            <h6
              className={`text-sm font-bold mb-2 ${
                isCompleted || isActive ? "text-EPrimary" : "text-gray-300"
              }`}
            >
              {step.title}
            </h6>

            <div className="flex items-center w-full">
              {/* Step Circle */}
              <div
                className={`w-7 h-7 shrink-0 mx-[-1px] flex items-center justify-center rounded-full border-2 ${
                  isCompleted
                    ? "border-green-500 bg-green-500 text-white"
                    : isActive
                    ? "border-green-500 text-green-500"
                    : "border-gray-300 text-gray-300"
                }`}
              >
                {isCompleted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 fill-white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                  </svg>
                ) : isActive ? (
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                ) : (
                  <span className="text-sm font-bold">{step.id}</span>
                )}
              </div>

              {/* Step Line */}
              {index !== steps.length - 1 && (
                <div
                  className={`w-full h-[3px] ${
                    isCompleted ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
