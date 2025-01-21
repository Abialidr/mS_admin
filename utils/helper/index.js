import { v4 as uuidv4 } from "uuid";

export const formatDate = (d) => {
  return `${new Date(d).getDate()}-${new Date(d).getMonth() + 1}-${new Date(
    d
  ).getFullYear()}`;
};
export const getMonth = (d) => {
  switch (d) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr1";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Aug";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";

    default:
      break;
  }
};
export function getAllFileExtensions(filename) {
  const parts = filename.split(".");
  return parts.slice(-1); // Return all parts after the first one
}

export function formatDatezeroes(d) {
  // Split the input date string into parts (day, month, year)
  const dateStr = `${new Date(d).getDate()}-${
    new Date(d).getMonth() + 1
  }-${new Date(d).getFullYear()}`;
  const [day, month, year] = dateStr.split("-");

  // Ensure day and month are two digits using padStart
  const formattedDay = day.padStart(2, "0");
  const formattedMonth = month.padStart(2, "0");

  // Return the formatted date string
  return `${formattedDay}-${formattedMonth}-${year}`;
}

export function formatToThreeDigits(num) {
  // Convert the number to a string and use padStart to ensure it has three digits
  return num.toString().padStart(3, "0");
}

export const generateUniqueFilename = (file) => {
  const fileExtension = file.name.split(".").pop(); // Get file extension
  return `${uuidv4()}-${Date.now()}.${fileExtension}`;
};
