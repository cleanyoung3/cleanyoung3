import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_VIDEO_SIZE = 40 * 1024 * 1024;
const IMAGE_EXT = new Set(["jpg", "jpeg", "png", "webp", "gif"]);
const VIDEO_EXT = new Set(["mp4", "webm", "mov"]);
const ALLOWED_FOLDERS = new Set(["testimonials", "banners", "services"]);

export async function POST(request: Request) {
  const session = await getSession();
  if (!session.userId || (!session.isMain && !session.canManageSite)) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const folderRaw = String(formData.get("folder") || "testimonials");
  const folder = ALLOWED_FOLDERS.has(folderRaw) ? folderRaw : "testimonials";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
  }

  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");
  if (!isImage && !isVideo) {
    return NextResponse.json({ error: "이미지 또는 동영상 파일만 업로드할 수 있습니다." }, { status: 400 });
  }

  const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
  if (file.size > maxSize) {
    return NextResponse.json(
      { error: `파일 크기는 ${Math.round(maxSize / 1024 / 1024)}MB 이하여야 합니다.` },
      { status: 400 }
    );
  }

  const rawExt = (file.name.split(".").pop() || "").toLowerCase();
  const allowedExt = isVideo ? VIDEO_EXT : IMAGE_EXT;
  const ext = allowedExt.has(rawExt) ? rawExt : isVideo ? "mp4" : "jpg";
  const filename = `${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const mediaType = isVideo ? "video" : "image";

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`${folder}/${filename}`, buffer, {
      access: "public",
      contentType: file.type,
    });
    return NextResponse.json({ url: blob.url, mediaType });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);

  return NextResponse.json({ url: `/uploads/${folder}/${filename}`, mediaType });
}
