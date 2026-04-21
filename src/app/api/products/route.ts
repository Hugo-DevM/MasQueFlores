import { NextRequest, NextResponse } from "next/server";
import { getProductsFromGitHub, saveProductsToGitHub } from "@/lib/github";
import { Product } from "@/types";

export async function GET() {
  try {
    const { products } = await getProductsFromGitHub();
    return NextResponse.json({ products });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newProduct: Product = await request.json();
    const { products, sha } = await getProductsFromGitHub();
    const updated = [...products, newProduct];
    await saveProductsToGitHub(updated, sha);
    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedProduct: Product = await request.json();
    const { products, sha } = await getProductsFromGitHub();
    const updated = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p,
    );
    await saveProductsToGitHub(updated, sha);
    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("PUT /api/products error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...fields } = body as { id: string } & Partial<Product>;
    const { products, sha } = await getProductsFromGitHub();
    const updated = products.map((p) =>
      p.id === id ? { ...p, ...fields } : p,
    );
    await saveProductsToGitHub(updated, sha);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH /api/products error:", error);
    return NextResponse.json({ error: "Failed to patch product" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const { products, sha } = await getProductsFromGitHub();
    const updated = products.filter((p) => p.id !== id);
    await saveProductsToGitHub(updated, sha);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/products error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
