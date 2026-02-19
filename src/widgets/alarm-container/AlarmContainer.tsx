import { useEffect, useRef } from 'react';

export default function AlarmContainer() {
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const handleSseRequest = () => {
      const eventSource = new EventSource('/api/alarm/sub', {
        withCredentials: true,
      });

      eventSource.onopen = () => {
        console.log('SSE connection opened');
        eventSourceRef.current = eventSource;
      };

      eventSource.onerror = (event) => {
        console.error('SSE connection error:', event);
      };

      eventSource.addEventListener('SS_LEFT_10', () => {
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
