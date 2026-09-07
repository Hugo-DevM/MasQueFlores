export type Category = "siempre_disponible" | "sobre_pedido" | "san_valentin";

export const CATEGORY_LABELS: Record<Category, string> = {
  siempre_disponible: "Siempre Disponibles",
  // temporada: "Por Temporada",
  san_valentin: "Especial 14 de Febrero",
  sobre_pedido: "Sobre Pedido",
  
};

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  siempre_disponible: "Flores que encuentras todo el año",
  // temporada: "Disponibles según la temporada",
  sobre_pedido: "Arreglos especiales con previo aviso",
  san_valentin: "Arreglos y Ramos para el 14 de Febrero",
};

export const CATEGORY_ICONS: Record<Category, string> = {
  siempre_disponible: "🌹",
  // temporada: "🌸",
  sobre_pedido: "✨",
  san_valentin: "💖",
};

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imagePublicId?: string;
  category: Category;
  visible: boolean;
  featured?: boolean;
  badge?: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
