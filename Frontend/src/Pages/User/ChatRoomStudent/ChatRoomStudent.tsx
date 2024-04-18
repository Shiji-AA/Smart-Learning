
import Chat from '../../../Components/User/Chat/Chat';
import {SocketProvider} from '../../../Providers/SocketProvider';

function ChatRoomStudent() {
    return (
        <div>
            <SocketProvider role="user">
            <Chat/>
            </SocketProvider>
          
        </div>
    )
}

export default ChatRoomStudent;
