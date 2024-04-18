import React,{useEffect,useState} from 'react'
import { VideoCallService } from './services/VideoCallService';

interface CallHistory {
  id: string;
  date: Date;
  participants: string[];
  duration: number;
}

const VideoCallScheduler: React.FC = () => {
  const [scheduledCalls, setScheduledCalls] = useState<Date[]>([]);
  const [callHistory, setCallHistory] = useState<CallHistory[]>([]);

  // Fetch scheduled calls on component mount
  useEffect(() => {
    fetchScheduledCalls();
    fetchCallHistory();
  }, []);

  // Function to fetch scheduled calls from API
  const fetchScheduledCalls = async () => {
    try {
      const scheduledCalls = await VideoCallService.fetchScheduledCalls();
      setScheduledCalls(scheduledCalls);
    } catch (error) {
      console.error('Error fetching scheduled calls:', error);
    }
  };

  // Function to fetch call history from API
  const fetchCallHistory = async () => {
    try {
      const callHistory = await VideoCallService.fetchCallHistory();
      setCallHistory(callHistory);
    } catch (error) {
      console.error('Error fetching call history:', error);
    }
  };

  // Function to schedule a new call
  const scheduleCall = async (date: Date) => {
    try {
      await VideoCallService.scheduleCall(date);
      fetchScheduledCalls(); // Refresh scheduled calls list
    } catch (error) {
      console.error('Error scheduling call:', error);
    }
  };

function VideoCallScheduleHistory() {
    return (
        <div>
             <div>
      <h2>Schedule a Video Call</h2>
      <button onClick={() => scheduleCall(new Date())}>Schedule Now</button>

      <h2>Scheduled Calls</h2>
      <ul>
        {scheduledCalls.map((callDate, index) => (
          <li key={index}>{callDate.toLocaleString()}</li>
        ))}
      </ul>

      <h2>Call History</h2>
      <ul>
        {callHistory.map((call, index) => (
          <li key={index}>
            {call.date.toLocaleString()} - Participants: {call.participants.join(', ')} - Duration: {call.duration} minutes
          </li>
        ))}
      </ul>
    </div>
  

        </div>
    )
}

export default VideoCallScheduleHistory
