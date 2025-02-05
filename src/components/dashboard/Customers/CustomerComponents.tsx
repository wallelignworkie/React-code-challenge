import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SenderCustomerComponent from "./SenderCustomerComponent";
import ReceiverCustomerComponent from "./ReceiverCustomerComponent";

export default function CustomerComponents() {
  return (
    <Tabs defaultValue="sender">
      <TabsList className=" flex justify-start px-6 w-[400px]">
        <TabsTrigger className=" max-w-24 pr-4" value="sender">
          Sender
        </TabsTrigger>
        <TabsTrigger className="max-w-24" value="receiver">
          Receiver
        </TabsTrigger>
      </TabsList>
      <TabsContent value="sender">
        <SenderCustomerComponent />
      </TabsContent>
      <TabsContent value="receiver">
        <ReceiverCustomerComponent />
      </TabsContent>
    </Tabs>
  );
}
