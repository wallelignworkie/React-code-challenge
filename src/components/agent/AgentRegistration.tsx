import Button from "../button/Button";
import Label from "../label/Label";
import TextField from "../textField/TextField";

const AgentRegistration = () => {
  return (
    <div className="font-[sans-serif]">
      <div className="text-center bg-gradient-to-r from-EPrimary to-gray-400 min-h-[160px] sm:p-6 p-4">
        <h4 className="sm:text-3xl text-2xl font-bold text-white">
          Create your Agent account
        </h4>
      </div>

      <div className="mx-4 mb-4 -mt-16">
        <form className="max-w-4xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Label name="First name" />
              <TextField placeholder=" enter name" name=" name" type="text" />
            </div>
            <div>
              <Label name="Last name" />
              <TextField
                placeholder=" enter last name"
                name=" lname"
                type="text"
              />
            </div>
            <div>
              <Label name="Email" />
              <TextField
                placeholder=" Enter email"
                name=" email"
                type="email"
              />
            </div>
            <div>
              <Label name=" Mobile No." />
              <TextField
                placeholder=" Enter mobile number"
                name=" number"
                type="number"
              />
            </div>
            <div>
              <Label name="Address/Location" />
              <TextField
                placeholder=" Enter address"
                name=" address"
                type="text"
              />
            </div>
            <div>
              <Label name="city" />
              <TextField placeholder=" Enter city" name=" city" type="text" />
            </div>
            <div>
              <Label name="Password" />
              <TextField
                placeholder=" Enter password"
                name=" password"
                type="password"
              />
            </div>
            <div>
              <Label name="Confirm Password" />
              <TextField
                placeholder=" Enter confirm password"
                name=" confirm_password"
                type="password"
              />
            </div>
          </div>
          <div className="mt-8 w-48">
            <Button buttonText="Request" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentRegistration;
