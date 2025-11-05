import { EquipmentList } from "./components/equipment-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

function App() {
  return (
    <Tabs
      className="container mx-auto flex h-screen flex-col gap-4"
      defaultValue="meals"
    >
      <div className="flex justify-between items-end">
        <h1 className="mt-2 flex items-center gap-2">heard.</h1>
        <TabsList>
          <TabsTrigger value="meals">Meals</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="meals">Meals</TabsContent>

      <TabsContent value="equipment">
        <EquipmentList />
      </TabsContent>
    </Tabs>
  );
}

export default App;
