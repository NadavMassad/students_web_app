import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import Student from '../../models/Student';
import { addStudents, getStudents, updStudents } from './studentsAPI';

export interface CounterState {
  students: Student[]
}

const initialState: CounterState = {
  students: [],
};

export const getStudentsAsync = createAsyncThunk(
  'student/getStudents',
  async () => {
    const response = await getStudents();
    return response;
  }
);
export const addStudentsAsync = createAsyncThunk(
  'student/addStudents',
  async (student: Student) => {
    const response = await addStudents(student);
    return response;
  }
);

export const updGradeAsync = createAsyncThunk(
  'student/updStudents',
  async (student: Student) => {
    const response = await updStudents(student);
    return response;
  }
);

export const studentsSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getStudentsAsync.fulfilled, (state, action) => {
      state.students = action.payload
    })
      .addCase(addStudentsAsync.fulfilled, (state, action) => {
        state.students.push(action.payload)
      })
      .addCase(updGradeAsync.fulfilled, (state, action) => {
        let temp = state.students.filter(stu => stu.student_id === action.payload.student_id)[0]
        'math' in temp ? temp.math = action.payload.math : 
        'english' in temp ? temp.english = action.payload.english :
        temp.computers = action.payload.computers
        getStudentsAsync()
      });
  },
});

export const StudentsList = (state: RootState) => state.student.students;
export default studentsSlice.reducer;
