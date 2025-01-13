import Button from "../button/Button";
import Label from "../label/Label";
import TextField from "../textField/TextField";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
const AddPackage = () => {
  return (
    <div className="font-[sans-serif]">
      {/* Header section with background image */}
      {/* <div
        className="text-center min-h-[160px] sm:p-6 p-4"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "fit",
          backgroundPosition: "center",
          maxHeight: "20px",
        }}
      ></div> */}

      {/*  -mt-12 */}
      <div className="mx-4 mb-4">
        <form className="max-w-4xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md">
          <h4 className="sm:text-base text-md  text-black font-sans font-semibold -mt-4 mb-4">
            Fill Package Form
          </h4>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Label name="Package name" />
              <TextField placeholder=" Package name" name=" name" type="text" />
            </div>
            <div>
              <Label name=" Sender Name" />
              <TextField
                placeholder=" Sender name"
                name=" sender_name"
                type="text"
              />
            </div>
            <div>
              <Label name="Sender mobile" />
              <TextField
                placeholder=" Sender mobile"
                name=" sender_mobile"
                type="number"
              />
            </div>

            <div>
              <Label name="Sender address" />
              <TextField
                placeholder=" Sender address"
                name=" sender_address"
                type="text"
              />
            </div>
            <div>
              <Label name="Receiver name" />
              <TextField
                placeholder="Receiver name"
                name="receiver_name"
                type="text"
              />
            </div>
            <div>
              <Label name="Receiver Mobile" />
              <TextField
                placeholder=" Receiver mobile"
                name=" receiver_mobile"
                type="number"
              />
            </div>

            <div>
              <Label name="Receiver address" />
              <TextField
                placeholder=" Receiver address"
                name=" receiver_address"
                type="text"
              />
            </div>
            <div>
              <Label name="Package weight/KG" />
              <TextField
                placeholder=" Enter package weight in kg"
                name=" package_weight"
                type="number"
              />
            </div>
            <div>
              <Label name="Description" />
              <Textarea placeholder="Type package description here." />
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-[320px] h-[40px] mt-8 bg-gray-100 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select a priority" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  <SelectGroup>
                    <SelectLabel className="text-gray-500">
                      Priority
                    </SelectLabel>
                    <SelectItem
                      value="urgent"
                      className="hover:bg-red-100 focus:bg-red-100"
                    >
                      Urgent
                    </SelectItem>
                    <SelectItem
                      value="normal"
                      className="hover:bg-green-100 focus:bg-green-100"
                    >
                      Normal
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-8 w-48">
            <Button buttonText="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPackage;
