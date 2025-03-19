export const getPublisherType = (type: number): string => {
  switch (type) {
    case 0:
      return "1st party";
    case 1:
      return "3rd party";
    default:
      return "Unknown";
  }
};
