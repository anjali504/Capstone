import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const OrganizerBookings = ({ organizerId }) => {
  const [bookings, setBookings] = useState([]);
  const { organizer } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`https://capstone-a5ic.onrender.com/api/bookings/organizer/${organizer._id}`);
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [organizerId]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Bookings</h2>
      {bookings.length > 0 ? (
        <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Event</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">User</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Quantity</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Booking Date</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {bookings.map((booking) => (
                booking.events.map((event, index) => (
                  <tr key={`${booking._id}-${index}`}>
                    <td className="py-4 px-6 border-b border-gray-200">{event.event.eventName}</td>
                    <td className="py-4 px-6 border-b border-gray-200">{booking.user.email}</td>
                    <td className="py-4 px-6 border-b border-gray-200">{event.quantity}</td>
                    <td className="py-4 px-6 border-b border-gray-200">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default OrganizerBookings;
