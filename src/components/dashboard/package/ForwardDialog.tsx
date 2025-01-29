"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateForwardPackage } from "@/services/forwardPackage";
import { Agent } from "@/types";
import { getAgents } from "@/services/agentService";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/Alert/ErrorMessage";
import SuccessAlertMessage from "@/components/Alert/SuccessAlertMessage";

type ForwardDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  trackingNumber: string; // Pass the package tracking number
};

type ForwardFormData = {
  destinationAgentId: string;
  shipmentInformation: string;
  arrivalTime: string;
};

const ForwardDialog: React.FC<ForwardDialogProps> = ({
  isOpen,
  onClose,
  trackingNumber,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ForwardFormData>({
    defaultValues: {
      destinationAgentId: "",
      shipmentInformation: "",
      arrivalTime: "",
    },
  });

  const queryClient = useQueryClient();

  const {
    data: agents = [],
    isLoading,
    isError,
  } = useQuery<Agent[]>({
    queryKey: ["agents"],
    queryFn: getAgents,
  });
  console.log({ trackingNumber });

  const forwardMutation = useMutation({
    mutationFn: (data: ForwardFormData) =>
      CreateForwardPackage({ trackingNumber, ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forwardPackages"] });
      return "Package forwarded successfully!";
    },
    onError: () => {
      return "Error forwarding package";
    },
  });
  const onSubmit = (data: ForwardFormData) => {
    const payload = { trackingNumber, ...data };
    forwardMutation.mutate(payload);
    reset();
    console.log("payload:", payload);
    console.log("Submitted Data:", { trackingNumber, ...data });
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data.</div>;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Forward Package</DialogTitle>
          <DialogDescription>
            {forwardMutation.isPending && " Loading..."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {forwardMutation.isError && (
            <ErrorMessage user_text={forwardMutation.error?.message} />
          )}
          {forwardMutation.isSuccess && (
            <SuccessAlertMessage
              user_text={"You have Forwarding Successfully"}
            />
          )}
          <div>
            <Label>Receive agent</Label>
            <Controller
              name="destinationAgentId"
              control={control}
              rules={{ required: "Receive agent is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full bg-gray-100 border border-gray-200 rounded-md">
                    <SelectValue placeholder="Select Receive agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>select Receive agent</SelectLabel>
                      {agents.map((agent) => (
                        <SelectItem key={agent.id} value={agent.userId}>
                          {agent.user.firstName}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.destinationAgentId && (
              <p className="text-red-500">
                {errors.destinationAgentId?.message}
              </p>
            )}
          </div>

          <div>
            <Controller
              name="shipmentInformation"
              control={control}
              rules={{ required: "Shipment Information is required" }}
              render={({ field }) => (
                <Input
                  placeholder="Shipment Information"
                  {...field}
                  className={errors.shipmentInformation ? "border-red-500" : ""}
                />
              )}
            />
            {errors.shipmentInformation && (
              <p className="text-red-500 text-sm">
                {errors.shipmentInformation.message}
              </p>
            )}
          </div>

          <div>
            <Controller
              name="arrivalTime"
              control={control}
              rules={{ required: "Arrival Time is required" }}
              render={({ field }) => (
                <Input
                  type="datetime-local"
                  {...field}
                  className={errors.arrivalTime ? "border-red-500" : ""}
                />
              )}
            />
            {errors.arrivalTime && (
              <p className="text-red-500 text-sm">
                {errors.arrivalTime.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={forwardMutation.isPending}>
              {forwardMutation.isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ForwardDialog;
