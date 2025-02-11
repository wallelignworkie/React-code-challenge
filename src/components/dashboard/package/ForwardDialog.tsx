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
import { getAgentsByCity } from "@/services/agentService";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/Alert/ErrorMessage";
import SuccessAlertMessage from "@/components/Alert/SuccessAlertMessage";
import { Agent } from "@/types/agent";
import { getCities } from "@/services/cities";

type ForwardDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  trackingNumber: string;
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
    data: cities = [],
    isLoading: isCitiesLoading,
    isError: isCitiesError,
  } = useQuery({ queryKey: ["cities"], queryFn: getCities });

  const [selectedCityId, setSelectedCityId] = React.useState<
    string | undefined
  >(undefined);
  const [search, setSearch] = React.useState<string>("");

  // Filter cities based on the search query
  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(search.toLowerCase())
  );
  const currentDate = new Date().toISOString().slice(0, 16);
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
    isLoading: isAgentsLoading,
    isError: isAgentsError,
  } = useQuery<Agent[]>({
    queryKey: ["agents", selectedCityId],
    queryFn: async () => {
      if (!selectedCityId) return Promise.resolve([]);
      return getAgentsByCity(selectedCityId);
    },
    enabled: !!selectedCityId,
  });

  const forwardMutation = useMutation({
    mutationFn: (data: ForwardFormData) =>
      CreateForwardPackage({ trackingNumber, ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forwardPackages"] });
      setTimeout(() => {
        onClose();
      }, 1000);
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Forward Package</DialogTitle>
          <DialogDescription>
            {forwardMutation.isPending && " Loading..."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {forwardMutation.isError && (
            <ErrorMessage user_text={forwardMutation.error?.message} />
          )}
          {forwardMutation.isSuccess && (
            <SuccessAlertMessage
              user_text={"You have Forwarded Successfully"}
            />
          )}
          <div>
            <Label> Select City you want Forwarding...</Label>
            <Select
              onValueChange={(value) => setSelectedCityId(value)}
              value={selectedCityId}
            >
              <SelectTrigger className="w-full bg-gray-100 border border-gray-200 rounded-md">
                <SelectValue placeholder="Select a City" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto scrollbar">
                <div className="p-2">
                  <Input
                    placeholder="Search cities"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>

                <SelectGroup>
                  <SelectLabel>Select a City</SelectLabel>
                  {filteredCities.length > 0 ? (
                    filteredCities.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2">No cities found</div>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>

            <div>{isCitiesLoading && <div>Loading...</div>}</div>
            <div>{isCitiesError && <div>Error Loading Cities...</div>}</div>
          </div>

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
                      <SelectLabel>Select Receive agent</SelectLabel>
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
            <div>{isAgentsLoading && <div>Loading...</div>}</div>
            <div>{isAgentsError && <div>Error Loading Agent...</div>}</div>
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
                  min={currentDate} // Disable past dates
                />
              )}
            />
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
