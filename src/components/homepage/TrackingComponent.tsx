import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../layout/Header";

type TrackingOrder = {
  storedTrackingNumber: string;
  name: string;
  priority: string;
  receiverName: string;
  senderName: string;
};

const TrackingComponent = () => {
  const { trackingNumber } = useParams();
  const [status, setStatus] = useState<string>("");
  const [details, setDetails] = useState<TrackingOrder | null>(null);

  useEffect(() => {
    // Example tracking orders
    const trackingOrders: TrackingOrder[] = [
      {
        storedTrackingNumber: "123456",
        name: "Smart TV",
        priority: "Urgent",
        receiverName: "Walelign Workie",
        senderName: "Nahoma Getachew",
      },
      {
        storedTrackingNumber: "789012",
        name: "Laptop",
        priority: "Normal",
        receiverName: "Alemu Berhanu",
        senderName: "Betty Smith",
      },
    ];

    // Find the tracking order matching the given tracking number
    const matchedOrder = trackingOrders.find(
      (order) => order.storedTrackingNumber === trackingNumber
    );

    if (matchedOrder) {
      setStatus("Your package is on the way!");
      setDetails(matchedOrder);
    } else {
      setStatus("Tracking number not found.");
      setDetails(null);
    }
  }, [trackingNumber]);

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <div className="bg-white shadow-md rounded-lg p-8 w-full sm:w-96">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Tracking Result
          </h1>

          {status === "Your package is on the way!" && details ? (
            <>
              <div className="mt-6 border-t border-gray-200 pt-4">
                <p className="text-lg font-medium text-gray-600">
                  Tracking Number:
                </p>
                <p className="text-xl text-gray-800 font-semibold mt-2">
                  {details.storedTrackingNumber}
                </p>
              </div>
              <div className="mt-4 border-t border-gray-200 pt-4">
                <p className="text-lg font-medium text-gray-600">Item Name:</p>
                <p className="text-xl text-gray-800 font-semibold mt-2">
                  {details.name}
                </p>
              </div>
              <div className="mt-4 border-t border-gray-200 pt-4">
                <p className="text-lg font-medium text-gray-600">
                  Priority Level:
                </p>
                <p className="text-xl text-gray-800 font-semibold mt-2">
                  {details.priority}
                </p>
              </div>
              <div className="mt-4 border-t border-gray-200 pt-4">
                <p className="text-lg font-medium text-gray-600">
                  Receiver Name:
                </p>
                <p className="text-xl text-gray-800 font-semibold mt-2">
                  {details.receiverName}
                </p>
              </div>
              <div className="mt-4 border-t border-gray-200 pt-4">
                <p className="text-lg font-medium text-gray-600">
                  Sender Name:
                </p>
                <p className="text-xl text-gray-800 font-semibold mt-2">
                  {details.senderName}
                </p>
              </div>
            </>
          ) : (
            <div className="mt-6 border-t border-gray-200 pt-4">
              <p className="text-xl text-red-600 font-semibold">{status}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TrackingComponent;
