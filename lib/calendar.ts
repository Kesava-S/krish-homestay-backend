import { google } from "googleapis";
import { getOAuthClient } from "./googleClient";

export async function addBookingToCalendar({ summary, start, end }: { summary: string, start: string, end: string }) {
    const client = getOAuthClient();
    const calendar = google.calendar({ version: "v3", auth: client });

    await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID!,
        requestBody: {
            summary,
            start: { dateTime: start, timeZone: "Asia/Kolkata" },
            end: { dateTime: end, timeZone: "Asia/Kolkata" },
        },
    });
}
