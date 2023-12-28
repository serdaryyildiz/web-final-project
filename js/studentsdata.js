import { getStudentsData , getStudentDataLength , getStudentsInfoData} from "../js/storagelocal.js";
import { Student } from "../js/students.js";

const studentsData = getStudentsData();
const studentsInfoData = getStudentsInfoData();

export function getStudentList(){
    var students = [];
    var student = getStudentsData();
    for(let i = 0 ; i < getStudentDataLength() ; i++){
        var arrayStudent = new Student(
            student[i].studentName ,
            student[i].studentSurname ,
            student[i].studentID
        )
        students.push(arrayStudent)
    }
    console.log(students);
    return students;
}
//This method returns student object with same ID.
function findStudentById(studentID){
    try{
        const students = getStudentList();
        for(let val = 0 ; val < getStudentList.length ; val++){
            if (studentID === students[val].studentId){
                return students[val];
            } else{
                console.log("bulunamadi");
                return "Student has not been found .";
            }
        }
    }  catch (err) {
        console.log("findStudentById error , error : \n" +err);
    }
}

//This method returns index of that student with same ID.
function findStudentByName(studentname){
    try{
        const students = getStudentList();
        for(let val = 0 ; val < students.length ; val++){
            if (studentname === students[val].name){
                return students[val];
            } else{
                console.log("bulunamadi");
                return "Student has not been found .";
                
            }
        }
    }catch(err){
        console.log("Find student by name error , error :\n" + err);
    }   
}

//This function creates new student with JSON format , then if student exist method returns a warning message .
//If student does not exists , we are pushing new student to student array from localStorage. 
function addStudent(studentName , studentSurname , studentID){
    try{
        if(isStudentIdValid){
            var newStudent = new Student(
                newStudent.name = studentName,
                newStudent.surname = studentSurname,
                newStudent.studentId = studentID
            )
            if(!doesStudentExist){
                studentsData.push(newStudent)
                localStorage.setItem("students" , JSON.stringify(studentsData));
                console.log(studentsData);
                return "New student added.";
            } else {
                console.log("student exist");
                return "Student alredy exist!";
            }
        } else {
            console.log("Student ID is not valid.");
            return "Student ID is not valid ! ";
        }
    } catch(err) {
        console.log("Add new student error , error :\n" +err);
    }
}

function doesStudentExist(studentID){       //This function checking Student with that ID is exists or not.
    let exist = false;
    const students = getStudentList();
    for(let i = 0 ; i < students.length ; i++){
        if(studentID === students[i].studentId){
            exist = true
        }
    }
    return exist;
}

function updateStudent(studentID, updatedName , updatedSurname) {
    try {
        const index = findStudentIndex(studentID);
        if (index !== -1) {     //index === -1 means that student has not found.
            studentsData[index] = {
                "studentName" : updatedName,
                "studentSurname" : updatedSurname,
                "studentID" : studentID                     // Student ID is unchangeable.
            };
            localStorage.setItem("students", JSON.stringify(studentsData));
            console.log("Student updated");
        } else {
            console.log("We couldn't find student . Please check Student ID.");
        }
        console.log(studentsData);
    } catch (err) {
        console.log("Update student error , error :\n" + err);
    }
}

export function createStudentTable(domElement) {
    const studentTable = domElement;
    const students = getStudentList();
    // Clear any existing table content
    studentTable.innerHTML = "";
  
    // Create the table header
    const headerRow = studentTable.insertRow();
    headerRow.insertCell().textContent = "Student ID";
    headerRow.insertCell().textContent = "Student Name";
    headerRow.insertCell().textContent = "Student Surname";
    headerRow.style.backgroundColor = "#303030";
    headerRow.style.color = "whitesmoke";
  
    // Iterate through students and create table rows
    for (let i = 0; i < students.length; i++) {
        const row = studentTable.insertRow();
        row.insertCell().textContent = students[i].studentId;
        row.insertCell().textContent = students[i].name;
        row.insertCell().textContent = students[i].surname;
        
        //Background color depends on index
        if (i % 2 === 1) {
          row.style.backgroundColor = "#B9B4C7";
          row.style.color = "49415c";
        } else {
          row.style.backgroundColor = "#49415c";
          row.style.color = "#B9B4C7";
        }
      }

    
  
    // Return table as a string
    return studentTable.innerHTML;
}