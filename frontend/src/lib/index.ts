export function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);

  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
}
