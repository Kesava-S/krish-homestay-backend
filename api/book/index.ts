import type { VercelRequest, VercelResponse } from "@vercel/node";
import { addBooking } from "../../lib/sheets";
import { addBookingToCalendar } from "../../lib/calendar";
import { sendEmail } from "../../lib/email";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { name, email, phone, checkIn, checkOut, amount } = req.body;

    if (!name || !email || !checkIn || !checkOut || !amount) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const bookingID = "BKG-" + Date.now();

    // Add to Google Sheet
    await addBooking([
        bookingID, name, email, phone, checkIn, checkOut, amount, "Paid"
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
