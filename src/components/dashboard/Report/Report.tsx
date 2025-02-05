import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Report = () => {
  return (
    <div className="  flex-auto sm:flex sm:justify-between bg-white p-12 rounded-lg shadow-md ">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-xl gap-x-10 gap-y-10 ">
        <div>
          <Label> Role </Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Role</SelectLabel>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="Agent">Agent</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label> Select Type </Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Type</SelectLabel>
                <SelectItem value="Customer">Customer</SelectItem>
                <SelectItem value="Package">Package</SelectItem>
                <SelectItem value="Price">Price</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label> Select Month </Label>
          <Select>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select a month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Month</SelectLabel>
                <SelectItem value="jun">JUN</SelectItem>
                <SelectItem value="feb">Feb</SelectItem>
                <SelectItem value="march">march</SelectItem>
                <SelectItem value="april">April</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label> Year </Label>
          <Select>
            <SelectTrigger className="w-[230px]">
              <SelectValue placeholder="Select a year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Year</SelectLabel>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className=" mt-12">
        <Button>Generate Report</Button>
      </div>
    </div>
  );
};

export default Report;
