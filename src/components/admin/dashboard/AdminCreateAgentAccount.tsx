import Button from "@/components/button/Button";

const AdminCreateAgentAccount = () => {
  return (
    <div className="font-[sans-serif] bg-white max-w-3xl items-center mx-auto md:h-screen rounded-lg">
      <div className="items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
        <form className="md:col-span-2 w-full py-6 px-6 sm:px-16">
          <div className="mb-6">
            <h3 className="text-gray-800 text-2xl font-bold">
              Create an Agent account
            </h3>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-5">
              <div className="flex-1">
                <label className="text-gray-800 text-sm mb-2 block">
                  First Name
                </label>
                <div className="relative flex items-center">
                  <input
                    name="firstName"
                    type="text"
                    required
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter first name"
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className="text-gray-800 text-sm mb-2 block">
                  Last Name
                </label>
                <div className="relative flex items-center">
                  <input
                    name="lastName"
                    type="text"
                    required
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter last last"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-5">
              <div className="flex-1">
                <label className="text-gray-800 text-sm mb-2 block">
                  Phone
                </label>
                <div className="relative flex items-center">
                  <input
                    name="PhoneNumber"
                    type="number"
                    required
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className="text-gray-800 text-sm mb-2 block">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter email"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-5">
              <div className="flex-1">
                <label className="text-gray-800 text-sm mb-2 block">City</label>
                <div className="relative flex items-center">
                  <input
                    name="city"
                    type="text"
                    required
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter city address"
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className="text-gray-800 text-sm mb-2 block">
                  Sub city
                </label>
                <div className="relative flex items-center">
                  <input
                    name="sub_city"
                    type="text"
                    required
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter sub city address"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-5">
              <div className="flex-1">
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className="text-gray-800 text-sm mb-2 block">
                  Confirm password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="confirm-password"
                    type="password"
                    required
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    placeholder="confirm password"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="!mt-12">
            <Button buttonText="Create an account" />
          </div>
          <p className="text-gray-800 text-sm mt-6 text-center">
            Already have an account?{" "}
            <a
              href="javascript:void(0);"
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateAgentAccount;
