import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { usePackageStore } from "@/store/usePackageStore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const StepTwo = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const { formData, setFormData } = usePackageStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: formData });

  const onSubmit = (data: any) => {
    setFormData(data);
    nextStep();
  };

  return (
    <div className="font-[sans-serif] ">
      <div className="mx-4 mb-4">
        <form
          className="max-w-4xl mx-auto bg-white  sm:p-8 p-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Label>Receiver First Name</Label>
              <Input
                {...register("receiverFirstName", {
                  required: "receiver first name is required",
                })}
                placeholder="Receiver first name"
                type="text"
              />
              {errors.receiverFirstName && (
                <p className="text-red-500">
                  {errors.receiverFirstName.message}
                </p>
              )}
            </div>
            <div>
              <Label>Receiver Last Name</Label>
              <Input
                {...register("receiverLastName", {
                  required: "receiver last name is required",
                })}
                placeholder="Receiver last name"
                type="text"
              />
              {errors.receiverLastName && (
                <p className="text-red-500">
                  {errors.receiverLastName.message}
                </p>
              )}
            </div>
            <div>
              <Label>Receiver Mobile</Label>
              <Input
                {...register("receiverPhoneNumber", {
                  required: "Receiver mobile is required",
                  pattern: {
                    value: /^(?:\+2519\d{8}|\d{10})$/,
                    message: "Invalid Ethiopian phone number format",
                  },
                })}
                placeholder="Sender mobile"
                type="text"
              />
              {errors.receiverPhoneNumber && (
                <p className="text-red-500">
                  {errors.receiverPhoneNumber.message}
                </p>
              )}
            </div>

            <div>
              <Label>Receiver Address</Label>
              <Textarea
                {...register("receiverAddress", {
                  required: "receiver address is required",
                })}
                placeholder="Receiver address"
              />
              {errors.receiverAddress && (
                <p className="text-red-500">{errors.receiverAddress.message}</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Button onClick={prevStep} type="submit">
              Previous
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StepTwo;
