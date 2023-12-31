import { getStudentsData , setLocalStorage} from "../js/storagelocal.js";
import { Student } from "../js/students.js";
import {  getCoursesOfStudent } from "../js/studentInfoData.js";


const studentList = []; 


export async function setStudentList(){
    try{
        await setLocalStorage();
        let student = getStudentsData();
        for(let i = 0 ; i < student.length ; i++){
            let arrayStudent = new Student(
                student[i].studentName ,
                student[i].studentSurname ,
                student[i].studentID
            )
            studentList.push(arrayStudent);
        }
    }catch(err){
        console.log("setStudentList error , error : \n" , err);
    } 
}

setStudentList();

export async function getStudentList(){
    try{
        await setStudentList();
        return studentList;
    } catch(err){
        console.log("student list is empty , error : \n" , err);
    }
}

function getStudentsGPA(studentId){
    const studentCourses = getCoursesOfStudent(studentId);
    const student = findStudentById(studentId);
    if(studentCourses.length !== 0){
        student.calculateStudentsAverage(studentId);
    }
}

//This method returns student object with same ID.
export function findStudentById(studentID){
    try{
        for(let val = 0 ; val < studentList.length ; val++){
            if (studentID === studentList[val].studentId){
                return studentList[val];
            }
        }
        return -1;
    }  catch (err) {
        console.log("findStudentById error , error : \n" ,err);
    }
}


//Method is returning array index from studentsList(global student array) of student.
export function findStudentsIndex(studentId){
    try{
        const students = studentList;
        console.log(studentId);
        for(let val = 0 ; val < students.length ; val++){
            if(studentId === students[val].studentId){
                return val;
            }
        }
        return -1;
    } catch (err) {
        console.log("findStudentIndex error , error : \n",err);
    }
}

//Method is checking students id is valid or not
function isStudentIdValid(studentID){
    let isValid = true;
    if(studentID <= 99999999 || studentID >= 1000000000){
        isValid = false
    }
    return isValid;
}


//This function creates new student with JSON format , then if student exist method returns a warning message .
//If student does not exists , we are pushing new student to student array from localStorage. 
export function addStudent(studentName, studentSurname, studentID) {
    try {
        if (isStudentIdValid(studentID)) {
            var newStudent = {
                "name": studentName,
                "surname": studentSurname,
                "studentId": studentID
            };
            
            if (!doesStudentExist(studentID)) {
                studentList.push(newStudent);
                localStorage.setItem("students", JSON.stringify(studentList));
                return newStudent;
            } else {
                return -1;
            }
        } else {
            console.log("Student ID is not valid.");
            return "Student ID is not valid!";
        }
    } catch (err) {
        console.log("Add new student error , error :\n", err);
    }
}

export function doesStudentExist(studentID){       //This function checking Student with that ID is exists or not.

    const result = findStudentById(studentID);

    console.log(result);
    if(result === -1){
        console.log("false");
        return false;
    } 
    console.log("true");
    return true;
}

//Deleting student 
export function deleteStudent(studentId){
    try{
        const index = findStudentsIndex(studentId);
        if(index !== -1){
            studentList.splice(index , 1);
            localStorage.setItem("students" , JSON.stringify(studentList));
        } else {
        }

    } catch(err) {
        console.log("deleteStudent error , error : \n",err);
    }
}

//This method shows students on the web page
export function createStudentTable(domElement) {
    getStudentsGPA();
    const studentTable = domElement;
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
    for (let i = 0; i < studentList.length; i++) {
        const row = studentTable.insertRow();
        row.insertCell().textContent = studentList[i].studentId;
        row.insertCell().textContent = studentList[i].name;
        row.insertCell().textContent = studentList[i].surname;
        
        
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

export function searchStudent(input){
    try{
        const results = []
        const students = studentList;
        for(let val = 0 ; val < students.length ; val++){
            if(students[val].studentId === input || students[val].studentName === input){
                results.push(students[val]);
            }
        }
        if(results.length === 0){
            return -1;
        }else{

            return results;
        }
    }catch(err){
        console.log("searchStudent error , error : \n" ,err);
    }
}

export function createSearchedStudentTable(domElement, searchResult) {
    const studentTable = domElement;
    const students = searchResult;
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
