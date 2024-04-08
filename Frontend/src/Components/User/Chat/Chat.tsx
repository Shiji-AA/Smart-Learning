import React, { useState, useRef } from "react";

function Chat() {
  const [messages, setMessages] = useState([
    "Hey Mam, how's it going?",
    "Hi Alice! I'm good, Have you  finished your assignment.Any doubts?",
    // "That book sounds interesting! What's it about?",
    // "It's about an astronaut stranded on Mars, trying to survive. Gripping stuff!",
    // "I'm intrigued! Maybe I'll borrow it from you when you're done?",
    // "Of course! I'll drop it off at your place tomorrow.",
    // "Thanks, you're the best!",   
    // "Hoorayy!!",
    "Sure thing!"
  ]);
  const messagesEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your message submission logic here
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden items-center border border-gray-300 bg-gray-100">
      <div className="max-w-md w-full border border-gray-300">
        <header className="bg-blue-500 p-4 text-white rounded-t-lg">
          <h1 className="text-2xl font-semibold">Tutor</h1>
        </header>
        <div className="max-w-md w-full overflow-y-auto p-4 pb-36">
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <div key={index} className="flex mb-4 cursor-pointer">
                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                  <img
                    src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
                <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                  <p className="text-gray-700">{message}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
        </div>
      </div>

      <footer className="max-w-md w-full bg-gray-300 p-4 rounded-b-lg mt-0.2">
        <form className="flex items-center" onSubmit={handleSubmit}>
        <button
            type="button"
            className="p-2 text-gray-600 rounded-lg hover:text-gray-900 hover:bg-gray-100"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 18"
            >
              {/* Add button SVG content */}
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 18"
              >
                <path
                  fill="currentColor"
                  d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                />
              </svg>
            </svg>
          </button>

         
          <button
            type="button"
            className="p-2 text-gray-600 rounded-lg hover:text-gray-900 hover:bg-gray-100"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              {/* Add button SVG content */}
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
                />
              </svg>
            </svg>
          </button>

          <textarea
            rows="1"
            className="w-full max-w-xs p-2.5 text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your message..."
          ></textarea>

       <button
            type="submit"
            className="p-2 text-blue-700 rounded-full hover:bg-blue-200"
          >
            <svg
              className="w-5 h-5 rotate-90 rtl:-rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              {/* Add button SVG content */}
              <svg
                className="w-5 h-5 rotate-90 rtl:-rotate-90"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
              </svg>
            </svg>
          </button>

        </form>
      </footer>
    </div>
  );
}

export default Chat;
