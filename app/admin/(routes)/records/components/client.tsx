"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, RecordsColumn } from "./columns";

interface RecordsClientProps {
  data: RecordsColumn[];
}

export const RecordsClient: React.FC<RecordsClientProps> = async ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Prestamos (${data.length})`}
          description="Maneja los prestamos"
        />

        <Button onClick={() => router.push(`/admin/records/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Prestar o devolver
        </Button>
      </div>
      <DataTable
        searchKey="rut"
        searchPlaceHolder="Buscar prestamo por rut"
        columns={columns}
        data={data}
      />
    </>
  );
};
