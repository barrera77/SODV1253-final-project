import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useTickers, useTopGainers, useTopLosers } from "../hooks";
import { Stock } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const socket = io("http://localhost:3000");

const ChatPage = () => {
  const { data: tickers } = useTickers();
  const navigate = useNavigate();
  const { data: gainers } = useTopGainers();
  const { data: losers } = useTopLosers();
  const [messages, setMessages] = useState<string[]>([]);
  const [room, setRoom] = useState<string>("general"); // Manage current room
  const [availableRooms, setAvailableRooms] = useState<string[]>([
    "General",
    "AAPL",
    "TSLA",
    "crypto", // Default rooms
  ]);
  const messageInputRef = useRef<HTMLInputElement>(null); // For message input
  const roomInputRef = useRef<HTMLInputElement>(null); // For room creation input
  const messageListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setMessages([]);
    // Join the room when the component mounts or room changes
    socket.emit("join room", room);

    // Listen for messages from the current room
    socket.on("chat message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup listener on unmount or room change
    return () => {
      socket.off("chat message");
    };
  }, [room]); // Re-run effect when room changes

  useEffect(() => {
    // Scroll to bottom on new message
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = messageInputRef.current;
    if (input && input.value.trim()) {
      // Emit message to the current room
      socket.emit("chat message", { room, message: input.value });
      input.value = "";
    }
  };

  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRoom = e.target.value;
    setRoom(newRoom);
  };

  const handleCreateRoom = () => {
    const input = roomInputRef.current;
    if (input && input.value.trim()) {
      const newRoom = input.value.trim();
      // Add new room to the list of available rooms
      setAvailableRooms((prevRooms) => [...prevRooms, newRoom]);
      // Switch to the new room
      setRoom(newRoom);
      // Clear input field after creating the room
      input.value = "";
      alert(`Room "${newRoom}" created successfully!`);
    } else {
      alert("Please enter a valid room name.");
    }
  };

  /**
   * Shorten the text for display purposes
   * @param text
   * @param maxLength
   * @returns
   */
  const truncateText = (text: string, maxLength: number = 20) => {
    if (!text) return "N/A"; // Handle empty names
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="container m-auto lg:w-[85%] py-5">
      <div className="announcements flex mt-[.5rem] border-t border-b border-[#0b022d]">
        <div className="announcements-content pt-[.5rem]">
          <div>
            <ul className="flex items-center">
              {tickers.map((ticker, index) => (
                <li key={ticker.symbol || index} className="text-[13px]">
                  <strong>{ticker.symbol} </strong>
                  {ticker.lastsale}{" "}
                  <span
                    className={
                      ticker.netchange >= 0 ? "text-green-500" : "text-red-500"
                    }
                  >
                    {ticker.netchange}
                  </span>
                  ({ticker.pctchange})
                  {index < tickers.length - 1 && (
                    <span className="mx-2">|</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="announcements-content pt-[.5rem]">
          <div>
            <ul className="flex items-center">
              {tickers.map((ticker, index) => (
                <li key={ticker.symbol || index} className="text-[13px]">
                  <strong>{ticker.symbol} </strong> {ticker.lastsale}{" "}
                  {ticker.netchange}({ticker.pctchange})
                  {index < tickers.length - 1 && (
                    <span className="mx-2">|</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="text-start m-4">
        <button
          onClick={() => navigate(-1)}
          className="btn flex gap-2 items-center justify-center border border-[#0b022d] hover:bg-[#fff] bg-[#0b022d] hover:text-[#0b022d] text-[#fff]"
        >
          <FaArrowLeft />
          <span>Back to dashboard</span>
        </button>
      </div>
      {/* Chat interface */}
      <div className="py-5 h-[70vh] bg-gray-100 w-full">
        <div className="flex h-[100%] justify-center gap-[2rem]">
          <div className="flex flex-col w-[60%] h-[100%] bg-white shadow-lg overflow-hidden border border-[#0b022d] ">
            {/* Room selection */}
            <div className="p-4 bg-gray-100 border-b">
              <div>
                <select
                  value={room}
                  onChange={handleRoomChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none cursor-pointer"
                >
                  {availableRooms.map((roomOption, index) => (
                    <option key={index} value={roomOption}>
                      {roomOption}
                    </option>
                  ))}
                </select>
              </div>

              {/* Input to create a new room */}
              <div className="mt-2">
                <input
                  ref={roomInputRef}
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
                  placeholder="Enter new room name"
                />
                <button
                  onClick={handleCreateRoom}
                  className="w-full mt-2 bg-[#0b022d] text-white px-4 py-2 rounded-md hover:bg-white border border-[#0b022d] hover:text-[#0b022d] cursor-pointer"
                >
                  Create Room
                </button>
              </div>
            </div>

            {/* Messages display */}
            <ul
              ref={messageListRef}
              className="flex-1 overflow-y-auto p-4 space-y-2"
            >
              {messages.map((msg, i) => (
                <li
                  key={i}
                  className={`p-2 rounded max-w-[80%] w-fit text-left ${
                    i % 2 === 0
                      ? "bg-gray-200 self-start"
                      : "bg-gray-300 self-start"
                  }`}
                >
                  {msg}
                </li>
              ))}
            </ul>

            {/* Message input form */}
            <form
              onSubmit={handleSubmit}
              className="flex p-2 border-t border-[#0b022d] bg-gray-50"
            >
              <input
                ref={messageInputRef}
                autoComplete="off"
                className="flex-grow px-4 py-2 rounded-full mr-2 border border-gray-300 focus:outline-none"
                placeholder={`Message in "${room}"`}
              />
              <button
                type="submit"
                className="bg-[#0b022d] text-white px-4 py-2 rounded-md hover:bg-white border border-[#0b022d] hover:text-[#0b022d] "
              >
                Send
              </button>
            </form>
          </div>
          {/* right column */}
          <div>
            <div className="p-[1rem] border">
              <div className="mb-3">
                <h2 className="text-start font-semibold ">
                  Top 5 Daily Losers
                </h2>
              </div>
              <ul>
                {losers.slice(0, 5).map((stock: Stock) => (
                  <li
                    key={stock.symbol}
                    className="text-sm py-1 border-b border-dashed"
                  >
                    <div className="flex justify-between">
                      <Link
                        to={`/details/${stock.symbol}`}
                        className="text-blue-500 text-sm hover:underline"
                      >
                        {stock.symbol}
                      </Link>
                      <span>{stock.regularMarketPrice}</span>
                    </div>
                    <div className="flex justify-between text-[12px]">
                      <span>{truncateText(stock.shortName, 20)}</span>
                      <span className="text-red-700">
                        - {stock.regularMarketChange} (-
                        {stock.regularMarketChangePercent}%)
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-[1rem] border">
              <div className="mb-3">
                <h2 className="text-start font-semibold ">
                  Top 5 Daily Gainers
                </h2>
              </div>
              <ul>
                {gainers.slice(0, 5).map((stock: Stock) => (
                  <li
                    key={stock.symbol}
                    className="text-sm py-1 border-b border-dashed"
                  >
                    <div className="flex justify-between">
                      <Link
                        to={`/details/${stock.symbol}`}
                        className="text-blue-500 text-sm hover:underline"
                      >
                        {stock.symbol}
                      </Link>
                      <span>{stock.regularMarketPrice}</span>
                    </div>
                    <div className="flex justify-between text-[12px]">
                      <span className="text-gray-400 text-[13px]">
                        {truncateText(stock.shortName, 20)}
                      </span>
                      <span className="text-green-700">
                        + {stock.regularMarketChange} (+
                        {stock.regularMarketChangePercent}%)
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

/* import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const ChatPage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [room, setRoom] = useState<string>("general"); // Manage current room
  const inputRef = useRef<HTMLInputElement>(null);
  const messageListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Join the room when the component mounts or room changes
    socket.emit("join room", room);

    // Listen for messages from the current room
    socket.on("chat message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup listener on unmount or room change
    return () => {
      socket.off("chat message");
    };
  }, [room]); // Re-run effect when room changes

  useEffect(() => {
    // Scroll to bottom on new message
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = inputRef.current;
    if (input && input.value.trim()) {
      // Emit message to the current room
      socket.emit("chat message", { room, message: input.value });
      input.value = "";
    }
  };

  const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRoom = e.target.value;
    setRoom(newRoom);
  };

  return (
    <div className="container m-auto lg:w-[85%] py-5">
      <div className="flex items-center justify-center py-5 h-[70vh] bg-gray-100">
        <div className="flex flex-col w-full max-w-md h-[100%] bg-white rounded-lg shadow-lg overflow-hidden">
        
          <div className="p-4 bg-gray-100 border-b">
            <div>
              <select
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              >
                <option value="general">General</option>
                <option value="AAPL">AAPL</option>
                <option value="TSLA">TSLA</option>
                <option value="crypto">Crypto</option>
              </select>
            </div>

            <input
              type="text"
              value={room}
              onChange={handleRoomChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter room name (e.g., TSLA, AAPL, general)"
            />
          </div>

         
          <ul
            ref={messageListRef}
            className="flex-1 overflow-y-auto p-4 space-y-2"
          >
            {messages.map((msg, i) => (
              <li
                key={i}
                className={`p-2 rounded ${
                  i % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
                }`}
              >
                {msg}
              </li>
            ))}
          </ul>

      
          <form
            onSubmit={handleSubmit}
            className="flex p-2 border-t border-gray-300 bg-gray-50"
          >
            <input
              ref={inputRef}
              autoComplete="off"
              className="flex-grow px-4 py-2 rounded-full mr-2 border border-gray-300 focus:outline-none"
              placeholder={`Message in "${room}"`}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage; */

/* import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const ChatPage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    socket.on("chat message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom on new message
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = inputRef.current;
    if (input && input.value.trim()) {
      socket.emit("chat message", input.value);
      input.value = "";
    }
  };

  return (
    <div className="container m-auto lg:w-[85%] py-5">
      <div className="flex items-center justify-center py-5 h-[70vh] bg-gray-100">
        <div className="flex flex-col w-full max-w-md h-[100%] bg-white rounded-lg shadow-lg overflow-hidden">
          <ul
            ref={messageListRef}
            className="flex-1 overflow-y-auto p-4 space-y-2"
          >
            {messages.map((msg, i) => (
              <li
                key={i}
                className={`p-2 rounded ${
                  i % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
                }`}
              >
                {msg}
              </li>
            ))}
          </ul>

          <form
            onSubmit={handleSubmit}
            className="flex p-2 border-t border-gray-300 bg-gray-50"
          >
            <input
              ref={inputRef}
              autoComplete="off"
              className="flex-grow px-4 py-2 rounded-full mr-2 border border-gray-300 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
 */
