import type { Metadata } from "next";
import LInstitut from "@/components/LInstitut";

export const metadata: Metadata = { title: "L’Institut" };

export default function InstitutPage() {
  return <LInstitut />;
}
