export type Category = "robes" | "jupes" | "chaussures" | "sacs" | "accessoires" | "perruques";

export interface ProductColor { name: string; hex: string }

export interface Product {
  id: string;
  slug: string;
  name: string;
  description?: string;
  price: number; // FCFA (XOF)
  category: Category;
  images: string[]; // [0] principale, [1] survol
  colors: ProductColor[];
  sizes: string[];
  isNew?: boolean;
}

export const CATEGORIES: { slug: Category; label: string }[] = [
  { slug: "robes", label: "Robes" },
  { slug: "jupes", label: "Jupes" },
  { slug: "chaussures", label: "Chaussures" },
  { slug: "sacs", label: "Sacs" },
  { slug: "accessoires", label: "Accessoires" },
  { slug: "perruques", label: "Perruques" },
];
