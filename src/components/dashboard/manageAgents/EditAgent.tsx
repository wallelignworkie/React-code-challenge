import ErrorMessage from "@/components/Alert/ErrorMessage";
import SuccessAlertMessage from "@/components/Alert/SuccessAlertMessage";
import Label from "@/components/label/Label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UpdateAgent, getAgentById } from "@/services/agentService";
import { getCities } from "@/services/cities";
import { Agent, AgentRequest } from "@/types/agent";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

const EditAgent: React.FC = () => {
  const { id: userId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AgentRequest>();

  // Fetch Agent Data
  const {
    data: agent,
    isLoading,
    isError,
  } = useQuery<Agent>({
    queryKey: ["agent", userId],
    queryFn: () => getAgentById(userId as string),
    enabled: !!userId,
  });

  // Fetch Cities
  const {
    data: cities = [],
    isLoading: loadingCities,
    isError: errorCities,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  // Mutation to update agent
  const updateAgentMutation = useMutation({
    mutationFn: (updatedData: AgentRequest) =>
      UpdateAgent(userId as string, updatedData),
    onSuccess: () => {
      alert("Agent updated successfully!");
      navigate("/agents"); // Redirect after update
    },
    onError: (error) => {
      console.error("Error updating agent:", error);
      alert("Failed to update agent.");
    },
  });

  useEffect(() => {
    if (agent) {
      reset({
        firstName: agent?.user.firstName,
        lastName: agent?.user.lastName,
        email: agent?.user.email,
        phone: agent?.user.phone,
        cityId: agent?.cityId,
        gender: agent?.user.gender,
        address: agent.address,
        password: agent?.user.password,
      });
    }
  }, [agent, reset]);

  if (isLoading || loadingCities) return <p>Loading...</p>;
  if (isError || errorCities)
    return <p className="text-red-600">Error loading data</p>;

  const handleCancel = () => {
    navigate("/agents");
  };
  const onSubmit = (data: AgentRequest) => {
    updateAgentMutation.mutate(data);
  };

  return (
    <div className="font-[sans-serif]">
      {/* Main Form Section */}
      <div className="mx-4 mb-4 ">
        {updateAgentMutation.isSuccess && (
          <SuccessAlertMessage user_text="You have updated  the Agent successfully" />
        )}
        {updateAgentMutation.isError && (
          <ErrorMessage user_text={updateAgentMutation.error.message} />
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-4xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md"
        >
          <h4 className=" text-base font-semibold -mt-4 mb-3"> Edit Agent</h4>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Label name="First Name" />
              <Input
                defaultValue={agent?.user.firstName}
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
                defaultValue={agent?.user.lastName}
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
                defaultValue={agent?.user.email}
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
                defaultValue={agent?.user.phone}
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
                defaultValue={agent?.address}
                {...register("address", { required: "Address is required" })}
                placeholder="Enter address"
                type="text"
              />
              {errors.address && (
                <p className="text-red-600 text-sm">{errors.address.message}</p>
              )}
            </div>

            {/* City Dropdown */}
            <div>
              <Label name="City" />
              <Controller
                name="cityId"
                control={control}
                defaultValue={agent?.cityId || ""} // Ensuring default value
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <SelectTrigger className="w-full bg-gray-100 border border-gray-200 rounded-md">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Choose City</SelectLabel>
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
                <p className="text-red-600">{errors.cityId.message}</p>
              )}
            </div>

            {/* Gender Dropdown */}
            <div>
              <Label name="Gender" />
              <Controller
                name="gender"
                control={control}
                defaultValue={agent?.user.gender || ""} // Ensuring default value
                rules={{ required: "Gender is required" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <SelectTrigger className="w-full bg-gray-100 border border-gray-200 rounded-md">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Choose Gender</SelectLabel>
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
              <Label name="Handle Urgent " />
              <Controller
                name="handlesUrgent"
                control={control}
                defaultValue={agent?.handles_urgent}
                rules={{
                  validate: (value) =>
                    value !== undefined || "Handle Urgent is required",
                }}
                render={({ field }) => (
                  <Select
                    onValueChange={(val) =>
                      field.onChange(val === "true" ? true : false)
                    }
                    value={String(field.value)} // ✅ Ensure correct value format
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
                defaultValue={agent?.user.password}
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
          </div>

          <div className=" flex justify-between mt-4 ">
            <Button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-500"
            >
              Cancel
            </Button>
            <Button
              className=" py-3 px-8"
              type="submit"
              disabled={updateAgentMutation.isPending}
            >
              {updateAgentMutation.isPending ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAgent;
