import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function OnlineCall() {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");

  const handleRoomJoinCallback = useCallback(() => {
    navigate(`/room/${value}`);
  }, [navigate, value]);

  const handleRoomJoin = (e: React.FormEvent) => {
    e.preventDefault();
    // Invoke the callback function
    handleRoomJoinCallback();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Join Online Call
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRoomJoin}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            className="border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3 rounded-md shadow-sm"
            placeholder="Enter Room Code"
          />
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Join
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OnlineCall;
