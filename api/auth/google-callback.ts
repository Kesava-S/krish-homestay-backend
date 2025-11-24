import { getOAuthClient } from "../../lib/googleClient";
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const code = req.query.code as string;
    const oauth = getOAuthClient();

    const { tokens } = await oauth.getToken(code);

    // Print refresh token to console for setup
    console.log("REFRESH TOKEN:", tokens.refresh_token);

    res.send("OAuth successful. Copy the REFRESH TOKEN from logs → add to Vercel env → redeploy.");
}
