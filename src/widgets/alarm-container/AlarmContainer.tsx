import { useEffect, useRef } from 'react';

export default function AlarmContainer() {
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const handleSseRequest = () => {
      const EventSourcePolyfill =
        (window as any).EventSourcePolyfill || EventSource;

      const eventSource = new EventSourcePolyfill(`/api/alarm/sub`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'text/event-stream',
        },
      });

      eventSource.onopen = () => {
        console.log('SSE connection opened');
        eventSourceRef.current = eventSource;
      };

      eventSource.onerror = (event: any) => {
        console.error('SSE connection error:', event);
      };

      eventSource.addEventListener('SS_ON_HOUR', (event: MessageEvent) => {
        console.log('Received message:', event.data);
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
