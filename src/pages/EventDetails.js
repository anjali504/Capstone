import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CalendarIcon, ClockIcon, MapIcon, PhoneIcon, MailIcon } from "@heroicons/react/solid";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://capstone-a5ic.onrender.com:5000/api/events/get/${id}`);
        const result = await res.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleBuyTickets = () => {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const eventInCart = cart.find(item => item.id === data._id);
    
    if (!eventInCart) {
      cart.push({
        id: data._id,
        eventName: data.eventName,
        date: data.date,
        time: data.time,
        venue: data.venue,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode,
        phoneNumber: data.phoneNumber,
        emailAddress: data.emailAddress,
        ticketPrice: data.ticketPrice,
        availableTickets: data.availableTickets,
        eventCategory: data.eventCategory,
        description: data.description,
        image: `data:${data.imageId.contentType};base64,${data.imageId.imageBase64}`,
        quantity: 1
      });

      sessionStorage.setItem('cart', JSON.stringify(cart));
    }

    navigate('/cart');
  };

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 mb-4 overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg">
              {data.imageId.imageBase64 && (
                <img
                  className="w-full h-full object-cover"
                  src={`data:${data.imageId.contentType};base64,${data.imageId.imageBase64}`}
                  alt={data.eventName}
                />
              )}
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                {data.availableTickets > 0 ? (
                  <button
                                        style={{ backgroundColor: '#065774' }}

                    onClick={handleBuyTickets}
                    className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    Buy Tickets
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-full  cursor-not-allowed"
                  >
                    Sorry Ticket Not Available
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold dark:text-white mb-2">{data.eventName}</h2>
            <div className="flex items-center text-sm mb-4">
              <CalendarIcon className="h-5 w-5 mr-2" />
              <p>{new Date(data.date).toLocaleDateString()}</p>
              <ClockIcon className="h-5 w-5 ml-4 mr-2" />
              <p>{data.time}</p>
            </div>
            <div className="text-sm mb-4">
              <div className="flex items-center">
                <MapIcon className="h-5 w-5 mr-2" />
                <p>{data.venue}</p>
              </div>
              <div className="flex items-center mt-2">
                <p>{data.city}, {data.state}, {data.country}, {data.zipCode}</p>
              </div>
            </div>
            <div className="text-sm mb-4">
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2" />
                <p>Phone: {data.phoneNumber}</p>
              </div>
              <div className="flex items-center mt-2">
                <MailIcon className="h-5 w-5 mr-2" />
                <p>Email: {data.emailAddress}</p>
              </div>
            </div>
            <div className="text-sm mb-4">
              <div className="flex items-center">
                <span className="font-bold text-gray-700">Price:</span>
                <p className="ml-2">${data.ticketPrice}</p>
              </div>
              <div className="flex items-center mt-2">
                <span className="font-bold text-gray-700">Available Tickets:</span>
                <p className="ml-2">{data.availableTickets}</p>
              </div>
            </div>
            <div className="text-sm mb-4">
              <span className="font-bold text-gray-700">Event Category:</span>
              <p className="ml-2">{data.eventCategory}</p>
            </div>
            <div className="text-sm mb-4">
              <span className="font-bold text-gray-700">Description:</span>
              <p className="ml-2 mt-2">{data.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
