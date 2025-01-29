import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { CreateAgent } from "@/services/agentService";
import SuccessAlertMessage from "@/components/Alert/SuccessAlertMessage";
import Label from "@/components/label/Label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/Alert/ErrorMessage";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCities } from "@/services/cities";

interface FormInputs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  cityId: string;
  address: string;
  gender: string;
  age: string;
  handlesUrgent: boolean;
}

const CreateAgentAccount = () => {
  const queryClient = useQueryClient();
  // // Fetch agents
  // const {
  //   data: agents = [],
  //   isLoading,
  //   isError,
  // } = useQuery({ queryKey: ["agents"], queryFn: getAgents });
  const {
    data: cities = [],
    isLoading,
    isError,
  } = useQuery({ queryKey: ["cities"], queryFn: getCities });
  console.log({ cities });

  const createAgentMutation = useMutation({
    mutationFn: CreateAgent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agents"] });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (formData) => {
    createAgentMutation.mutate(formData);
    reset();
  };
  if (isLoading) {
    return " cities Loading...";
  } else if (isError) {
    return "Error loading cities";
  }
  return (
    <div className="font-[sans-serif]">
      {/* Header Section */}
      <div className="text-center bg-gradient-to-r from-EPrimary to-gray-400 min-h-[160px] sm:p-6 p-4">
        <h4 className="sm:text-3xl text-2xl font-bold text-white">
          Create your Agent account
        </h4>
      </div>

      {/* Main Form Section */}
      <div className="mx-4 mb-4 -mt-16">
        {createAgentMutation.isSuccess && (
          <SuccessAlertMessage user_text="You have created the Agent successfully" />
        )}
        {createAgentMutation.isError && (
          <ErrorMessage user_text={createAgentMutation.error.message} />
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-4xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Label name="First Name" />
              <Input
                {...register("firstName", {
                  required: "First name is required",
                })}
                placeholder="Enter first name"
                type="text"
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <Label name="Last Name" />
              <Input
                {...register("lastName", {
                  required: "Last name is Required",
                })}
                placeholder="Enter last name"
                type="text"
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <Label name="Email" />
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@]+@[^@]+\.[^@]+$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter email"
                type="email"
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label name="Mobile No." />
              <Input
                {...register("phone", {
                  required: "Mobile number is required",
                })}
                placeholder="Enter mobile number"
                type="text"
              />
              {errors.phone && (
                <p className="text-red-600 text-sm">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <Label name="Address/Location" />
              <Input
                {...register("address", { required: "Address is required" })}
                placeholder="Enter address"
                type="text"
              />
              {errors.address && (
                <p className="text-red-600 text-sm">{errors.address.message}</p>
              )}
            </div>

            {/* Starting Place */}
            <div>
              <Label name="City " />
              <Controller
                name="cityId"
                control={control}
                rules={{ required: "city is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-gray-100 border border-gray-200 rounded-md">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>select City</SelectLabel>
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
              {errors.cityId && (
                <p className="text-red-500">{errors.cityId.message}</p>
              )}
            </div>

            <div>
              <Label name="Age" />
              <Input
                {...register("age", { required: "Age is required" })}
                placeholder="Enter Age"
                type="text"
              />
              {errors.age && (
                <p className="text-red-600 text-sm">{errors.age.message}</p>
              )}
            </div>

            <div>
              <Label name="Gender " />
              <Controller
                name="gender"
                control={control}
                rules={{ required: "gender is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-gray-100 border border-gray-200 rounded-md">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>select gender</SelectLabel>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && (
                <p className="text-red-500">{errors.gender.message}</p>
              )}
            </div>

            <div>
              <Label name="handleUrgent" />
              <Controller
                name="handlesUrgent"
                control={control}
                rules={{ required: "Handle Urgent is required" }}
                render={({ field }) => (
                  <Select
                    onValueChange={(val) => field.onChange(val === "true")} // Convert string to boolean
                    value={field.value ? "true" : "false"} // Convert boolean to string
                  >
                    <SelectTrigger className="w-full bg-gray-100 border border-gray-200 rounded-md">
                      <SelectValue placeholder="Select handleUrgent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select urgent or not</SelectLabel>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.handlesUrgent && (
                <p className="text-red-500">{errors.handlesUrgent.message}</p>
              )}
            </div>

            <div>
              <Label name="Password" />
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Enter password"
                type="password"
              />
              {errors.password && (
                <p className="text-red-600 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* 
            <div>
              <Label name="Confirm Password" />
              <Input
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  // validate: (value) =>
                  //   value === watch("password") || "Passwords do not match",
                })}
                placeholder="Confirm password"
                type="password"
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div> */}
          </div>

          <div className="mt-8 w-48">
            <Button
              className=" py-5 px-12"
              type="submit"
              disabled={createAgentMutation.isPending}
            >
              {createAgentMutation.isPending ? "Adding..." : "Register"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAgentAccount;
