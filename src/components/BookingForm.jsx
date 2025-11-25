import React, { useState, useEffect } from 'react';
import { checkAvailability, bookStay } from '../services/api';
import './BookingForm.css';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        checkIn: '',
        checkOut: '',
        guestCategory: '5-7', // Default
        adults: 2,
        children: 0,
        name: '',
        email: '',
        phone: ''
    });
    const [availability, setAvailability] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Get today's date for min attribute
    const today = new Date().toISOString().split('T')[0];

    const guestCategories = [
        { id: '5-7', label: '5–7 Guests', price: 5000, maxTotal: 7 },
        { id: '8-15', label: '8–15 Guests', price: 7000, maxTotal: 15 },
        { id: '2-4', label: '2–4 Guests', price: 2000, maxTotal: 4 },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };

            // Reset availability if dates change
            if (name === 'checkIn' || name === 'checkOut') {
                setAvailability(null);
            }

            return newData;
        });
    };

    const handleGuestCategoryChange = (categoryId) => {
        setFormData(prev => ({
            ...prev,
            guestCategory: categoryId,
            adults: 1, // Reset counts on category change
            children: 0
        }));
    };

    const handleCountChange = (type, operation) => {
        setFormData(prev => {
            const currentTotal = prev.adults + prev.children;
            const category = guestCategories.find(c => c.id === prev.guestCategory);
            const max = category ? category.maxTotal : 15;

            let newAdults = prev.adults;
            let newChildren = prev.children;

            if (type === 'adults') {
                if (operation === 'inc' && currentTotal < max) newAdults++;
                if (operation === 'dec' && newAdults > 1) newAdults--;
            } else {
                if (operation === 'inc' && currentTotal < max) newChildren++;
                if (operation === 'dec' && newChildren > 0) newChildren--;
            }

            return { ...prev, adults: newAdults, children: newChildren };
        });
    };

    const handleCheckAvailability = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const result = await checkAvailability({
                checkIn: formData.checkIn,
                checkOut: formData.checkOut
            });

            // Logic to handle partial availability
            // Assuming backend returns { available: true/false, existingBookingType: '5-7' | null }
            // For now, we simulate this logic or use the result directly

            if (result.available) {
                setAvailability({
                    available: true,
                    price: getPriceForCategory(formData.guestCategory),
                    total: calculateTotal(formData.checkIn, formData.checkOut, getPriceForCategory(formData.guestCategory))
                });
            } else if (result.existingBookingType === '5-7') {
                // Special rule: If 5-7 booked, allow 2-4
                if (formData.guestCategory === '2-4') {
                    setAvailability({
                        available: true,
                        price: 2000,
                        total: calculateTotal(formData.checkIn, formData.checkOut, 2000),
                        note: "You will get only one room in the villa. Other rooms are occupied."
                    });
                } else {
                    setAvailability({ available: false, message: "Dates are partially booked. Only 2-4 guest slots available." });
                }
            } else {
                setAvailability({ available: false });
            }

        } catch (err) {
            console.warn("API failed, simulating for demo:", err);
            // Fallback simulation
            setAvailability({
                available: true,
                price: getPriceForCategory(formData.guestCategory),
                total: calculateTotal(formData.checkIn, formData.checkOut, getPriceForCategory(formData.guestCategory))
            });
        } finally {
            setLoading(false);
        }
    };

    const getPriceForCategory = (catId) => {
        const cat = guestCategories.find(c => c.id === catId);
        return cat ? cat.price : 0;
    };

    const calculateTotal = (start, end, pricePerNight) => {
        const s = new Date(start);
        const e = new Date(end);
        const diffTime = Math.abs(e - s);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays * pricePerNight;
    };

    const handleRazorpayPayment = () => {
        if (!availability) return;
        const amountInPaise = availability.total * 100;

        const options = {
            key: "rzp_test_Rjaqp52g9afmt5",
            amount: amountInPaise,
            currency: "INR",
            name: "Krish Homestay",
            description: "Booking Payment",
            image: "/vite.svg",
            handler: async function (response) {
                setLoading(true);
                try {
                    await bookStay({
                        ...formData,
                        paymentId: response.razorpay_payment_id,
                        amount: availability.total,
                        guestCount: formData.adults + formData.children
                    });
                    setSuccess(true);
                } catch (err) {
                    console.error("Booking save failed:", err);
                    setSuccess(true);
                } finally {
                    setLoading(false);
                }
            },
            prefill: {
                name: formData.name,
                email: formData.email,
                contact: formData.phone
            },
            theme: {
                color: "#4A7c59"
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            alert("Payment Failed: " + response.error.description);
        });
        rzp1.open();
    };

    const handleBook = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone) {
            alert("Please fill in all guest details.");
            return;
        }
        handleRazorpayPayment();
    };

    if (success) {
        return (
            <div className="booking-success">
                <h3>Booking Request Sent!</h3>
                <p>Thank you, {formData.name}. We have received your booking request.</p>
                <p>We will send a confirmation email to {formData.email} shortly.</p>
                <button className="btn btn-primary" onClick={() => setSuccess(false)}>Book Another</button>
            </div>
        );
    }

    return (
        <div className="booking-form-container">
            <h4 className="villa-heading">Book your private 3BHK villa in Munnar</h4>

            <form onSubmit={handleCheckAvailability}>
                <div className="form-group">
                    <label>Check-in Date</label>
                    <input
                        type="date"
                        name="checkIn"
                        min={today}
                        value={formData.checkIn}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Check-out Date</label>
                    <input
                        type="date"
                        name="checkOut"
                        min={formData.checkIn || today}
                        value={formData.checkOut}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Select Guest Category</label>
                    <div className="guest-categories">
                        {guestCategories.map(cat => (
                            <label key={cat.id} className={`category - option ${formData.guestCategory === cat.id ? 'selected' : ''} `}>
                                <input
                                    type="radio"
                                    name="guestCategory"
                                    value={cat.id}
                                    checked={formData.guestCategory === cat.id}
                                    onChange={() => handleGuestCategoryChange(cat.id)}
                                />
                                {cat.label}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-group guest-counts">
                    <div className="count-control">
                        <label>Adults</label>
                        <div className="counter">
                            <button type="button" onClick={() => handleCountChange('adults', 'dec')}>-</button>
                            <span>{formData.adults}</span>
                            <button type="button" onClick={() => handleCountChange('adults', 'inc')}>+</button>
                        </div>
                    </div>
                    <div className="count-control">
                        <label>Children</label>
                        <div className="counter">
                            <button type="button" onClick={() => handleCountChange('children', 'dec')}>-</button>
                            <span>{formData.children}</span>
                            <button type="button" onClick={() => handleCountChange('children', 'inc')}>+</button>
                        </div>
                    </div>
                    <p className="text-small">Max total guests: {guestCategories.find(c => c.id === formData.guestCategory)?.maxTotal}</p>
                </div>

                {!availability && (
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? 'Checking...' : 'Check Availability'}
                    </button>
                )}
            </form>

            {availability && (availability.available || availability.note) && (
                <div className="availability-result">
                    {availability.note && <p className="note-text">{availability.note}</p>}
                    <p className="success-text">Dates are available!</p>
                    <p>Price per night: ₹{availability.price}</p>
                    <p className="total-price">Total: ₹{availability.total}</p>

                    <div className="guest-details">
                        <h4>Guest Details</h4>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />

                        <button onClick={handleBook} className="btn btn-secondary w-100" disabled={loading} id="rzp-button">
                            {loading ? 'Processing...' : 'Pay & Book Now'}
                        </button>
                    </div>
                </div>
            )}

            {availability && !availability.available && (
                <div className="availability-result">
                    <p className="error-text">{availability.message || "Sorry, these dates are not available."}</p>
                    <button className="btn btn-outline w-100 mt-2" onClick={() => setAvailability(null)}>Check Other Dates</button>
                </div>
            )}

            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default BookingForm;
