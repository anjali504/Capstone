import React, { useEffect, useState ,useContext} from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckoutForm = ({ cartItems, totalPrice }) => {
  const { user } = useContext(AuthContext);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch('https://capstone-a5ic.onrender.com:5000/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalPrice * 100 }), // amount in cents
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, [totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
  
    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);
  
    const paymentMethod = {
      card: {
        number: cardNumberElement,
        expiry: cardExpiryElement,
        cvc: cardCvcElement,
      },
      billing_details: {
        name: name,
        email: email,
      },
    };
  
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: name,
          email: email,
        },
      },
    });
  
    if (error) {
      console.error(error);
      toast.error('Payment failed');
    } else if (paymentIntent.status === 'succeeded') {
      try {
        for (const item of cartItems) {
          const response = await fetch('https://capstone-a5ic.onrender.com:5000/api/events/reduce-tickets', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              eventId: item.id,
              quantity: item.quantity,
            }),
          });
  
          if (!response.ok) {
            throw new Error('Error reducing tickets');
          }
        }
  
        // Save the booking details
        await fetch('https://capstone-a5ic.onrender.com:5000/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: user._id, // Ensure you have the userId available
            events: cartItems.map(item => ({ event: item.id, quantity: item.quantity })),
          }),
        });
  
        sendEmail(cartItems, totalPrice, name, email);
        sessionStorage.removeItem('cart');
        toast.success('Payment successful!');
        navigate('/');
      } catch (err) {
        console.error('Error reducing tickets:', err);
        toast.error('Payment successful but error reducing tickets');
      }
    }
  };

  const sendEmail = (cartItems, totalPrice, name, email) => {
    const templateParams = {
      to_name: name,
      to_email: email,
      cart: cartItems.map(item => `${item.quantity} x ${item.eventName}`).join(', '),
      total: totalPrice.toFixed(2),
      eventDetails: cartItems.map(item => `Event: ${item.eventName}, Quantity: ${item.quantity}, Date: ${item.date}, Location: ${item.venue},${item.city},${item.state}`).join('\n'),
    };

    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      templateParams,
      process.env.REACT_APP_EMAILJS_USER_ID
    )
      .then(response => {
        console.log('Email sent successfully!', response.status, response.text);
      })
      .catch(err => {
        console.error('Failed to send email:', err);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Checkout</h2>
          <p className="text-gray-600 mb-6">Please fill out the form below to complete your purchase.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-800 font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400"
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-800 font-bold mb-2" htmlFor="card_element">
                Card Information
              </label>
              <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400">
                <CardNumberElement id="card_number_element" />
                <CardExpiryElement id="card_expiry_element" />
                <CardCvcElement id="card_cvc_element" />
              </div>
            </div>
            <button
                                                    style={{ backgroundColor: '#065774' }}

              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
              type="submit"
              disabled={!stripe || !clientSecret}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CheckoutForm;
