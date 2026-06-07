import type { Metadata } from "next";
import { AboutClient } from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "Sobre Nosotros · DD Imperium Trade",
  description:
    "Distribuidora familiar con operación propia en Miami. Las personas, la empresa y los datos que respaldan a D&D Imperium Trade.",
};

export default function SobreNosotrosPage() {
  return <AboutClient />;
}
