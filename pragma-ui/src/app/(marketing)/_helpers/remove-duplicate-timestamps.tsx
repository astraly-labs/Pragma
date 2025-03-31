import { TIME_ZONE } from "@/lib/constants";
import moment from "moment-timezone";

export const removeDuplicateTimestamps = (arr) => {
  const seenTimestamps = new Set();
  const result: any[] = [];
  for (const obj of arr) {
    const timestamp = moment.tz(obj.time, TIME_ZONE).valueOf();
    if (!seenTimestamps.has(timestamp)) {
      seenTimestamps.add(timestamp);
      result.push(obj);
    }
  }
  return result;
};
