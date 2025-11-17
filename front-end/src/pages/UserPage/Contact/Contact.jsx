import React, { useState } from 'react';
import './contact.css';

const Contact = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const occupationList = ["Engineer", "Doctor", "Designer", "Teacher"];

  const handleSubmit = (event) => {
    event.preventDefault();

    if (fullName.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
      alert('Vui lòng điền đầy đủ thông tin.');
    } else {
      const userName = fullName.split(' ')[0];
      alert(`Chào ${userName} ❤️. Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất!`);
      setFullName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setFormSubmitted(true);
    }
  };

  return (
    <div className="contact_container">
      <div className="contact_card">
        <h2>Contact Us</h2>
        <p className="subtitle">Chúng tôi sẵn sàng hỗ trợ bạn. Hãy gửi thông tin của bạn bên dưới!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          >
            <option value="" disabled>Select your profession</option>
            {occupationList.map((occ, idx) => (
              <option key={idx} value={occ}>{occ}</option>
            ))}
          </select>
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
        {formSubmitted && <p className="success">Form submitted successfully!</p>}
      </div>
    </div>
  );
};

export default Contact;
