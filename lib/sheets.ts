import { google } from "googleapis";
import { getOAuthClient } from "./googleClient";

export async function addBooking(row: any[]) {
    const client = getOAuthClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEETS_ID!,
        range: "Bookings!A:Z",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [row] }
    });
}

export async function getAvailability(date: string) {
    const client = getOAuthClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEETS_ID!,
        range: `Availability!A:C`
    });

    return res.data.values || [];
}
