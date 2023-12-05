import prismadb from "@/lib/prismadb";

import { RecordsForm } from "./components/records-form";

export const revalidate = 1;

const RecordsPage = async ({ params }: { params: { record_id: string } }) => {
  const record = await prismadb.record.findUnique({
    where: {
      id: params.record_id,
    },
    include: {
      user: true,
      pc: true,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <RecordsForm initialData={record} />
      </div>
    </div>
  );
};

export default RecordsPage;
