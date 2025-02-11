import ErrorMessage from "@/components/Alert/ErrorMessage";
import SuccessAlertMessage from "@/components/Alert/SuccessAlertMessage";
import { Button } from "@/components/ui/button";
import { CreatePackage } from "@/services/packageService";
import { usePackageStore } from "@/store/usePackageStore";
import { FormInputs } from "@/types/package";
import { formatPhoneNumber } from "@/utils/formatPhone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const StepFive = ({ prevStep }: { prevStep: () => void }) => {
  const queryClient = useQueryClient();
  const { formData } = usePackageStore(); // Zustand store

  const {
    handleSubmit,
    reset,
    register, // Ensure all inputs are controlled by react-hook-form
  } = useForm<FormInputs>({
    defaultValues: formData, // Persist previous form values
  });

  const createPackageMutation = useMutation({
    mutationFn: CreatePackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      //   alert("Package created successfully!"); // Optional feedback
      reset(); // Reset form after successful submission
    },
  });

  const onSubmit = (data: FormInputs) => {
    const formattedSenderPhone = formatPhoneNumber(
      data.senderPhoneNumber.trim()
    );
    const formattedReceiverPhone = formatPhoneNumber(
      data.receiverPhoneNumber.trim()
    );

    const dataToSubmit = {
      ...data,
      senderPhoneNumber: formattedSenderPhone,
      receiverPhoneNumber: formattedReceiverPhone,
      width: parseFloat(data.width as unknown as string),
      height: parseFloat(data.height as unknown as string),
      weight: parseFloat(data.weight as unknown as string),
      length: parseFloat(data.length as unknown as string),
      price: parseFloat(data.price as unknown as string),
    };

    console.log("Submitting data:", dataToSubmit);
    createPackageMutation.mutate(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" flex justify-between">
        {" "}
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
          </svg>{" "}
        </a>
      </div>
      <pre className="bg-gray-100 p-4 rounded-md">
        {JSON.stringify(formData, null, 2)}
      </pre>
      <div>
        {createPackageMutation.isSuccess && (
          <SuccessAlertMessage
            user_text={"you have created package Successfully"}
          />
        )}
        {createPackageMutation.isError && (
          <ErrorMessage user_text={createPackageMutation.error.message} />
        )}
      </div>
      <div className="mt-8 flex justify-between">
        <Button type="button" onClick={prevStep}>
          Previous
        </Button>
        <Button type="submit" disabled={createPackageMutation.isPending}>
          {createPackageMutation.isPending ? "Submitting..." : "Add Package"}
        </Button>
      </div>
    </form>
  );
};

export default StepFive;
