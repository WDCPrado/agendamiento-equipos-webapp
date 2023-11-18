"use client";
import Navbar from "@/components/navbar";
import { getUser } from "@/app/actions/fetchData";
import Loading from "./laboratories/loading";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await axios.get("/api/auth/validateCookie");
        if (!user || user === undefined || user === null) {
          router.push("/");
        }
      } catch (error) {
        toast.error("No autorizado.");
        router.push("/");
      }
    };
    fetchData();
  }, []);

  return <>{children}</>;
}
