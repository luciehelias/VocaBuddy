import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, userId } = body;

    if (!imageBase64 || !userId) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

    const result = await cloudinary.uploader.upload(imageBase64, {
      folder: "avatars",
      public_id: userId,
      overwrite: true,
      transformation: [{ width: 150, height: 150, crop: "fill" }],
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}
