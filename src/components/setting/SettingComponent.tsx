import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const SettingComponent = () => {
  return (
    <div className=" border border-gray-200 p-12 bg-white max-w-xl rounded-lg">
      <div className=" py-2">
        <Label> Current Password</Label>
        <Input
          className=" py-2"
          type=" password"
          placeholder=" Enter your current password"
        />
      </div>
      <div className=" py-2">
        <Label> New Password</Label>
        <Input
          className=""
          type=" password"
          placeholder=" Enter your new password"
        />
      </div>
      <div className=" px-2 py-2">
        <Label> Confirm Password</Label>
        <Input
          className=""
          type=" password"
          placeholder=" Enter Confirm password"
        />
      </div>
      <div className=" pt-5 flex justify-end mt-5">
        <Button className=" bg-EPrimary"> Save Change</Button>
      </div>
    </div>
  );
};

export default SettingComponent;
