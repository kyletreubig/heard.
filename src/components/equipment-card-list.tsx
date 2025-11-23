import { Plus } from "lucide-react";

import { updateEquipment } from "@/api/equipment";
import type { Equipment } from "@/db";
import { useNewEquipmentForm } from "@/hooks/use-equipment-form";

import { DeleteEquipmentButton } from "./delete-equipment-button";
import { EditableName } from "./editable-name";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

export function EquipmentCardList({ equipment }: { equipment?: Equipment[] }) {
  const { form, onSubmit } = useNewEquipmentForm();
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {equipment?.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="text-lg">
                <EditableName
                  name={item.name}
                  onChange={(newName) => updateEquipment(item.id, newName)}
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DeleteEquipmentButton equipment={item} />
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardHeader>
            <CardTitle>
              <Input
                placeholder="New equipment"
                {...form.register("name", { required: true })}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              disabled={!form.formState.isDirty || !form.formState.isValid}
              type="submit"
            >
              <Plus /> Add
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
