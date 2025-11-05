import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  addEquipment,
  updateEquipment,
  useEquipmentList,
} from "@/api/equipment";
import type { Equipment } from "@/db";

import { DeleteEquipmentButton } from "./delete-equipment-button";
import { EditableName } from "./editable-name";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type Inputs = Omit<Equipment, "id">;

export function EquipmentList() {
  const equipment = useEquipmentList();

  const form = useForm<Inputs>({
    defaultValues: { name: "" },
  });
  const onSubmit = ({ name }: Inputs) =>
    addEquipment(name).then(() => form.reset());

  return (
    <div className="p-4 border rounded shadow">
      <h2>Equipment</h2>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="hidden md:block">
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
                    disabled={
                      !form.formState.isDirty || !form.formState.isValid
                    }
                    type="submit"
                  >
                    <Plus /> Add
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="md:hidden mt-4 space-y-4">
          {equipment?.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="text-lg">{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <DeleteEquipmentButton equipment={item} />
              </CardContent>
            </Card>
          ))}
        </div>
      </form>
    </div>
  );
}
