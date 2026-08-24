import { upload } from "@vercel/blob/client";

export async function uploadFile(file: File, folder: string): Promise<string> {
  try {
    const blob = await upload(`${folder}/${file.name}`, file, {
      access: "public",
      handleUploadUrl: "/api/uploads",
    });
    return blob.url;
  } catch {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", folder);
    const res = await fetch("/api/uploads", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "업로드에 실패했습니다.");
    return data.url as string;
  }
}
