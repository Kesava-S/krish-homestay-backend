import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getAvailability } from "../../lib/sheets";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { date } = req.body;
    if (!date) return res.status(400).json({ success: false, message: "Missing date" });

    const availability = await getAvailability(date);

    const isAvailable = availability.some(row => row[0] === date && row[1]?.toLowerCase() === "yes");

    res.json({ success: true, available: isAvailable });
}
