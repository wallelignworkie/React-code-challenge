import ErrorMessage from "@/components/Alert/ErrorMessage";
import SuccessAlertMessage from "@/components/Alert/SuccessAlertMessage";
import { Button } from "@/components/ui/button";
import { CreatePackage, UpdatePackage } from "@/services/packageService";
import { RootState } from "@/store/store";
import { FormInputs, PackageRequest } from "@/types/package";
import { formatPhoneNumber } from "@/utils/formatPhone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const StepFive = ({ prevStep }: { prevStep: () => void }) => {
  const queryClient = useQueryClient();
  const packageData = useSelector((state: RootState) => state.package.formData);

  const { handleSubmit, reset } = useForm<FormInputs>({
    defaultValues: packageData, // Persist previous form values
  });

  const { id } = useParams<{ id?: string }>();

  // Mutations for create and update
  const updatePackageMutation = useMutation({
    mutationFn: (updatedData: PackageRequest) =>
      UpdatePackage(id as string, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });

  const createPackageMutation = useMutation({
    mutationFn: CreatePackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      reset(); // Reset form after successful submission
    },
  });

  // Convert form data and handle submission
  const onSubmit = (data: FormInputs) => {
    const formattedSenderPhone = formatPhoneNumber(
      data.senderPhoneNumber.trim()
    );
    const formattedReceiverPhone = formatPhoneNumber(
      data.receiverPhoneNumber.trim()
    );

    // Ensure numeric values are correctly formatted
    const dataToSubmit: PackageRequest = {
      ...data,
      senderPhoneNumber: formattedSenderPhone,
      receiverPhoneNumber: formattedReceiverPhone,
      width: Number(data.width),
      height: Number(data.height),
      weight: Number(data.weight),
      length: Number(data.length),
      price: Number(data.price),
    };

    console.log("Submitting data:", dataToSubmit);

    if (id) {
      // If editing, only update
      updatePackageMutation.mutate(dataToSubmit);
    } else {
      // If creating, only create
      createPackageMutation.mutate(dataToSubmit);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" flex justify-between">
        <h3 className="text-lg font-semibold">Review Your Details</h3>
        <a href="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-reload"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" />
            <path d="M20 4v5h-5" />
          </svg>
        </a>
      </div>

      {/* Display Form Data */}
      <pre className="bg-gray-100 p-4 rounded-md">
        {JSON.stringify(packageData, null, 2)}
      </pre>

      {/* Success & Error Messages */}
      <div>
        {createPackageMutation.isSuccess && (
          <SuccessAlertMessage
            user_text={"You have created a package successfully!"}
          />
        )}
        {createPackageMutation.isError && (
          <ErrorMessage user_text={createPackageMutation.error.message} />
        )}
        {updatePackageMutation.isSuccess && (
          <SuccessAlertMessage user_text={"Package updated successfully!"} />
        )}
        {updatePackageMutation.isError && (
          <ErrorMessage user_text={updatePackageMutation.error.message} />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        <Button type="button" onClick={prevStep}>
          Previous
        </Button>
        <Button
          type="submit"
          disabled={
            createPackageMutation.isPending || updatePackageMutation.isPending
          }
        >
          {id
            ? updatePackageMutation.isPending
              ? "Updating..."
              : "Update Package"
            : createPackageMutation.isPending
            ? "Submitting..."
            : "Add Package"}
        </Button>
      </div>
    </form>
  );
};

export default StepFive;
