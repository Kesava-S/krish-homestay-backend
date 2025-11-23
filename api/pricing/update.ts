import type { VercelRequest, VercelResponse } from "@vercel/node";
import { verifyAdminPassword } from "../../lib/auth";
import { google } from "googleapis";
import { getOAuthClient } from "../../lib/googleClient";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { password, date, price } = req.body;

    if (!verifyAdminPassword(password)) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const client = getOAuthClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEETS_ID!,
        range: `Availability!A${date}:C${date}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[date, "Yes", price]] }
    });

    res.json({ success: true });
}
