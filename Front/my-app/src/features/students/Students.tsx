import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getStudentsAsync,
  addStudentsAsync,
  updGradeAsync,
  StudentsList,
} from './studentsSlice';

export function Students() {
  const students = useAppSelector(StudentsList);
  const dispatch = useAppDispatch();
  const [sname, setsname] = useState("")
  const [email, setemail] = useState("")
  const [searchName, setsearchName] = useState("")
  const [subject, setsubject] = useState("")
  const [grade, setgrade] = useState(0)

  useEffect(() => {
    console.table(students)
    dispatch(getStudentsAsync())
  }, [students.length])
  return (
    <div>



      Name <input placeholder="Student's Name" onChange={(e) => setsname(e.target.value)} />
      Email <input placeholder="Student's email" onChange={(e) => setemail(e.target.value)} />
      <button onClick={() => dispatch(addStudentsAsync({ sname, email }))}>Add Student</button><br />
      <div>
        <h2>
          To Update Grade:<br />
          1.choose the student.<br />
          2. Choose the subject.<br />
          3. Type the grade.
        </h2>
        <input placeholder='Search By Name' onChange={(e) => setsearchName(e.target.value)} />
        <br />
        {students.filter(stu => stu.sname.toLowerCase().includes(searchName.toLowerCase())).map((stu, i) =>
          <div key={i}>
            <div >
              Name: {stu.sname}<br />
              Email: {stu.email}<br />
              <select onChange={(e) => setsubject(e.target.value)}>
                <option>Grades</option>
                <option value={'math'}>Math: {stu.math} </option>
                <option value={'english'}>English: {stu.english} </option>
                <option value={'computers'}>Computers: {stu.computers} </option>
              </select>
              <input placeholder='Enter Grade' style={{ width: '75px' }} onChange={(e) => setgrade(+e.target.value)} />
              {subject === 'math' ? <button onClick={() => dispatch(updGradeAsync({
                student_id: stu.student_id,
                sname: stu.sname,
                email: stu.email,
                math: grade
              }))}>Update Grade</button> :
                subject === 'english' ? <button onClick={() => dispatch(updGradeAsync({
                  student_id: stu.student_id,
                  sname: stu.sname,
                  email: stu.email,
                  english: grade
                }))}>Update Grade</button> :
                  <button onClick={() => dispatch(updGradeAsync({
                    student_id: stu.student_id,
                    sname: stu.sname,
                    email: stu.email,
                    computers: grade
                  }))}>Update Grade</button>

              }
              <hr />
            </div>
          </div>)}
      </div>
    </div>
  );
}
