import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

interface EditCityComponentProps {
  editingCity: { id: string; name: string } | null;
  onClose: () => void; // Function to handle closing the form
  onSubmit: (data: { id: string; name: string }) => void; // Function to handle form submission
}

interface FormInputs {
  name: string;
}

const EditCityComponent: React.FC<EditCityComponentProps> = ({
  editingCity,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  if (!editingCity) return null; // Render nothing if no city is being edited

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Edit City</h2>
        <form
          onSubmit={handleSubmit((data) =>
            onSubmit({ ...data, id: editingCity.id })
          )}
        >
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
              defaultValue={editingCity.name} // Pre-fill the input
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={onClose} // Close the form
              className="bg-red-700 hover:bg-red-800 mr-2"
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCityComponent;
