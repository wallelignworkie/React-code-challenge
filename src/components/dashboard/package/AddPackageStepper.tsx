import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import Stepper from "./Stepper";
import { usePackageStore } from "@/store/usePackageStore";
import StepFive from "./StepFive";

const AddPackageStepper = () => {
  const { currentStep, setStep } = usePackageStore();

  const nextStep = () => setStep(currentStep + 1);
  const prevStep = () => setStep(currentStep - 1);

  return (
    <div className=" w-full bg-white shadow-md sm:p-8 p-4 rounded-md">
      <Stepper /> {/* Stepper Indicator */}
      {currentStep === 1 && <StepOne nextStep={nextStep} />}
      {currentStep === 2 && <StepTwo nextStep={nextStep} prevStep={prevStep} />}
      {currentStep === 3 && (
        <StepThree nextStep={nextStep} prevStep={prevStep} />
      )}
      {currentStep === 4 && (
        <StepFour nextStep={nextStep} prevStep={prevStep} />
      )}
      {currentStep === 5 && <StepFive prevStep={prevStep} />}
    </div>
  );
};

export default AddPackageStepper;
