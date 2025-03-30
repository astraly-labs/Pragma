import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { PriceData } from "../_types";

export const useEventSourceQuery = ({
  queryKey,
  url,
  eventName,
  setHistorical,
  historical,
}: {
  queryKey: string;
  url: string;
  eventName: string;
  setHistorical: Dispatch<SetStateAction<PriceData[]>>;
  historical: PriceData[];
}) => {
  // const queryClient = useQueryClient();

  const fetchData = () => {
    const evtSource = new EventSource(url);

    evtSource.addEventListener(eventName, (event) => {
      const eventData = event.data && JSON.parse(event.data);

      setHistorical(historical ? [...historical, eventData] : [eventData]);

      // if (eventData) {
      //   queryClient.setQueryData([queryKey], eventData);
      // }
    });
  };

  // return useQuery({
  //   queryKey: [queryKey],
  //   queryFn: fetchData,
  // });
};
