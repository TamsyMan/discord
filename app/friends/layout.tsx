import Navbar from "../components/FriendsPanels/Navbar";
import Sidebar from "../components/FriendsPanels/Sidebar";
import ServerList from "../servers/[serverId]/channels/[channelId]/ServerList";

const RootLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className='h-screen w-screen flex bg-disc-lgray'>
      <ServerList/>
      <Sidebar/>
      <div className="flex flex-col w-full h-screen">
        <main>{children}</main>
      </div>
    </div>
  )
};

export default RootLayout;