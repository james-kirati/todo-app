export function formatDate(date: Date, format: string): string {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  let result = format.replace("yyyy", year);
  result = result.replace("MM", month);
  result = result.replace("dd", day);

  return result;
}

export const DATE_FORMAT = "yyyy-MM-dd";
