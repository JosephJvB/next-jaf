import type { NextApiRequest, NextApiResponse } from "next";
import { Plant } from "../../../types/plant";
import * as sheetService from "../../../services/sheetService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Plant[]>
) {
  const rows = await sheetService.getRows("A:H");
  const plants = rows.slice(1).map((r) => sheetService.rowToPlant(r));
  res.status(200).json(plants);
}
