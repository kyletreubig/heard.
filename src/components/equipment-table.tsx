import { Plus } from "lucide-react";

import { updateEquipment } from "@/api/equipment";
import type { Equipment } from "@/db";
import { useNewEquipmentForm } from "@/hooks/use-equipment-form";

import { DeleteEquipmentButton } from "./delete-equipment-button";
import { EditableName } from "./editable-name";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function EquipmentTable({ equipment }: { equipment?: Equipment[] }) {
  const { form, onSubmit } = useNewEquipmentForm();
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Table className="table-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="w-32" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipment?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <EditableName
                  name={item.name}
                  onChange={(newName) => updateEquipment(item.id, newName)}
                />
              </TableCell>
              <TableCell>
                <DeleteEquipmentButton equipment={item} />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <Input
                placeholder="New equipment"
                {...form.register("name", { required: true })}
              />
            </TableCell>
            <TableCell>
              <Button
                className="w-full"
                disabled={!form.formState.isDirty || !form.formState.isValid}
                type="submit"
              >
                <Plus /> Add
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </form>
  );
}
