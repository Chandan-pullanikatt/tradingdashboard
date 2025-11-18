import { useEffect, useState, useRef } from "react";

/**
 * Custom React hook for receiving price updates via WebSocket.
 * @param {string} url - The WebSocket server URL.
 * @returns {Array} updates - Array of price update objects { symbol, price }
 */
export default function useWebSocket(url) {
  const [updates, setUpdates] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    function connect() {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setUpdates(data);
        } catch (err) {
          console.error("WS parse error:", err);
        }
      };

      ws.onclose = () => {
        console.log("Socket closed. Reconnecting...");
        setTimeout(connect, 2000);
      };
    }

    connect();

    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, [url]);

  return updates;
}
