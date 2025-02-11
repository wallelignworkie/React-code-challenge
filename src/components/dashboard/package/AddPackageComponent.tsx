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
import { CreatePackage } from "@/services/packageService";
import SuccessAlertMessage from "@/components/Alert/SuccessAlertMessage";
import ErrorMessage from "@/components/Alert/ErrorMessage";
import { Button } from "@/components/ui/button";
import { FormInputs } from "@/types/package";
import { getCities } from "@/services/cities";
import { formatPhoneNumber } from "@/utils/formatPhone";

const AddPackageComponent = () => {
  const queryClient = useQueryClient();

  const {
    data: cities = [],
    isLoading,
    isError,
  } = useQuery({ queryKey: ["cities"], queryFn: getCities });
  // console.log({ cities });

  const createPackageMutation = useMutation({
    mutationFn: CreatePackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    control, // Add this line
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (formData) => {
    const formattedSenderPhone = formatPhoneNumber(
      formData.senderPhoneNumber.trim()
    );
    const formattedReceiverPhone = formatPhoneNumber(
      formData.receiverPhoneNumber.trim()
    );
    const dataToSubmit = {
      ...formData,
      senderPhoneNumber: formattedSenderPhone,
      receiverPhoneNumber: formattedReceiverPhone,
      width: parseFloat(formData.width as unknown as string),
      height: parseFloat(formData.height as unknown as string),
      weight: parseFloat(formData.weight as unknown as string),
      length: parseFloat(formData.length as unknown as string),
      price: parseFloat(formData.price as unknown as string),
    };
    console.log({ dataToSubmit });
    createPackageMutation.mutate(dataToSubmit);
    reset(); // Reset the form after submission
  };
  if (isLoading) {
    return " cities Loading...";
  } else if (isError) {
    return "Error loading cities";
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
            Fill Package Form
          </h4>

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

            {/* Sender Information */}
            <div>
              <Label name="Sender First Name" />
              <Input
                {...register("senderFirstName", {
                  required: "Sender name is required",
                })}
                placeholder="Sender name"
                type="text"
              />
              {errors.senderFirstName && (
                <p className="text-red-500">{errors.senderFirstName.message}</p>
              )}
            </div>
            <div>
              <Label name="Sender Lat Name" />
              <Input
                {...register("senderLastName", {
                  required: "Sender name is required",
                })}
                placeholder="Sender name"
                type="text"
              />
              {errors.senderLastName && (
                <p className="text-red-500">{errors.senderLastName.message}</p>
              )}
            </div>
            <div>
              <Label name="Sender Mobile" />
              <Input
                {...register("senderPhoneNumber", {
                  required: "Sender mobile is required",
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
              <Label name="Sender Address" />
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

            {/* Receiver Information */}
            <div>
              <Label name="Receiver First Name" />
              <Input
                {...register("receiverFirstName", {
                  required: "Receiver name is required",
                })}
                placeholder="Receiver First name"
                type="text"
              />
              {errors.receiverFirstName && (
                <p className="text-red-500">
                  {errors.receiverFirstName.message}
                </p>
              )}
            </div>
            <div>
              <Label name="Receiver Last Name" />
              <Input
                {...register("receiverLastName", {
                  required: "Receiver name is required",
                })}
                placeholder="Receiver Last name"
                type="text"
              />
              {errors.receiverLastName && (
                <p className="text-red-500">
                  {errors.receiverLastName.message}
                </p>
              )}
            </div>
            <div>
              <Label name="Receiver Mobile" />
              <Input
                {...register("receiverPhoneNumber", {
                  required: "Receiver mobile is required",
                })}
                placeholder="Receiver mobile"
                type="text"
              />
              {errors.receiverPhoneNumber && (
                <p className="text-red-500">
                  {errors.receiverPhoneNumber.message}
                </p>
              )}
            </div>
            <div>
              <Label name="Receiver Address" />
              <Textarea
                {...register("receiverAddress", {
                  required: "Receiver address is required",
                })}
                placeholder="Receiver address"
              />
              {errors.receiverAddress && (
                <p className="text-red-500">{errors.receiverAddress.message}</p>
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

            {/* Starting Place */}
            <div>
              <Label name="Starting Place " />
              <Controller
                name="from"
                control={control}
                rules={{ required: "Starting place is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-gray-100 border border-gray-200 rounded-md">
                      <SelectValue placeholder="Select a Origin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>select Origin</SelectLabel>
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
              {errors.from && (
                <p className="text-red-500">{errors.from?.message}</p>
              )}
            </div>

            {/* destination */}
            <div>
              <Label name="Destination " />
              <Controller
                name="to"
                control={control}
                rules={{ required: "Destination is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-gray-100 border border-gray-200 rounded-md">
                      <SelectValue placeholder="Select a Destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>select Destination</SelectLabel>
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
              {errors.to && (
                <p className="text-red-500">{errors.to?.message}</p>
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

            {/* payment type Selection */}
            <div>
              <Label name="Payment Type" />
              <Controller
                name="paymentType"
                control={control}
                rules={{ required: "payment type is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-gray-100 border border-gray-200 rounded-md">
                      <SelectValue placeholder="Select a priority" />
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
              {errors.priority && (
                <p className="text-red-500">{errors.priority.message}</p>
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
                      <SelectValue placeholder="Select a priority" />
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

export default AddPackageComponent;
