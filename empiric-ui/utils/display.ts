/**
 * Returns the minutes and seconds between the current timestamp and the last updated one.
 * @param {number} currentTimestampSeconds the current time in seconds
 * @param  {number} lastUpdatedTimestamp the time of the update in seconds
 * @return {{number, number}}
 */
export function timeSinceUpdate(
  currentTimestampSeconds: number,
  lastUpdatedTimestamp: number
) {
  const minutesSinceUpdate = Math.floor(
    (currentTimestampSeconds - lastUpdatedTimestamp) / 60
  );
  const secondsSinceUpdate = Math.round(
    currentTimestampSeconds - lastUpdatedTimestamp - minutesSinceUpdate * 60
  );
  return { minutesSinceUpdate, secondsSinceUpdate };
}

/**
 * Capitalizes the first character of each word in a string
 * @param {string} str
 * @return {string}
 */
export function capitalize(str: string): string {
  return str.toLowerCase().replace(/\b\w{1}/g, (c) => c.toUpperCase());
}

/**
 * Converts a timestamp in seconds to current time
 * @param {number} time
 * @return {string}
 */
export function secondsToTime(time: number): string {
  const timeStr = new Date(time * 1000).toTimeString();
  return timeStr.slice(0, timeStr.indexOf("("));
}
