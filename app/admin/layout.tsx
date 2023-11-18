import Navbar from "@/components/navbar";
import { getUser } from "@/app/actions/fetchData";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
