export const runtime = "nodejs";

import {
  ListObjectsV2Command,
  HeadObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function GET() {
  try {
    const result = await r2.send(
      new ListObjectsV2Command({
        Bucket: process.env.R2_BUCKET_NAME,
        Prefix: "documents/",
      }),
    );

    const files = await Promise.all(
      (result.Contents ?? []).map(async (file) => {
        const metadata = await r2.send(
          new HeadObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: file.Key,
          }),
        );
        const url = await getSignedUrl(
          r2,
          new GetObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: file.Key,
          }),
          {
            expiresIn: 60 * 10, // 10 dakika
          },
        );

        return {
          id: file.Key,

          title: file.Key?.split("/").pop(),

          key: file.Key,

          url,

          size: formatBytes(file.Size ?? 0),

          type: getExtension(file.Key ?? ""),

          category: file.Key?.split("/")[1] || "genel",

          uploadedBy: metadata.Metadata?.uploadedby || "Bilinmiyor",

          updatedAt: file.LastModified?.toLocaleDateString("tr-TR"),
        };
      }),
    );

    return Response.json(files);
  } catch (error: any) {
    console.error("R2 Error:", error);

    return Response.json(
      {
        name: error?.name,
        message: error?.message,
        metadata: error?.$metadata,
        stack:
          process.env.NODE_ENV === "development" ? error?.stack : undefined,
      },
      {
        status: 500,
      },
    );
  }
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 Bytes";

  const sizes = ["Bytes", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
}

function getExtension(filename: string) {
  return filename.split(".").pop()?.toUpperCase() || "FILE";
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    console.log("Silinecek key:", body.key);

    if (!body.key) {
      return Response.json(
        {
          error: "Key bulunamadı",
        },
        {
          status: 400,
        },
      );
    }

    await r2.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: body.key,
      }),
    );

    return Response.json({
      success: true,
    });
  } catch (error: any) {
    console.error("R2 DELETE ERROR:", error);

    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
