import type { VercelRequest, VercelResponse } from "@vercel/node";
import { verifyAdminPassword } from "../../lib/auth";

export default function handler(req: VercelRequest, res: VercelResponse) {
    const { password } = req.body;

    if (verifyAdminPassword(password)) {
        return res.json({ success: true });
    }

    res.status(401).json({ success: false, message: "Unauthorized" });
}
