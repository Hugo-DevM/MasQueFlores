import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<Record<string, unknown>>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "masqueflores_flowers",
              resource_type: "image",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result as Record<string, unknown>);
            },
          )
          .end(buffer);
      },
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 },
    );
  }
}
