import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { PriceData } from "../_types";

export const useEventSourceQuery = ({
  queryKey,
  url,
  eventName,
}: {
  queryKey: string;
  url: string;
  eventName: string;
}) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const eventSource = new EventSource(url);

    // console.log({ eventSource });

    eventSource.addEventListener(eventName, (event) => {
      const eventData = event.data && JSON.parse(event.data);

      // console.log({ eventData });

      if (eventData) {
        queryClient.setQueryData([queryKey], (oldData: PriceData[]) => {
          if (!oldData) return [eventData];
          return [...oldData, eventData];
        });
      }
    });
  }, []);
};
