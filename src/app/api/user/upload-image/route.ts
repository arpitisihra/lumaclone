// src/app/api/user/upload-image/route.ts
import { NextResponse } from "next/server";
import { POST as GenerateTokenPost } from "../../auth/generate-token/route"; // Corrected import path and name
import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary

// Configure Cloudinary (ensure these are set in your Vercel Environment Variables)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    // This route handles image uploads.
    // In Next.js App Router, file uploads are typically handled by parsing FormData.
    const formData = await req.formData();
    const file = formData.get('file') as File; // Assuming the file is sent under the 'file' key

    if (!file) {
      return NextResponse.json({ message: "No file uploaded." }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'luma-clone-images' }, (error, result) => {
        if (error) reject(error);
        resolve(result);
      }).end(buffer);
    });

    return NextResponse.json({ success: true, url: (uploadResult as any).secure_url }, { status: 200 });

  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ success: false, message: "Image upload failed." }, { status: 500 });
  }
}

// You might still have other HTTP methods (GET, PUT, DELETE) in this file.
// If so, keep them as they are, but ensure they don't try to import DecryptToken.