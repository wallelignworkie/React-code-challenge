import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { usePackageStore } from "@/store/usePackageStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const StepOne = ({ nextStep }: { nextStep: () => void }) => {
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
    <div className="font-[sans-serif]">
      <div className="mx-4 mb-4">
        <form
          className="max-w-4xl mx-auto bg-white  sm:p-8 p-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Label>Sender First Name</Label>
              <Input
                {...register("senderFirstName", {
                  required: "Sender first name is required",
                })}
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
                {...register("senderLastName", {
                  required: "Sender first name is required",
                })}
                placeholder="Sender first name"
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
                  required: "Sender mobile is required",
                  pattern: {
                    value: /^(?:\+2519\d{8}|\d{10})$/,
                    message: "Invalid Ethiopian phone number format",
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
                {...register("senderAddress", {
                  required: "Sender address is required",
                })}
                placeholder="Sender address"
              />
              {errors.senderAddress && (
                <p className="text-red-500">{errors.senderAddress.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <Button type="submit">Next</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StepOne;
