import type { VercelRequest, VercelResponse } from "@vercel/node";
import { addBooking } from "../../lib/sheets";
import { addBookingToCalendar } from "../../lib/calendar";
import { sendEmail } from "../../lib/email";
import { razorpay } from "../../lib/razorpay";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { name, email, phone, checkIn, checkOut, amount, paymentId } = req.body;

    if (!name || !email || !checkIn || !checkOut || !amount) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }

    // Verify Payment if paymentId is present
    if (paymentId) {
        try {
            const payment = await razorpay.payments.fetch(paymentId);
            if (payment.status !== "captured" && payment.status !== "authorized") {
                return res.status(400).json({ success: false, message: "Payment not verified" });
            }
            // Ideally check amount matches too
            // if (payment.amount !== amount * 100) ...
        } catch (error) {
            console.error("Payment verification failed:", error);
            return res.status(400).json({ success: false, message: "Invalid Payment ID" });
        }
    }

    const bookingID = "BKG-" + Date.now();

    // Add to Google Sheet
    await addBooking([
        bookingID, name, email, phone, checkIn, checkOut, amount, paymentId ? "Paid (Razorpay)" : "Pending"
    ]);

    // Add to Calendar
    await addBookingToCalendar({
        summary: `Krish Homestay - ${name}`,
        start: checkIn,
        end: checkOut
    });

    // Send confirmation email
    await sendEmail(
        email,
        "Booking Confirmed - Krish Homestay",
        `Dear ${name},\n\nYour stay is confirmed!\nBooking ID: ${bookingID}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\n\nThank you!`
    );

    res.status(200).json({ success: true, bookingID });
}
