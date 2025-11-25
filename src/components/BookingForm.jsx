import React, { useState, useEffect } from 'react';
import { checkAvailability, bookStay } from '../services/api';
import './BookingForm.css';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        checkIn: '',
        checkOut: '',
        guestCategory: '', // Start empty
        adults: 1,
        children: 0,
        name: '',
        email: '',
        phone: ''
    });
    const [dateStatus, setDateStatus] = useState(null); // 'available', 'booked_5_7', 'fully_booked', etc.
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

    // Effect to check availability when dates change
    useEffect(() => {
        if (formData.checkIn && formData.checkOut) {
            checkDates();
        } else {
            setDateStatus(null);
            setFormData(prev => ({ ...prev, guestCategory: '' }));
        }
    }, [formData.checkIn, formData.checkOut]);

    const checkDates = async () => {
        setLoading(true);
        setError('');
        try {
            const result = await checkAvailability({
                checkIn: formData.checkIn,
                checkOut: formData.checkOut
            });

            // Backend now returns { status: 'available' | 'booked_5_7' | 'fully_booked' | ... }
            setDateStatus(result.status);

            // Auto-select category or reset based on status
            if (result.status === 'available') {
                setFormData(prev => ({ ...prev, guestCategory: '5-7' })); // Default to 5-7
            } else if (result.status === 'booked_5_7') {
                setFormData(prev => ({ ...prev, guestCategory: '2-4' })); // Only option
            } else {
                setFormData(prev => ({ ...prev, guestCategory: '' })); // No options
            }

        } catch (err) {
            console.warn("API failed, simulating for demo:", err);
            // Fallback simulation
            setDateStatus('available');
            setFormData(prev => ({ ...prev, guestCategory: '5-7' }));
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                if (operation === 'inc') {
                    if (currentTotal < max) newAdults++;
                }
                if (operation === 'dec' && newAdults > 1) newAdults--;
            } else {
                if (operation === 'inc') {
                    if (currentTotal < max) newChildren++;
                }
                if (operation === 'dec' && newChildren > 0) newChildren--;
            }

            return { ...prev, adults: newAdults, children: newChildren };
        });
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
        return (diffDays || 1) * pricePerNight;
    };

    const handleRazorpayPayment = () => {
        const price = getPriceForCategory(formData.guestCategory);
        const total = calculateTotal(formData.checkIn, formData.checkOut, price);
        const amountInPaise = total * 100;

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
                        amount: total,
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

    // Determine which options to show
    const showOptions = dateStatus === 'available' || dateStatus === 'booked_5_7';
    const show5to7 = dateStatus === 'available';
    const show8to15 = dateStatus === 'available';
    const show2to4 = dateStatus === 'booked_5_7';

    const currentCategory = guestCategories.find(c => c.id === formData.guestCategory);
    const totalPrice = currentCategory ? calculateTotal(formData.checkIn, formData.checkOut, currentCategory.price) : 0;

    return (
        <div className="booking-form-container">
            <h4 className="villa-heading">Book your private 3BHK villa in Munnar</h4>

            <form onSubmit={(e) => e.preventDefault()}>
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

                {loading && <p>Checking availability...</p>}

                {showOptions && !loading && (
                    <div className="form-group">
                        <label>Select Guest Category</label>
                        <div className="guest-categories">
                            {show5to7 && (
                                <label className={`category - option ${formData.guestCategory === '5-7' ? 'selected' : ''} `}>
                                    <input
                                        type="radio"
                                        name="guestCategory"
                                        value="5-7"
                                        checked={formData.guestCategory === '5-7'}
                                        onChange={() => handleGuestCategoryChange('5-7')}
                                    />
                                    5–7 Guests (₹5000/night)
                                </label>
                            )}
                            {show8to15 && (
                                <label className={`category - option ${formData.guestCategory === '8-15' ? 'selected' : ''} `}>
                                    <input
                                        type="radio"
                                        name="guestCategory"
                                        value="8-15"
                                        checked={formData.guestCategory === '8-15'}
                                        onChange={() => handleGuestCategoryChange('8-15')}
                                    />
                                    8–15 Guests (₹7000/night)
                                </label>
                            )}
                            {show2to4 && (
                                <label className={`category - option ${formData.guestCategory === '2-4' ? 'selected' : ''} `}>
                                    <input
                                        type="radio"
                                        name="guestCategory"
                                        value="2-4"
                                        checked={formData.guestCategory === '2-4'}
                                        onChange={() => handleGuestCategoryChange('2-4')}
                                    />
                                    2–4 Guests (₹2000/night)
                                </label>
                            )}
                        </div>
                    </div>
                )}

                {showOptions && !loading && formData.guestCategory && (
                    <div className="form-group guest-counts">
                        {formData.guestCategory === '2-4' && (
                            <p className="note-text" style={{ color: '#d9534f', fontSize: '0.9rem', marginBottom: '10px' }}>
                                You will get only one room in the villa. Other rooms are occupied by other guests. Please maintain calmness of the environment.
                            </p>
                        )}

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
                        <p className="text-small">Max total guests: {currentCategory?.maxTotal}</p>
                    </div>
                )}

                {showOptions && !loading && formData.guestCategory && (
                    <div className="availability-result">
                        <p className="success-text">Dates are available!</p>
                        <p>Price per night: ₹{currentCategory?.price}</p>
                        <p className="total-price">Total: ₹{totalPrice}</p>

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

                {dateStatus === 'fully_booked' && !loading && (
                    <div className="availability-result">
                        <p className="error-text">Sorry, these dates are fully booked.</p>
                        <button className="btn btn-outline w-100 mt-2" onClick={() => setDateStatus(null)}>Check Other Dates</button>
                    </div>
                )}

                {dateStatus === 'booked_2_4' && !loading && (
                    <div className="availability-result">
                        <p className="error-text">Sorry, these dates are partially booked and cannot accommodate your request.</p>
                    </div>
                )}

                {error && <p className="error-text">{error}</p>}
            </form>
        </div>
    );
};

export default BookingForm;
