import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { getSession } from "@/lib/session";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_VIDEO_SIZE = 40 * 1024 * 1024;
const IMAGE_EXT = new Set(["jpg", "jpeg", "png", "webp", "gif"]);
const VIDEO_EXT = new Set(["mp4", "webm", "mov"]);
const ALLOWED_FOLDERS = new Set(["testimonials", "banners", "services", "hero"]);

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";

  // Vercel Blob client-upload protocol: the browser uploads the file bytes directly
  // to Blob storage, bypassing this function's request body size limit.
  if (contentType.includes("application/json")) {
    const body = (await request.json()) as HandleUploadBody;
    try {
      const jsonResponse = await handleUpload({
        body,
        request,
        onBeforeGenerateToken: async (pathname) => {
          const session = await getSession();
          if (!session.userId || (!session.isMain && !session.canManageSite)) {
            throw new Error("권한이 없습니다.");
          }
          const folder = pathname.split("/")[0];
          if (!ALLOWED_FOLDERS.has(folder)) {
            throw new Error("허용되지 않은 업로드 경로입니다.");
          }
          return {
            allowedContentTypes: ["image/*", "video/*"],
            addRandomSuffix: true,
            maximumSizeInBytes: MAX_VIDEO_SIZE,
          };
        },
        onUploadCompleted: async () => {},
      });
      return NextResponse.json(jsonResponse);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "업로드에 실패했습니다." },
        { status: 400 }
      );
    }
  }

  // Legacy path: used in local development, where there is no Blob store configured.
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

  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(uploadDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);

  return NextResponse.json({ url: `/uploads/${folder}/${filename}`, mediaType: isVideo ? "video" : "image" });
}
