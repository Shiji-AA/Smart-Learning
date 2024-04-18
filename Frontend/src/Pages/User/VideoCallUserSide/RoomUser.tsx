import {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function Room() {
    const { roomId } = useParams();
    const myMeeting = async () => {
        if (!roomId) {
            console.error('Room ID is undefined.');
            return;
        }

        const appID = 1090072839;
        const serverSecret = "dbe3987e0cfdb1a85e7f2080a888dff2";
        const kitToken = await ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), "Shijiaa");

        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: document.getElementById('meetingContainer'),
            sharedLinks:[
                {
                name:"Copy Link",
                url:`http://localhost:4000/room/${roomId}`,
                }
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: true,
        });
    };

    useEffect(() => {
        myMeeting();
    }, [roomId]);

    return (
        <div>         
        <div id="meetingContainer" />
        </div>
    );
}

export default Room;