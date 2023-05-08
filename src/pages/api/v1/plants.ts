import { PlantCardProps } from "@/components/plantCard/plantCard";
import { plants } from "@/data/plants";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlantCardProps[]>
) {
  await new Promise((r) => setTimeout(r, 300));
  res.status(200).json(plants);
}
