import Student from "../../models/Student";
import axios from "axios";
import { MY_SERVER_GRADES, MY_SERVER_STUDENTS } from "../../env";

export const getStudents = async () => {
  return await axios.get(MY_SERVER_STUDENTS).then((res) => res.data);
}

export const addStudents = async (student:Student) => {
  return await axios.post(MY_SERVER_STUDENTS, student).then((res) => res.data);
}

export const updStudents = async (student:Student) => {
  console.log("API PUT")
  return await axios.put(MY_SERVER_GRADES + student.student_id, student).then((res) => res.data);
}
