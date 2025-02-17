import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { usePackageStore } from "@/store/usePackageStore";
import { Button } from "@/components/ui/button";
import Label from "../../label/Label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getCities } from "@/services/cities";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/store/packageSlice";

const StepFour = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const dispatch = useDispatch();
  const packageData = useSelector((state: RootState) => state.package.formData);
  const [cityError, setCityError] = useState<string | null>(null); // Custom error state

  const {
    data: cities = [],
    isLoading,
    isError,
  } = useQuery({ queryKey: ["cities"], queryFn: getCities });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: packageData });

  const onSubmit = (data: any) => {
    if (data.from === data.to) {
      setCityError("Destination cannot be the same as the starting place.");
      return; // Stop form submission
    }

    setCityError(null); // Clear error if valid
    dispatch(setFormData(data));
    nextStep();
  };

  return (
    <div className="font-[sans-serif]">
      <div className="mx-4 mb-4">
        <form
          className="max-w-4xl mx-auto sm:p-8 p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Starting Place */}
            <div>
              <Label name="Starting Place" />
              <Controller
                name="from"
                control={control}
                rules={{ required: "Starting place is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-gray-100 border border-gray-200 rounded-md">
                      <SelectValue placeholder="Select Origin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select Origin</SelectLabel>

                        {cities.map((city) => (
                          <SelectItem key={city.id} value={city.id}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {isLoading && <div> Cities Loading....</div>}
              {isError && <div>Fetching cities Error! </div>}
              {errors.from && (
                <p className="text-red-500">{errors.from.message}</p>
              )}
            </div>

            {/* Destination */}
            <div>
              <Label name="Destination" />
              <Controller
                name="to"
                control={control}
                rules={{ required: "Destination is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-gray-100 border border-gray-200 rounded-md">
                      <SelectValue placeholder="Select Destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select Destination</SelectLabel>
                        {isLoading && <div> Cities Loading....</div>}
                        {isError && <div>Fetching cities Error! </div>}
                        {cities.map((city) => (
                          <SelectItem key={city.id} value={city.id}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {isLoading && <div> Cities Loading....</div>}
              {isError && <div>Fetching cities Error! </div>}
              {errors.to && <p className="text-red-500">{errors.to.message}</p>}
            </div>

            {/* Display city validation error */}
            {cityError && <p className="text-red-500">{cityError}</p>}

            {/* Payment Type Selection */}
            <div>
              <Label name="Payment Type" />
              <Controller
                name="paymentType"
                control={control}
                rules={{ required: "Payment type is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-gray-100 border border-gray-200 rounded-md">
                      <SelectValue placeholder="Select a payment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Payment Type</SelectLabel>
                        <SelectItem value="UPFRONT">UPFRONT</SelectItem>
                        <SelectItem value="ONDELIVERY">ONDELIVERY</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.paymentType && (
                <p className="text-red-500">{errors.paymentType.message}</p>
              )}
            </div>

            {/* Priority Selection */}
            <div>
              <Label name="Priority" />
              <Controller
                name="priority"
                control={control}
                rules={{ required: "Priority is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-gray-100 border border-gray-200 rounded-md">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Priority</SelectLabel>
                        <SelectItem value="URGENT">Urgent</SelectItem>
                        <SelectItem value="NORMAL">Normal</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.priority && (
                <p className="text-red-500">{errors.priority.message}</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Button onClick={prevStep} type="button">
              Previous
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StepFour;
