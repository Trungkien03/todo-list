import { Todo } from "@app/types/todo";

interface DueDateStatus {
  text: string;
  color: string;
}

const getDueDateStatus = (item: Todo): DueDateStatus => {
  if (!item.dueDate) return { text: "", color: "" };

  const now = new Date();
  const dueDate = new Date(item.dueDate);

  const timeDifference = dueDate.getTime() - now.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference > 1)
    return { text: `Còn ${daysDifference} ngày`, color: "blue.500" };
  if (daysDifference === 1) return { text: "Ngày mai", color: "yellow.500" };
  if (daysDifference === 0) return { text: "Hôm nay", color: "yellow.500" };
  if (daysDifference === -1) return { text: "Hôm qua", color: "red.500" };
  if (daysDifference < -1)
    return {
      text: `Quá hạn ${Math.abs(daysDifference)} ngày`,
      color: "red.500",
    };

  return { text: "", color: "gray.500" };
};

export default getDueDateStatus;
