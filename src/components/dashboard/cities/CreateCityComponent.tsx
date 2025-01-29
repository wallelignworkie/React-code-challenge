import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  CreateCities,
  DeleteCity,
  getCities,
  UpdateCity,
} from "@/services/cities";
import { Button } from "@/components/ui/button";
import SuccessAlertMessage from "@/components/Alert/SuccessAlertMessage";
import EditCityComponent from "./EditCityComponent";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";

interface FormInputs {
  name: string;
}

const CreateCityComponent: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [editingCity, setEditingCity] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [deleteCityId, setDeleteCityId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>(""); // Search input state
  const [currentPage, setCurrentPage] = useState<number>(1); // Pagination state
  const itemsPerPage = 5; // Number of cities per page
  const queryClient = useQueryClient();

  // Fetch all cities using React Query
  const {
    data: cities = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  // Filter cities based on search query
  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredCities.length / itemsPerPage);
  const paginatedCities = filteredCities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Mutation to handle adding cities
  const createCityMutation = useMutation({
    mutationFn: CreateCities,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      setShowPopup(false);
    },
  });

  // Mutation to handle updating cities
  const updateCityMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      UpdateCity(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      setEditingCity(null);
    },
  });

  // Mutation to handle deleting cities
  const deleteCityMutation = useMutation({
    mutationFn: DeleteCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      setDeleteCityId(null);
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
    reset();
  };

  return (
    <div className="flex flex-col bg-white rounded-lg p-6">
      {createCityMutation.isSuccess && (
        <SuccessAlertMessage user_text="You have created City Successfully" />
      )}
      {updateCityMutation.isSuccess && (
        <SuccessAlertMessage user_text="You have Updated City Successfully" />
      )}
      {deleteCityMutation.isSuccess && (
        <SuccessAlertMessage user_text="You have Deleted City Successfully" />
      )}

      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-bold">City List</h2>
        <Button onClick={() => setShowPopup(true)}>+ Add City</Button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name"
          className="p-2 border rounded-lg w-[250px] "
        />
      </div>

      {/* Display city list */}
      <div>
        {isLoading && <p>Loading cities...</p>}
        {isError && <p>Failed to load cities. Please try again.</p>}
        {!isLoading && !isError && paginatedCities.length === 0 && (
          <p>No cities found.</p>
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
                        className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase"
                      >
                        City Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    {paginatedCities.map((city) => (
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
                            onClick={() => setEditingCity(city)}
                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon icon-tabler icons-tabler-outline icon-tabler-pencil-heart"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M17 11l1.5 -1.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4h4l2 -2" />
                              <path d="M13.5 6.5l4 4" />
                              <path d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteCityId(city.id)}
                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 ml-4"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon icon-tabler icons-tabler-outline icon-tabler-trash-x"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M4 7h16" />
                              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                              <path d="M10 12l4 4m0 -4l-4 4" />
                            </svg>
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

      {/* Pagination Controls */}
      <div className="flex space-x-2 items-center  justify-end mt-10">
        <Button
          className=" bg-white py-1 px-2 text-black border-2 border-black"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <p className=" text-sm font-sans">
          Page {currentPage} of {totalPages}
        </p>
        <Button
          className=" bg-white py-1 px-3 text-black border-2 border-black"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      {/* Popup Form for Adding New City */}
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
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      <DeleteConfirmationPopup
        isOpen={deleteCityId !== null}
        onConfirm={() =>
          deleteCityId && deleteCityMutation.mutate(deleteCityId)
        }
        onCancel={() => setDeleteCityId(null)}
        message="Are you sure you want to delete this city? "
      />

      {/* Reusable EditCityComponent */}
      <EditCityComponent
        editingCity={editingCity}
        onClose={() => setEditingCity(null)}
        onSubmit={({ id, name }) => updateCityMutation.mutate({ id, name })}
      />
    </div>
  );
};

export default CreateCityComponent;
