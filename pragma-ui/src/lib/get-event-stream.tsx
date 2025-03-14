import { QueryClient } from "@tanstack/react-query";
import { EventSourcePolyfill } from "event-source-polyfill";

export function getEventStream({ url, queryKey, headers }) {
  return new Promise((resolve, reject) => {
    const [_key] = queryKey;
    const queryClient = new QueryClient();
    let eventSource = new EventSourcePolyfill(url, {
      withCredentials: true,
      headers,
      heartbeatTimeout: 60000, //Timeout
    });
    eventSource.addEventListener("SUCCESS", (e: any) => {
      const data = JSON.parse(e.data);
      if (e.lastEventId === "END") {
        queryClient.setQueryData(_key, data);
        eventSource.close();
        resolve(data); // Resolve promise with data
      } else {
        if (data) {
          queryClient.setQueryData(_key, data);
        }
      }
    });
    eventSource.addEventListener("error", (e) => {
      eventSource.close();
      reject(e); // Reject promise with error
    });
  });
}
