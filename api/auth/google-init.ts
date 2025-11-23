import { getOAuthClient } from "../../lib/googleClient";
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
    const oauth = getOAuthClient();

    const url = oauth.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/spreadsheets",
            "https://www.googleapis.com/auth/calendar",
            "https://www.googleapis.com/auth/gmail.send"
        ],
        prompt: "consent"
    });

    res.redirect(url);
}
