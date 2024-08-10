import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../stylesheet/ContactUs.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    comment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const templateParams = {
      from_name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      message: formData.comment
    };

    emailjs.send('service_6ckkfn9', 'template_jy2aprh', templateParams, '7aVt4LutBX4T240ta')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        toast.success('Your message has been sent successfully!');
      }, (err) => {
        console.error('FAILED...', err);
        toast.error('There was an error sending your message. Please try again later.');
      });

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      comment: ''
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-image">
        <img src="./contact1.png" alt="Contact Us" />
      </div>
      <div className="contact-form">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button                                         style={{ backgroundColor: '#065774' }}
 type="submit">Submit</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ContactUs;
