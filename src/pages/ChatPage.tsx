import Chat from "../components/Chat/Chat";

const ChatPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 p-6">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
        Live Chat Support
      </h1>
      <Chat />
    </div>
  );
};

export default ChatPage;