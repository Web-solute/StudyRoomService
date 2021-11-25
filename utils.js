import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  },
  region: "ap-northeast-2"
});

export const uploadPhotos = async (file, studentId, folderName) => {
  const { filename, createReadStream } = await file;
  const ReadStream = createReadStream();
  const fileName = `${folderName}/${studentId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3().upload({
    Body: ReadStream,
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    ACL: "public-read"
  }).promise();
  return Location;
}