import { useEffect, useState, useRef } from "react";
import { ref, onValue, push, set, query, orderByChild } from "firebase/database";
import {database} from "../utils/firebaseConfig.ts"
interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const userName =
    JSON.parse(localStorage.getItem("userInfo") || "{}")?.user_name || "Guest";

  useEffect(() => {
    const messagesRef = query(ref(database, "chatMessages"), orderByChild("timestamp"));
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = data
        ? Object.entries(data).map(([id, val]) => ({
            id,
            text: (val as any).text,
            sender: (val as any).sender,
            timestamp: (val as any).timestamp,
            
          }))
        : [];
      setMessages(loadedMessages);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const messagesRef = ref(database, "chatMessages");
    const newMsgRef = push(messagesRef);
    set(newMsgRef, {
      text: newMessage,
      sender: userName,
      timestamp: Date.now(),
    });
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col h-[400px] max-w-lg mx-auto border rounded-md shadow-lg p-4 bg-white dark:bg-gray-900 text-black dark:text-white">

      <div className="flex-grow overflow-y-auto mb-4 flex flex-col">
        {messages.length === 0 && (
          <p className="text-center text-gray-400">
            No messages yet. Say hi! 👋
          </p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 p-2 rounded w-fit max-w-[70%] ${
              msg.sender === userName
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white self-start"
            }`}
          >
            <p className="font-semibold">{msg.sender}</p>
            <p>{msg.text}</p>
            <small className="text-xs text-gray-500 block">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </small>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          placeholder="Type a message..."
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow p-2 border rounded-md bg-gray-100 dark:bg-gray-800"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-md disabled:opacity-50"
          disabled={!newMessage.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;