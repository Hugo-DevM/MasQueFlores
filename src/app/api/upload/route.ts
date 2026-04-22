import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData  = await request.formData();
    const file      = formData.get("file") as File | null;
    const productId = formData.get("productId") as string | null;
    const category  = formData.get("category") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes  = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // folder explícito → Cloudinary crea la jerarquía de carpetas correctamente
    const id            = productId ?? `tmp_${Date.now()}`;
    const categoryFolder = category ?? "sin_categoria";

    const result = await new Promise<Record<string, unknown>>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder:        `masqueflores/productos/${categoryFolder}/${id}`,
            public_id:     "imagen",
            overwrite:     true,   // reemplaza si ya existe
            resource_type: "image",
            transformation: [
              { width: 800, height: 800, crop: "limit" }, // máx 800×800
              { quality: "auto:good" },                   // compresión automática
              { fetch_format: "auto" },                   // webp/avif según soporte
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as Record<string, unknown>);
          },
        )
        .end(buffer);
    });

    return NextResponse.json({
      url:      result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("POST /api/upload error:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
