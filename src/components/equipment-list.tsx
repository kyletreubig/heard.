import { useEquipmentList } from "@/api/equipment";

import { EquipmentCardList } from "./equipment-card-list";
import { EquipmentTable } from "./equipment-table";

export function EquipmentList() {
  const equipment = useEquipmentList();

  return (
    <div className="p-4 border rounded shadow">
      <h2>Equipment</h2>

      <div className="hidden md:block">
        <EquipmentTable equipment={equipment} />
      </div>

      <div className="md:hidden mt-4">
        <EquipmentCardList equipment={equipment} />
      </div>
    </div>
  );
}
