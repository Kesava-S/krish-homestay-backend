import { google } from "googleapis";
import { getOAuthClient } from "./googleClient";
import fs from "fs";

export async function uploadGuestID(filePath: string, fileName: string) {
    const client = getOAuthClient();
    const drive = google.drive({ version: "v3", auth: client });

    const requestBody: any = {
        name: fileName,
    };

    if (process.env.GOOGLE_DRIVE_FOLDER_ID) {
        requestBody.parents = [process.env.GOOGLE_DRIVE_FOLDER_ID];
    }

    const res = await drive.files.create({
        requestBody,
        media: {
            mimeType: 'application/pdf',
            body: fs.createReadStream(filePath)
        },
        fields: 'id'
    });

    return res.data.id;
}
