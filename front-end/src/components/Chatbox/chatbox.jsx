import React, { useState, useEffect, useRef } from 'react';
import './chatbox.css';
import { MdClose, MdMessage } from 'react-icons/md';
import { BiSolidUser, BiSend } from "react-icons/bi";

const Chatbox = () => {
    const [userMessage, setUserMessage] = useState('');
    const [messageHistory, setMessageHistory] = useState([
        { role: 'incoming', content: 'Hi there! How can I help you today?' }
    ]);
    const [showChatbot, setShowChatbot] = useState(false);

    const chatInputRef = useRef(null);
    const chatboxRef = useRef(null);
    const questionBoxRef = useRef(null);

    const predefinedQuestions = [
        "Mua hàng có được miễn phí vận chuyển không?",
        "Có sản phẩm giảm giá trong tháng này không?",
        "Sản phẩm này còn hàng không?"
    ];

    const appendMessageToChat = (role, content) => {
        setMessageHistory((prev) => [...prev, { role, content }]);
    };

    const sendMessageToAdmin = async (message) => {
        appendMessageToChat("outgoing", message);
        setUserMessage('');
        try {
            // Giả lập gửi tin nhắn lên server và nhận phản hồi admin
            const response = await fetch('http://localhost:3001/api/admin-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });
            const data = await response.json();
            appendMessageToChat("incoming", data.reply);
        } catch (err) {
            appendMessageToChat("incoming", "Admin hiện không trực tuyến. Vui lòng để lại lời nhắn.");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessageToAdmin(userMessage);
        }
    };

    const handleToggleChatbot = () => {
        setShowChatbot((prev) => !prev);
    };

    const handleSendClick = () => {
        sendMessageToAdmin(userMessage);
    };

    const handleQuestionClick = (selectedQuestion) => {
        sendMessageToAdmin(selectedQuestion);
        questionBoxRef.current.style.display = 'none';
    };

    useEffect(() => {
        const chatInput = chatInputRef.current;
        const questionBox = questionBoxRef.current;
        if (chatInput && questionBox) {
            chatInput.addEventListener('click', () => {
                questionBox.style.display = 'block';
            });
        }
    }, []);

    return (
        <div className={`Chatbox ${showChatbot ? 'show-chatbot' : ''}`}>
            <button className="chatbot-toggler" onClick={handleToggleChatbot}>
                <span><MdMessage /></span>
                <span><MdClose /></span>
            </button>
            <div className="chatbot">
                <header>
                    <h2>Chat với Admin</h2>
                    <span className="close-btn" onClick={handleToggleChatbot}><MdClose /></span>
                </header>
                <ul className="chatbox" ref={chatboxRef}>
                    {messageHistory.map((msg, i) => (
                        <li key={i} className={`chat ${msg.role}`}>
                            {msg.role === 'incoming' && <span><BiSolidUser /></span>}
                            <p>{msg.content}</p>
                        </li>
                    ))}
                </ul>
                <div className="chat-input">
                    <textarea
                        placeholder="Nhập tin nhắn..."
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        ref={chatInputRef}
                    />
                    <span className="send-btn" onClick={handleSendClick}><BiSend /></span>
                </div>
                <div className="question-box" ref={questionBoxRef}>
                    <ul className="question-list">
                        {predefinedQuestions.map((q, i) => (
                            <li key={i} className="question" onClick={() => handleQuestionClick(q)}>{q}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
