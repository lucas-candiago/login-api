"use client"

import { useRouter } from "next/navigation";
import { VerifyToken } from "@/app/services/verifyToken";

export default function Home() {
  const router = useRouter()

  if (VerifyToken()) router.push("/menu")

  return (
    <>
    </>
  );
}
