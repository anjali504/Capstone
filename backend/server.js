const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbconnection');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); 
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const bookingRoutes = require('./routes/bookingRoutes'); 

dotenv.config();

connectDB();

const app = express();

const corsOptions = {
  origin: 'https://capstone-1-ivoi.onrender.com/', 
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Increase the limit for JSON and form data
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use(bodyParser.json({ limit: '20mb' })); 
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes); 
app.use('/api/bookings', bookingRoutes); 

const SECRET_KEY = process.env.SECRET_KEY;


const stripe = require('stripe')(SECRET_KEY);
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
