import React, { useState } from 'react';
import './contact.css';

const Contact = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [showOccupationList, setShowOccupationList] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (fullName.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
            alert('Vui lòng điền đầy đủ thông tin.');
        } else {
            const userName = fullName.split(' ')[0];
            alert(`Chào ${userName} <3. Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất!`);
            setFullName('');
            setEmail('');
            setSubject('');
            setMessage('');
            setFormSubmitted(true);
        }
    };

    const handleSubjectClick = () => {
        setShowOccupationList(true); // Hiển thị danh sách nghề nghiệp khi người dùng click vào Subject
    };

    const occupationList = ["Engineer", "Doctor", "Designer", "Teacher"]; // Danh sách nghề nghiệp (bạn có thể thay đổi nội dung)

    return (
        <>
            <div className='contact_container'>
                <div className='contant'>
                    <h2>contact us</h2>
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <input type='text' name='Name' value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='Enter Your Full Name' required autoComplete='off'></input>
                            <input type='email' name='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your E-mail' autoComplete='off'></input>
                            <input type='text' name='Subject' value={subject} onClick={handleSubjectClick} onChange={(e) => setSubject(e.target.value)} placeholder='Enter your profession' autoComplete='off'></input>
                            {showOccupationList && (
                                <select onChange={(e) => setSubject(e.target.value)} value={subject}>
                                    <option value='' disabled>Select an occupation</option>
                                    {occupationList.map((occupation, index) => (
                                        <option key={index} value={occupation}>{occupation}</option>
                                    ))}
                                </select>
                            )}
                            <textarea name='Message' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Your Message' autoComplete='off'></textarea>
                            <button type='submit'>send</button>
                        </form>
                    </div>
                </div>
            </div>
            <center>{formSubmitted && <p>Form submitted successfully!</p>}</center>
        </>
    );
};

export default Contact;