import { useState } from "react";
import Logo from "../../assets/images/engida-express-logo2.jpg";
import Header from "../layout/Header";
import { useNavigate } from "react-router-dom";

const HomepageComponent = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate(); // Use useNavigate in React Router v6

  // The stored tracking number for demonstration purposes.
  const storedTrackingNumber = "123456";

  const handleTrackClick = () => {
    if (trackingNumber === storedTrackingNumber) {
      setStatus("Your package is on the way!");
      setError("");
      // Navigate to the search result page with tracking number
      navigate(`/search-result/${trackingNumber}`);
    } else {
      setStatus("");
      setError("Incorrect tracking number. Please try again.");
    }
  };
  return (
    <div>
      <Header />
      {/* Hero Section */}
      <header className="bg-gray-300 mt-16">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between py-10 px-4">
          {/* Hero Content */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-3xl font-bold">Track Your Shipment</h1>
            <p className="text-lg text-gray-700">
              Enter your tracking number(s)
            </p>
            {/* Tracking Input */}
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
              <input
                type="text"
                placeholder="Enter your tracking number(s)"
                className="w-full sm:w-80 md:w-96 h-12 p-3 border border-gray-300 rounded-md"
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
              <button
                className="w-full sm:w-auto px-6 py-3 bg-EPrimary text-white rounded hover:bg-gray-800"
                onClick={handleTrackClick}
              >
                Track
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {status && <p className="text-green-500">{status}</p>}
          </div>
          {/* Hero Image */}
          <img
            src={Logo}
            alt="Delivery Worker"
            className="h-64 mt-6 md:mt-0 md:h-80"
          />
        </div>
      </header>

      {/* Feature Section */}
      <section className="bg-white">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow">
            <span className="text-red-600 text-3xl">📦</span>
            <h2 className="text-xl font-bold mt-4">Ship Now</h2>
            <p className="text-gray-600 mt-2">
              Find the right service for your shipping needs.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow">
            <span className="text-red-600 text-3xl">📄</span>
            <h2 className="text-xl font-bold mt-4">Get a Quote</h2>
            <p className="text-gray-600 mt-2">
              Estimate cost to share and compare.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow">
            <span className="text-red-600 text-3xl">🏢</span>
            <h2 className="text-xl font-bold mt-4">
              Request a Business Account
            </h2>
            <p className="text-gray-600 mt-2">
              Shipping regularly? Learn about volume discounts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomepageComponent;
