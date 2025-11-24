import { google } from "googleapis";
import { getOAuthClient } from "./googleClient";

export async function sendEmail(to: string, subject: string, message: string) {
    const oauth = getOAuthClient();
    const gmail = google.gmail({ version: "v1", auth: oauth });

    const encoded = Buffer.from(
        `To: ${to}\r\nSubject: ${subject}\r\n\r\n${message}`
    )
        .toString("base64")
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    await gmail.users.messages.send({
        userId: "me",
        requestBody: { raw: encoded }
    });
}
