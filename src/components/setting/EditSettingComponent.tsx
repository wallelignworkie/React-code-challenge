import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/services/settingSrvice";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { ValidateFormInputs } from "@/types/profile";
import SuccessAlertMessage from "../Alert/SuccessAlertMessage";
import ErrorMessage from "../Alert/ErrorMessage";

const EditSettingComponent = () => {
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<ValidateFormInputs>({
    defaultValues: { handlesUrgent: false },
  });

  const password = watch("password"); // Get live password value for confirmation check

  const onSubmit: SubmitHandler<ValidateFormInputs> = (formData) => {
    const { confirmPassword, ...dataToSend } = formData; // Exclude confirmPassword
    updateProfileMutation.mutate(dataToSend);
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent
        aria-description="edit-profile"
        className="sm:max-w-[650px]"
      >
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          {updateProfileMutation.error && (
            <DialogDescription>
              <ErrorMessage user_text={updateProfileMutation.error.message} />
            </DialogDescription>
          )}

          {updateProfileMutation.isSuccess && (
            <DialogDescription>
              <SuccessAlertMessage
                user_text={"you have been update successfully"}
              />
            </DialogDescription>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              First Name
            </Label>
            <Input
              id="firstName"
              {...register("firstName", { required: "First name is required" })}
              className="col-span-3"
            />
            {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Last Name
            </Label>
            <Input
              id="lastName"
              {...register("lastName", { required: "Last name is required" })}
              className="col-span-3"
            />
            {errors.lastName && (
              <span className="text-red-500">{errors.lastName.message}</span>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="col-span-3"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirmPassword" className="text-right">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="col-span-3"
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Controlled Select Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Handle Urgent</Label>
            <Controller
              name="handlesUrgent"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={String(field.value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Handle urgent</SelectLabel>
                      <SelectItem value="true">True</SelectItem>
                      <SelectItem value="false">False</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={updateProfileMutation.isPending}>
              {updateProfileMutation.isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSettingComponent;
