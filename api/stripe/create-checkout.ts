import type { VercelRequest, VercelResponse } from "@vercel/node";
import { stripe } from "../../lib/stripe";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { amount, name, email, checkIn, checkOut } = req.body;

    if (!amount || !name || !email || !checkIn || !checkOut) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
            {
                price_data: {
                    currency: "inr",
                    product_data: { name: "Krish Homestay Booking" },
                    unit_amount: amount * 100
                },
                quantity: 1
            }
        ],
        success_url: `https://yourdomain.com/booking-success`,
        cancel_url: `https://yourdomain.com/booking-error`,
        metadata: { name, email, checkIn, checkOut }
    });

    res.json({ url: session.url });
}
