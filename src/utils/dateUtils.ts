export class DateFormatter {
  /**
   * Format a given date to the format "dd/MM/yyyy"
   * @param date - The date to be formatted
   * @returns {string} - The formatted date string, or an empty string if the date is invalid
   */
  static formatToDDMMYYYY(date: Date | null): string {
    // Trả về chuỗi rỗng nếu date là null hoặc không hợp lệ
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  static removeTimeFromDate = (date: Date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây và milliseconds về 0
    return newDate;
  };
}
