import { useLiveQuery } from "dexie-react-hooks";

import { db } from "../db";

export function useEquipmentList() {
  return useLiveQuery(() => db.equipment.orderBy("name").toArray(), []);
}

export function addEquipment(name: string) {
  return db.equipment.add({ name });
}

export function updateEquipment(id: number, name: string) {
  return db.equipment.update(id, { name });
}

export function deleteEquipment(id: number) {
  return db.equipment.delete(id);
}
