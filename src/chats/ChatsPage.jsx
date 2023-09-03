import ChatsHeader from "./ChatsHeader";
import Chats from "./Chats";

const ChatsPage = () => {
  return (
    <div className="hidden md:flex md:w-2/5 flex-col h-[661px]">
      <ChatsHeader />
      <Chats />
    </div>
  );
};

export default ChatsPage;
