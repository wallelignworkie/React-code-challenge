import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import Stepper from "./Stepper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store"; // Import RootState
import { nextStep, prevStep } from "@/store/packageSlice"; // Import Redux actions

const AddPackageStepper = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector(
    (state: RootState) => state.package.currentStep
  );

  return (
    <div className="w-full bg-white shadow-md sm:p-8 p-4 rounded-md">
      <Stepper /> {/* Stepper Indicator */}
      {currentStep === 1 && <StepOne nextStep={() => dispatch(nextStep())} />}
      {currentStep === 2 && (
        <StepTwo
          nextStep={() => dispatch(nextStep())}
          prevStep={() => dispatch(prevStep())}
        />
      )}
      {currentStep === 3 && (
        <StepThree
          nextStep={() => dispatch(nextStep())}
          prevStep={() => dispatch(prevStep())}
        />
      )}
      {currentStep === 4 && (
        <StepFour
          nextStep={() => dispatch(nextStep())}
          prevStep={() => dispatch(prevStep())}
        />
      )}
      {currentStep === 5 && <StepFive prevStep={() => dispatch(prevStep())} />}
    </div>
  );
};

export default AddPackageStepper;
