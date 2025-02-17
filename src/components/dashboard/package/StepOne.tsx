import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setPackageData } from "@/store/editPackageSlice";
import { PackageDetail } from "@/services/packageService";
import { FormInputs } from "@/types/package";
import { setFormData } from "@/store/packageSlice";

const StepOne = ({ nextStep }: { nextStep: () => void }) => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  // Get package form data from Redux
  const packageData = useSelector((state: RootState) => state.package.formData);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({ defaultValues: packageData });

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

  useEffect(() => {
    if (fetchedPackage) {
      // ✅ Convert `from` and `to` from objects to IDs
      const transformedData: FormInputs = {
        packageName: fetchedPackage.packageName,
        width: fetchedPackage.width,
        height: fetchedPackage.height,
        weight: fetchedPackage.weight,
        length: fetchedPackage.length,
        priority: fetchedPackage.priority,
        from: fetchedPackage.from?.id || "", // Extract only the ID
        to: fetchedPackage.to?.id || "", // Extract only the ID
        senderFirstName: fetchedPackage.senderFirstName,
        senderLastName: fetchedPackage.senderLastName,
        senderPhoneNumber: fetchedPackage.senderPhoneNumber,
        senderAddress: fetchedPackage.senderAddress,
        receiverFirstName: fetchedPackage.receiverFirstName,
        receiverLastName: fetchedPackage.receiverLastName,
        receiverPhoneNumber: fetchedPackage.receiverPhoneNumber,
        receiverAddress: fetchedPackage.receiverAddress,
        price: fetchedPackage.price,
        paymentType: "ONDELIVERY", // Default value
      };

      // ✅ Dispatch transformed data to Redux
      dispatch(setPackageData(fetchedPackage));

      // ✅ Set transformed form values
      Object.entries(transformedData).forEach(([key, value]) => {
        setValue(key as keyof FormInputs, value ?? "");
      });
    }
  }, [fetchedPackage, dispatch, setValue]);

  const onSubmit = (data: any) => {
    dispatch(setFormData(data));
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
