import type { Metadata } from "next";
import { CatalogClient } from "@/components/CatalogClient";

export const metadata: Metadata = {
  title: "Catálogo · DD Imperium Trade",
  description:
    "Catálogo de muestra de las tres categorías que distribuimos. Acceso al catálogo completo para vendedores verificados.",
};

export default function CatalogoPage() {
  return <CatalogClient />;
}
