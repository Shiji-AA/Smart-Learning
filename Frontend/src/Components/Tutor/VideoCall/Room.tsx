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

        const appID = 1461761191;
        const serverSecret = "97b3d19bcdafe3d637404a5b96b653a9";
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