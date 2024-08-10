import React from 'react';
import '../stylesheet/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="home-container">
      <section className="about-hero-section">
        <div className="hero-text">
          <h1>Bringing Events to Life</h1>
          <p>
            At Event Innovators, we are passionate about creating unforgettable experiences for our clients. Our mission is to simplify the event planning process and connect organizers with the perfect venues and services. Whether you're hosting a small gathering or a large conference, we're here to ensure your event is a success.
          </p>
        </div>
        <div className="hero-image">
          <img src="./logo.png" alt="Event Innovators" />
        </div>
      </section>

      <section className="service-section">
        <h2>Our Services</h2>
        <div className="service-points">
          <div className="service-point">
            <img src="./organize.svg" alt="Organize Icon" />
            <h3>Organize Event</h3>
            <p>
              Our platform allows event organizers to effortlessly create and manage their events. From setting up event details to handling registrations and payments, we provide all the tools you need for a seamless experience.
            </p>
          </div>
          <div className="service-point">
            <img src="./find.svg" alt="Find Icon" />
            <h3>Find Best Event</h3>
            <p>
              Discover the best events happening around you. Use our advanced search and filtering options to find events that match your interests, whether it’s music, sports, conferences, or festivals.
            </p>
          </div>
          <div className="service-point">
            <img src="./booking.svg" alt="Booking Icon" />
            <h3>Book Ticket</h3>
            <p>
              Secure your spot at your favorite events with our easy-to-use ticket booking system. Choose your event, select your tickets, and complete your purchase in just a few clicks.
            </p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="./anjali.jpeg" alt="" />
            <h3>Anjali Thakkar</h3>
          </div>
          <div className="team-member">
            <img src="./shruti.jpeg" alt="" />
            <h3>Shruti Patel</h3>
          </div>
          <div className="team-member">
            <img src="./Shivani.jpeg" alt="" />
            <h3>Shivani Ranoliya</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
