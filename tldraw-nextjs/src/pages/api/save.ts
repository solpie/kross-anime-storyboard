import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log("process.cwd() :>> ", process.cwd());
  const filePath = path.join(process.cwd(), "data", "drawing.json");
  await fs.writeFile(filePath, JSON.stringify(req.body, null, 2));
  res.status(200).json({ success: true });
  try {
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ error: "Failed to save drawing" });
  }
}
