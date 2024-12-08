import * as yup from "yup";

// Validation Schema
const editTaskSchema = yup.object().shape({
  id: yup.number().required(),
  title: yup
    .string()
    .required("Bắt buộc phải có tiêu đề")
    .min(5, "Tiêu đề phải có ít nhất 5 ký tự"),
  dueDate: yup.date().typeError("Ngày không hợp lệ").nullable(),
  priority: yup
    .string()
    .oneOf(["high", "medium", "low"], "Mức độ ưu tiên không hợp lệ")
    .required("Vui lòng thêm mức độ ưu tiên"),
  completed: yup.boolean().required(),
});

export type EditTaskSchemaDefaultValue = yup.InferType<typeof editTaskSchema>;

const editTaskSchemaDefaultValue: EditTaskSchemaDefaultValue = {
  id: 0,
  title: "",
  dueDate: null,
  priority: "low",
  completed: false,
};

export default editTaskSchema;

export { editTaskSchemaDefaultValue };
