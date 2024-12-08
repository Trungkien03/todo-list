import * as yup from "yup";

// Validation Schema
const addTaskSchema = yup.object().shape({
  title: yup
    .string()
    .required("Bắt buộc phải có tiêu đề")
    .min(5, "Tiêu đề phải có ít nhất 5 ký tự"),
  dueDate: yup.date().typeError("Ngày không hợp lệ").nullable(),
  priority: yup
    .string()
    .oneOf(["high", "medium", "low"], "Mức độ ưu tiên không hợp lệ")
    .required("Vui lòng thêm mức độ ưu tiên"),
});

type AddTaskSchemaDefaultValue = yup.InferType<typeof addTaskSchema>;

const addTaskSchemaDefaultValue: AddTaskSchemaDefaultValue = {
  title: "",
  dueDate: null,
  priority: "high",
};

export default addTaskSchema;

export { addTaskSchemaDefaultValue };
