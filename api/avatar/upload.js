import { put } from "@vercel/blob";

export default async function handler(request, response) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  // This takes the file body from your frontend and sends it to Vercel storage
  const blob = await put(filename, request, {
    access: "public",
  });

  return response.status(200).json(blob);
}
