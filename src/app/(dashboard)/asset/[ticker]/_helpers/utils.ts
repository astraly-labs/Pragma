import { toZonedTime } from "date-fns-tz";

export const timezone = "Europe/London";

export const removeDuplicateTimestamps = (arr: any[]) => {
  const seenTimestamps = new Set<number>();
  const result: any[] = [];
  for (const obj of arr) {
    const timestamp = toZonedTime(new Date(obj.time), timezone).getTime();
    if (!seenTimestamps.has(timestamp)) {
      seenTimestamps.add(timestamp);
      result.push(obj);
    }
  }
  return result;
};
