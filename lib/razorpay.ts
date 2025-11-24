import Razorpay from "razorpay";

export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_Rjaqp52g9afmt5",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "QsmgbIkeYLw23WjWNgLe1I76",
});
