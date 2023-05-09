import type { NextApiRequest, NextApiResponse } from "next";
import { plants } from "../../../data/plants";
import { Plant } from "../../../types/plant";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Plant[]>
) {
  await new Promise((r) => setTimeout(r, 300));
  res.status(200).json(plants);
}
