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
    <div>
      <form onSubmit={handleRoomJoin}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Enter Room Code"
        />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}

export default OnlineCall;