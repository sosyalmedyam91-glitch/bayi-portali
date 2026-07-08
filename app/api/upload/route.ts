export const runtime = "nodejs";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";


export async function POST(
 request: Request
){

try {


const formData =
await request.formData();


const file =
formData.get("file") as File;


const category =
formData.get("category") as string;



if(!file){

return Response.json(
{
error:"Dosya bulunamadı"
},
{
status:400
}
);

}



const buffer =
Buffer.from(
await file.arrayBuffer()
);



const folder =
category || "genel";



const key =
`documents/${folder}/${Date.now()}-${file.name}`;



await r2.send(

new PutObjectCommand({

Bucket:
process.env.R2_BUCKET_NAME,

Key:key,

Body:buffer,

ContentType:file.type

})

);



return Response.json({

success:true,

key,

url:
`${process.env.R2_PUBLIC_URL}/${key}`

});


}
catch(error){

console.error(error);


return Response.json(
{
error:"Upload başarısız"
},
{
status:500
}
);

}

}