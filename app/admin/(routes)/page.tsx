"use client";
import {
  fetchLaboratoriesData,
  fetchPcsData,
  getUser,
} from "@/app/actions/fetchData";
import Loading from "@/app/loading";
import { Overview } from "@/components/overview";
import { mapLaboratoriesData, mapPcsData } from "@/lib/utils";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [laboratoriesData, setLaboratoriesData] = useState<any>([]);
  const [pcsData, setPcsData] = useState<any>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiLaboratoriesData = await fetchLaboratoriesData();
        const apiPcsData = await fetchPcsData();

        const mappedLaboratoriesData = mapLaboratoriesData(apiLaboratoriesData);
        const mappedPcsData = mapPcsData(apiPcsData);

        setLaboratoriesData(mappedLaboratoriesData);
        setPcsData(mappedPcsData);

        const loggedInUser = await getUser();
        setUser(loggedInUser);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col mx-auto w-full items-center justify-between gap-3 py-5">
      <h2>Bienvenido {user.name}</h2>
      <div className="flex md:flex-row flex-col p-10 w-full gap-5">
        <Overview data={pcsData} title="Notebooks" />
        <Overview data={laboratoriesData} title="Laboratorios" />
      </div>
    </div>
  );
};

export default DashboardPage;
