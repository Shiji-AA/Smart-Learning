
//import Tutornavbar from "../../../Components/Tutor/Tutordashboard/Tutornavbar";
import ChatRoomTutor from '../../../Components/Tutor/ChatRoom/ChatRoomTutor';
import {SocketProvider} from '../../../Providers/SocketProvider';

function Chatroomtutor() {
    return (
        <div>
            <SocketProvider role="tutor">                        
                <ChatRoomTutor/> 
            </SocketProvider>
            
            
            
        </div>
    )
}

export default Chatroomtutor
