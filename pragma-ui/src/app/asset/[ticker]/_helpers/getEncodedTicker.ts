export const getEncodedTicker = (ticker: string) => {
  const base = ticker.split("%2F")[0].toLowerCase();
  const quote = ticker.split("%2F")[1].toLowerCase();

  const encodedTicker = encodeURIComponent(`${base}/${quote}`);

  return encodedTicker;
};
