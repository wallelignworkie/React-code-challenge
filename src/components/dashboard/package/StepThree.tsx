import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { usePackageStore } from "@/store/usePackageStore";
import { Button } from "@/components/ui/button";
import Label from "../../label/Label";

const StepThree = ({
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
    <div className="font-[sans-serif]">
      <div className="mx-4 mb-4">
        <form
          className="max-w-4xl mx-auto sm:p-8 p-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Package Name */}
            <div>
              <Label name="Package Name" />
              <Input
                {...register("packageName", {
                  required: "Package name is required",
                })}
                placeholder="Package name"
                type="text"
              />
              {errors.packageName && (
                <p className="text-red-500">{errors.packageName.message}</p>
              )}
            </div>

            {/* Package Dimensions */}
            <div>
              <Label name="Weight (KG)" />
              <Input
                {...register("weight", { required: "Weight is required" })}
                placeholder="Enter weight in kg"
                type="number"
              />
              {errors.weight && (
                <p className="text-red-500">{errors.weight.message}</p>
              )}
            </div>
            <div>
              <Label name="Length (CM)" />
              <Input
                {...register("length", { required: "Length is required" })}
                placeholder="Enter length in cm"
                type="number"
              />
              {errors.length && (
                <p className="text-red-500">{errors.length.message}</p>
              )}
            </div>
            <div>
              <Label name="Width (CM)" />
              <Input
                {...register("width", { required: "Width is required" })}
                placeholder="Enter width in cm"
                type="number"
              />
              {errors.width && (
                <p className="text-red-500">{errors.width.message}</p>
              )}
            </div>
            <div>
              <Label name="Height (CM)" />
              <Input
                {...register("height", { required: "Height is required" })}
                placeholder="Enter height in cm"
                type="number"
              />
              {errors.height && (
                <p className="text-red-500">{errors.height.message}</p>
              )}
            </div>
            {/* Price and Payment */}
            <div>
              <Label name="Price (Birr)" />
              <Input
                {...register("price", { required: "Price is required" })}
                placeholder="Enter price in Birr"
                type="number"
              />
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
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

export default StepThree;
