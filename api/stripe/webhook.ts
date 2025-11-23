import type { VercelRequest, VercelResponse } from "@vercel/node";
import { stripe } from "../../lib/stripe";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const sig = req.headers["stripe-signature"] as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        console.log("Payment Success:", session.id);
        // You can add code here to update Google Sheet or send email
    }

    res.status(200).send("OK");
}
