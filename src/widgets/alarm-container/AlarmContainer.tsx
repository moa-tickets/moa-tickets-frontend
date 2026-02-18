import { useEffect, useRef, useState } from 'react';

export default function AlarmContainer() {
  const eventSourceRef = useRef<EventSource | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [sseMessageList, setSseMessageList] = useState([]);

  useEffect(() => {
    const handleSseRequest = () => {
      const eventSource = new EventSource('/api/alarm/sub', {
        withCredentials: true,
      });

      eventSource.onopen = () => {
        console.log('SSE connection opened');
        setIsConnected(true);
        eventSourceRef.current = eventSource;
      };

      eventSource.onerror = (event) => {
        console.error('SSE connection error:', event);
      };

      eventSource.addEventListener('CONNECT', () => {
        console.log('SSE CONNECT event received:');
      });
    };

    handleSseRequest();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, []);

  return <div></div>;
}
