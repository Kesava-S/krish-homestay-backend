import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getBookings } from "../../lib/sheets";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { checkIn, checkOut } = req.body;
    if (!checkIn || !checkOut) return res.status(400).json({ success: false, message: "Missing dates" });

    const bookings = await getBookings();

    // Filter bookings that overlap with the requested range
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    let existingBookingType: string | null = null;

    // Skip header row
    for (let i = 1; i < bookings.length; i++) {
        const row = bookings[i];
        // Columns: 0:ID, 1:Name, 2:Email, 3:Phone, 4:CheckIn, 5:CheckOut, 6:Amount, 7:Status
        const bStart = new Date(row[4]);
        const bEnd = new Date(row[5]);
        const amount = parseFloat(row[6]);

        // Check overlap
        if (start < bEnd && end > bStart) {
            // Determine category based on amount (heuristic)
            // 5000/night -> 5-7 guests
            // 7000/night -> 8-15 guests
            // 2000/night -> 2-4 guests

            // We need per-night price to be sure, but total amount depends on duration.
            // Let's calculate duration of THAT booking to find per-night price.
            const duration = Math.ceil(Math.abs(bEnd.getTime() - bStart.getTime()) / (1000 * 60 * 60 * 24));
            const pricePerNight = amount / (duration || 1);

            if (pricePerNight >= 6500) { // Approx 7000
                existingBookingType = '8-15';
                break; // Fully booked
            } else if (pricePerNight >= 4500) { // Approx 5000
                if (existingBookingType === null) existingBookingType = '5-7';
                else if (existingBookingType === '2-4') existingBookingType = 'mixed'; // 5-7 + 2-4 = Full
            } else { // Approx 2000
                if (existingBookingType === null) existingBookingType = '2-4';
                else if (existingBookingType === '5-7') existingBookingType = 'mixed';
            }
        }
    }

    let status = 'available';
    if (existingBookingType === '8-15' || existingBookingType === 'mixed') {
        status = 'fully_booked';
    } else if (existingBookingType === '5-7') {
        status = 'booked_5_7';
    } else if (existingBookingType === '2-4') {
        status = 'booked_2_4'; // Effectively full for 5-7 and 8-15, but maybe we don't want to support 5-7 if 2-4 is taken? 
        // User didn't specify what happens if 2-4 is taken first. 
        // "The selected dates should still remain open for 2–4 guests" (if 5-7 is taken).
        // But if 2-4 is taken, can 5-7 book? "You will get only one room...".
        // Let's assume if 2-4 is taken, the "main" villa (5-7) is still available? 
        // Actually, usually 2-4 is the "extra" room. 
        // If 2-4 is booked alone, it implies the small room is taken. 
        // Can 5-7 book the rest? Yes, logic suggests they are separate.
        // But user said: "If Guest Selection = 2–4... You will get only one room... Other rooms are occupied".
        // This implies 2-4 is usually a "fallback" option.
        // Let's mark it as 'booked_2_4' and handle frontend logic.
    }

    res.json({ success: true, status, existingBookingType });
}
