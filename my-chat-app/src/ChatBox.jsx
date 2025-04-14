import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import "./style.css";

const users = {
  John: "https://randomuser.me/api/portraits/men/1.jpg",
  Sam: "https://randomuser.me/api/portraits/men/2.jpg",
  Joyse: "https://randomuser.me/api/portraits/women/1.jpg",
  Jin: "https://randomuser.me/api/portraits/men/3.jpg",
};

const sampleMessages = [
  {
    user: "John",
    text: "Hello, I'm John. \n How can I help you today?",
    time: "08:55",
    avatar: users["John"],
  },
  {
    user: "Sam",
    text: "Hi, John! \n I need more information about the Developer Plan.",
    time: "08:56",
    avatar: "https://www.bootdey.com/img/Content/avatar/avatar3.png",
  },
  {
    user: "John",
    text: "Are we meeting today?,\n Project has been already finished and I have results to show you.",
    time: "08:57",
    avatar: users["John"],
  },
  {
    user: "Joyse",
    text: "Well I am not sure. \n I have results to show you.",
    time: "08:59",
    avatar: users["Joyse"],
  },
  {
    user: "John",
    text: "The rest of the team is not here yet. maybe in an hour or so?",
    time: "09:00",
    avatar: users["John"],
  },
  {
    user: "Jin",
    text: "Have you faced any issues at the last phase of the project?",
    time: "09:01",
    avatar: users["Jin"],
  },
  {
    user: "John",
    text: "Actually everything was fine. \n I'm very excited to show this to our team.",
    time: "09:00",
    avatar: users["John"],
  },
];

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true); // For loading animation
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("John");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      const repeatedMessages = Array(1000).fill(sampleMessages).flat();
      setMessages(repeatedMessages);
      setLoading(false);
    }, 2000); // 2 seconds fake delay
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMsg = {
        user: currentUser,
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        avatar: users[currentUser],
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const formatMessageText = (text) =>
    text.split("\n").map((str, i) => (
      <span key={i}>
        {str}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    ));

  return (
    <div className="chat-container">
      <h5 className="text-left border-bottom pb-2">Project Communications</h5>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : (
        <>
          <div className="user-toggle mb-2">
            <button
              className="btn btn-primary"
              onClick={() => setCurrentUser(currentUser === "John" ? "Sam" : "John")}
            >
              Switch to {currentUser === "John" ? "Sam" : "John"}
            </button>
          </div>

          <ul className="chat-box chatContainerScroll">
            {messages.map((msg, index) => (
              <li key={index} className={msg.user === "John" ? "chat-left" : "chat-right"}>
                {msg.user === "John" ? (
                  <>
                    <div className="chat-avatar">
                      <img src={msg.avatar} alt={`${msg.user}'s Avatar`} className="avatar avatar-sm" />
                      <div className="chat-name">{msg.user}</div>
                    </div>
                    <div className="chat-text">{formatMessageText(msg.text)}</div>
                    <div className="chat-hour">
                      {msg.time} <span className="fa fa-check-circle px-1" aria-hidden="true"></span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="chat-hour">
                      {msg.time} <span className="fa fa-check-circle px-1" aria-hidden="true"></span>
                    </div>
                    <div className="chat-text">{formatMessageText(msg.text)}</div>
                    <div className="chat-avatar">
                      <img src={msg.avatar} alt={`${msg.user}'s Avatar`} className="avatar avatar-sm" />
                      <div className="chat-name">{msg.user}</div>
                    </div>
                    <div ref={messagesEndRef} />
                  </>
                )}
              </li>
            ))}
          </ul>

          <div className="chat-search-box">
            <textarea
              className="form-control"
              placeholder="Type your message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            ></textarea>
            <button className="input-group-btn btn" onClick={sendMessage}>
              SEND
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBox;
