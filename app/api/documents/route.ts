export const runtime = "nodejs";

import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";

console.log({
  accountId: process.env.R2_ACCOUNT_ID,
  bucket: process.env.R2_BUCKET_NAME,
  accessKey: !!process.env.R2_ACCESS_KEY_ID,
  secretKey: !!process.env.R2_SECRET_ACCESS_KEY,
});

export async function GET() {

  try {

    const result = await r2.send(
      new ListObjectsV2Command({
        Bucket:
          process.env.R2_BUCKET_NAME,
        Prefix:"documents/"
      })
    );


    const files =
      result.Contents?.map((file)=>({

        id:
          file.Key,

        title:
          file.Key?.split("/").pop(),

        key:
          file.Key,

        size:
          formatBytes(
            file.Size ?? 0
          ),

        type:
          getExtension(
            file.Key ?? ""
          ),
        category:
          file.Key?.split("/")[1] || "genel",

        updatedAt:
          file.LastModified
          ?.toLocaleDateString(
            "tr-TR"
          ),

      })) ?? [];


    return Response.json(files);


  } catch (error: any) {
  console.error("R2 Error:", error);

  return Response.json(
    {
      name: error?.name,
      message: error?.message,
      metadata: error?.$metadata,
      stack: process.env.NODE_ENV === "development" ? error?.stack : undefined,
    },
    {
      status: 500,
    }
  );
}

}



function formatBytes(
 bytes:number
){

if(bytes===0)
 return "0 Bytes";


const sizes=[
 "Bytes",
 "KB",
 "MB",
 "GB"
];


const i =
Math.floor(
 Math.log(bytes) /
 Math.log(1024)
);


return (
Math.round(
 bytes /
 Math.pow(1024,i)
)
+
" "
+
sizes[i]
);

}



function getExtension(
filename:string
){

return (
filename
.split(".")
.pop()
?.toUpperCase()
||
"FILE"
);

}