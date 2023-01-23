# Students Grades

## flask, json file, react redux typescript

The first thing we do is create a virtual environment.
If we don't have it install on our pc, we need to install it.
Make sure you are in the prject directory in the terminal.
Use the terminal and write this command:
`python -m pip install --user virtualenv `

To create it write in the terminal this:
`python -m virtualenv env`

To activate write this:
`env\Scripts\activate`

Than you need to install the requirements
use the cmd and write:
`pip install -r requirements.txt`

Next we initialize the app, the db and use CORS on the app:

    app = Flask(__name__)
    CORS(app)


Next, we create a list of students, that will hold the data from the server,
and will be updated when we add student/ update grade.

We have 2 end-points:
1. For GET and POST methods.
2. For PUT method.

The GET method calls the `load_data()` function that will read from the josn file and return us the 
students list from the json file.
The POST method gets the name and the email from the user, and set the grades to 0 at first.
The PUT method updates the grades of the students.
In addition, it only updates the correct grade without update the rest grades.

The next step is two connect the react with the server.
We create the file `env.ts`, and inside it we create variables for the urls of the server

    export const MY_SERVER_STUDENTS = 'http://127.0.0.1:5000/students/'
    export const MY_SERVER_GRADES = 'http://127.0.0.1:5000/grades/'

The next thing we Create a model folder, and inside it a Student class that will define the object type:

    export default class Student {
    student_id?: number
    sname: string = ""
    email: string = ""
    math?: number = 0
    english?: number = 0
    computers?: number = 0
}

In `studentSlice.ts` we have the async functions that call to the API.
In the `studentSlice.ts` We have function that call the server.
When we create a slicer(reducer) we need to update it in the `store.ts` file,
that is located in the `app` folder.

    export const store = configureStore({
    reducer: {
    student: studentsSlice,
    },
    });

The last thing we need to do, is to create GUI in the `Student.tsx` component.
We need to import the Async functions and the students list from the slicer.
The useEffect function is responsible for the update of the display when the length
of the students list changes.
 