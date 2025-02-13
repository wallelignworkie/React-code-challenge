import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { usePackageStore } from "@/store/usePackageStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { useEditPackageStore } from "@/store/useEditPackageStore";
import { FormInputs } from "@/types/package"; // Import both interfaces
import { useEffect } from "react";
import { PackageDetail } from "@/services/packageService";

const StepOne = ({ nextStep }: { nextStep: () => void }) => {
  const { formData, setFormData } = usePackageStore();
  const { id } = useParams<{ id: string }>(); // Get package ID if editing
  const { setPackageData } = useEditPackageStore(); // Zustand store

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({ defaultValues: formData });

  // Fetch package data if editing
  const {
    data: fetchedPackage,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["packageData", id],
    queryFn: () => (id ? PackageDetail(id) : null),
    enabled: !!id,
  });

  // Convert `Package` to `FormInputs`
  useEffect(() => {
    if (fetchedPackage) {
      const transformedData: FormInputs = {
        packageName: fetchedPackage.packageName,
        width: fetchedPackage.width,
        height: fetchedPackage.height,
        weight: fetchedPackage.weight,
        length: fetchedPackage.length,
        priority: fetchedPackage.priority,
        from: fetchedPackage.from.id, // Extract city name
        to: fetchedPackage.to.id, // Extract city name
        senderFirstName: fetchedPackage.senderFirstName,
        senderLastName: fetchedPackage.senderLastName,
        senderPhoneNumber: fetchedPackage.senderPhoneNumber,
        senderAddress: fetchedPackage.senderAddress,
        receiverFirstName: fetchedPackage.receiverFirstName,
        receiverLastName: fetchedPackage.receiverLastName,
        receiverPhoneNumber: fetchedPackage.receiverPhoneNumber,
        receiverAddress: fetchedPackage.receiverAddress,
        price: fetchedPackage.price,
        paymentType: "ONDELIVERY", // Ensure it's set correctly (since it's not in `Package`)
      };

      // Store transformed data in Zustand
      setPackageData(fetchedPackage);

      // Set form values
      Object.entries(transformedData).forEach(([key, value]) => {
        setValue(key as keyof FormInputs, value ?? "");
      });
    }
  }, [fetchedPackage]);

  const onSubmit = (data: FormInputs) => {
    setFormData(data); // Save to Zustand
    nextStep();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data.</div>;

  return (
    <div className="font-[sans-serif]">
      <div className="mx-4 mb-4">
        <form
          className="max-w-4xl mx-auto bg-white sm:p-8 p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Label>Sender First Name</Label>
              <Input
                {...register("senderFirstName", { required: "Required" })}
                placeholder="Sender first name"
                type="text"
              />
              {errors.senderFirstName && (
                <p className="text-red-500">{errors.senderFirstName.message}</p>
              )}
            </div>
            <div>
              <Label>Sender Last Name</Label>
              <Input
                {...register("senderLastName", { required: "Required" })}
                placeholder="Sender last name"
                type="text"
              />
              {errors.senderLastName && (
                <p className="text-red-500">{errors.senderLastName.message}</p>
              )}
            </div>

            <div>
              <Label>Sender Mobile</Label>
              <Input
                {...register("senderPhoneNumber", {
                  required: "Required",
                  pattern: {
                    value: /^(?:\+2519\d{8}|\d{10})$/,
                    message: "Invalid Ethiopian phone number",
                  },
                })}
                placeholder="Sender mobile"
                type="text"
              />
              {errors.senderPhoneNumber && (
                <p className="text-red-500">
                  {errors.senderPhoneNumber.message}
                </p>
              )}
            </div>
            <div>
              <Label>Sender Address</Label>
              <Textarea
                {...register("senderAddress", { required: "Required" })}
                placeholder="Sender address"
              />
              {errors.senderAddress && (
                <p className="text-red-500">{errors.senderAddress.message}</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button type="submit">Next</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StepOne;
