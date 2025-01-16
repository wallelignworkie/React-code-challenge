import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreateCities, getCities } from "@/services/cities";
import { Button } from "@/components/ui/button";
import SuccessAlertMessage from "@/components/Alert/SuccessAlertMessage";

// Form inputs interface for TypeScript
interface FormInputs {
  name: string;
}

const AdminCreateCity: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const queryClient = useQueryClient();

  // Fetch cities using `react-query`
  const {
    data: cities = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities, // Fetch cities from the API
  });

  // Mutation to handle adding cities
  const createCityMutation = useMutation({
    mutationFn: CreateCities,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      setShowPopup(false); // Close the popup
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    createCityMutation.mutate({ name: data.name });
    reset(); // Reset the form fields
  };

  return (
    <div className="flex flex-col bg-white rounded-lg p-6">
      {createCityMutation.isSuccess && (
        <SuccessAlertMessage user_text="You have created City Successfully" />
      )}
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-bold">City List</h2>
        <Button onClick={() => setShowPopup(true)}>+ Add City</Button>
      </div>

      {/* Display city list */}
      <div>
        {isLoading && <p>Loading cities...</p>}
        {isError && <p>Failed to load cities. Please try again.</p>}
        {!isLoading && !isError && cities.length === 0 && (
          <p>No cities available. Please add a new city.</p>
        )}
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden max-w-5xl">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        City Name
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    {cities.map((city) => (
                      <tr
                        key={city.id}
                        className="hover:bg-gray-100 dark:hover:bg-neutral-700"
                      >
                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                          {city.name}
                        </td>

                        <td className="px-6 py-2 whitespace-nowrap text-end text-sm font-medium">
                          <button
                            type="button"
                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add New City</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  City Name
                </label>
                <input
                  {...register("name", {
                    required: "City name is required",
                    maxLength: {
                      value: 50,
                      message: "City name cannot exceed 50 characters",
                    },
                  })}
                  type="text"
                  id="name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="bg-red-700 hover:bg-red-800 mr-2"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={createCityMutation.isPending}>
                  {createCityMutation.isPending ? "Adding..." : "Add"}
                </Button>
                {createCityMutation.isError && "Error!"}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCreateCity;
