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
import { Textarea } from "../../ui/textarea";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SuccessAlertMessage from "@/components/Alert/SuccessAlertMessage";
import ErrorMessage from "@/components/Alert/ErrorMessage";
import { Button } from "@/components/ui/button";
import { CreateForwardPackage } from "@/services/forwardPackage";
import { Agent } from "@/types";
import { getAgents } from "@/services/agentService";

interface FormInputs {
  trackingNumber: string;
  destinationAgentId: string;
  shipmentInformation: string;
  arrivalTime: string;
}
const ForwardPackage = () => {
  const queryClient = useQueryClient();

  const {
    data: agents = [],
    isLoading,
    isError,
  } = useQuery<Agent[]>({
    queryKey: ["agents"],
    queryFn: getAgents, // Ensure this function returns Agent[] from the API
  });

  const createPackageMutation = useMutation({
    mutationFn: CreateForwardPackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forwardingPackages"] });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    control, // Add this line
    formState: { errors },
  } = useForm<FormInputs>();

  // console.log({ packages });
  const onSubmit: SubmitHandler<FormInputs> = (formData) => {
    console.log({ formData });
    createPackageMutation.mutate(formData);
    reset(); // Reset the form after submission
  };
  if (isLoading) {
    return " package forwarding  Loading...";
  } else if (isError) {
    return "Error loading package forwarding ";
  }
  return (
    <div className="font-[sans-serif]">
      <div className="mx-4 mb-4">
        {createPackageMutation.isSuccess && (
          <SuccessAlertMessage user_text="You have created the Package successfully" />
        )}
        {createPackageMutation.isError && (
          <ErrorMessage user_text={createPackageMutation.error?.message} />
        )}
        <form
          className="max-w-4xl mx-auto bg-white shadow-md sm:p-8 p-4 rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h4 className="text-lg text-black font-sans font-semibold mb-4">
            Fill Forwarding Package Form
          </h4>

          {/* Package Name */}
          <div>
            <Label name="trackingNumber" />
            <Input
              {...register("trackingNumber", {
                required: "Package name is required",
              })}
              placeholder="Package name"
              type="text"
            />
            {errors.trackingNumber && (
              <p className="text-red-500">{errors.trackingNumber.message}</p>
            )}
          </div>

          <div>
            <Label name="arrivalTime" />
            <Input
              {...register("arrivalTime", {
                required: "Receiver mobile is required",
              })}
              placeholder="Receiver mobile"
              type="date"
            />
            {errors.arrivalTime && (
              <p className="text-red-500">{errors.arrivalTime.message}</p>
            )}
          </div>
          <div>
            <Label name="shipmentInformation" />
            <Textarea
              {...register("shipmentInformation", {
                required: "Receiver address is required",
              })}
              placeholder="Receiver address"
            />
            {errors.shipmentInformation && (
              <p className="text-red-500">
                {errors.shipmentInformation.message}
              </p>
            )}
          </div>

          {/* Package Dimensions */}
          <div>
            {/* Priority Selection */}
            <div>
              <Label name="destinationAgentId" />
              <Controller
                name="destinationAgentId"
                control={control}
                rules={{ required: "destinationAgentId is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-gray-100 border border-gray-200 rounded-md">
                      <SelectValue placeholder="Select a destinationAgentId" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>destinationAgentId</SelectLabel>
                        <SelectItem value="URGENT">Urgent</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.destinationAgentId && (
                <p className="text-red-500">
                  {errors.destinationAgentId.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <Button type="submit" disabled={createPackageMutation.isPending}>
              {createPackageMutation.isPending ? "Adding..." : "Add Package"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForwardPackage;
