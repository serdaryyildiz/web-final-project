import { getStudentsData , setLocalStorage} from "../js/storagelocal.js";
import { Student } from "../js/students.js";
import {  findCourseFromSelectedStudent, findStudentIndex, getCoursesOfStudent, getGradesOfStudent, getStudentCourseInfos } from "../js/studentInfoData.js";
import { findCourseById } from "./coursedata.js";


const studentList = [];

let byTen = true;

export function setByTen(bool){
    byTen = bool;
}

export function getByTen(){
    return byTen;
}


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
                console.log("Student already exists!");
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
    if(result === -1){
        console.log("false");
        return false;
    } 
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

//This methojd return students letter grade by selected course (tenBased is a boolen)
export function calculateStudentGrade(studentId , courseId){
    const studentGrades = getGradesOfStudent(courseId , studentId);
    //console.log(studentGrades);
    const course = findCourseById(courseId);
    const midterm = parseFloat(studentGrades.midtermGrade)
    const final = parseFloat(studentGrades.finalGrade);
    const midtermPercent = course.midtermPercent;
    const finalPercent = 100 - midtermPercent;
    const studentsAverage = ((midterm * midtermPercent) / 100) + ((final * finalPercent) / 100);
    if(byTen){
        return getLetterGradeByTen(studentsAverage);
    }else{
        return getLetterGradeBySeven(studentsAverage);
    }
}

//This method returns letters note from numerical grade (Decreasing 10 points)
function getLetterGradeByTen(grade) {
    if (grade <= 100 && grade >= 90) {
        return "AA";
    } else if (grade < 90 && grade >= 80) {
        return "BA";
    } else if (grade < 80 && grade >= 70) {
        return "BB";
    } else if (grade < 70 && grade >= 60) {
        return "CB";
    } else if (grade < 60 && grade >= 50) {
        return "CC";
    } else if (grade < 50 && grade >= 40) {
        return "DC";
    } else if (grade < 40 && grade >= 30) {
        return "DD";
    } else {
        return "FF";
    }
}

//This method returns letters note from numerical grade (Decreasing 7 points)
function getLetterGradeBySeven(grade) {
    if (grade < 100 && grade >= 93) {
        return "AA";
    } else if (grade < 93 && grade >= 86) {
        return "BA";
    } else if (grade < 86 && grade >= 79) {
        return "BB";
    } else if (grade < 79 && grade >= 72) {
        return "CB";
    } else if (grade < 72 && grade >= 65) {
        return "CC";
    } else if (grade < 65 && grade >= 58) {
        return "DC";
    } else if (grade < 58 && grade >= 51) {
        return "DD";
    } else {
        return "FF";
    }
}

function calculateStudentGPA(studentId){
    try{
       const studentInfo = getStudentCourseInfos(studentId);
       let totalPoints = 0;
       let totalActs = 0;
        if(studentInfo !== -1){
            for(let val = 0 ; val < studentInfo.length ; val++){
                const points = getNoteFromLetter(calculateStudentGrade(studentId , studentInfo[val].courseID));
                const course = findCourseById(studentInfo[val].courseID);
                const acts = parseInt(course.acts)
                totalPoints += points * acts;
                totalActs += acts;            
            }
            let gpa = (totalPoints / totalActs);
            return gpa.toFixed(2);
        }else{
            return "Student has not any courses."
        }
    }catch(err){
        console.log("calculateStudentGPA error , error : " , err);
    }
}

function getNoteFromLetter(letter){
    if(letter === "AA"){
        return 4.0;
    }else if(letter === "BA"){
        return 3.5;
    }else if(letter === "BB"){
        return 3.0;
    }else if(letter === "CB"){
        return 2.5;
    }else if(letter === "CC"){
        return 2.0;
    }else if(letter === "DC"){
        return 1.5;
    }else if(letter === "DD"){
        return 1.0;
    }else{
        return 0;
    }
}


//This method shows students on the web page
export function createStudentTable(domElement) {
    const studentTable = domElement;
    // Clear any existing table content
    studentTable.innerHTML = "";
  
    // Create the table header
    const headerRow = studentTable.insertRow();
    headerRow.insertCell().textContent = "Student ID";
    headerRow.insertCell().textContent = "Student Name";
    headerRow.insertCell().textContent = "Student Surname";
    headerRow.insertCell().textContent = "GPA";
    headerRow.style.backgroundColor = "#303030";
    headerRow.style.color = "whitesmoke";
  
    // Iterate through students and create table rows
    for (let i = 0; i < studentList.length; i++) {
        const row = studentTable.insertRow();
        row.insertCell().textContent = studentList[i].studentId;
        row.insertCell().textContent = studentList[i].name;
        row.insertCell().textContent = studentList[i].surname;
        row.insertCell().textContent = calculateStudentGPA(studentList[i].studentId);
        
        
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
            console.log(results);
            return results;
        }
    }catch(err){
        console.log("searchStudent error , error : \n" ,err);
    }
}

export function createSearchedStudentTable(domElement, searchedList) {
    const studentTable = domElement;
    const students = searchedList;
    // Clear any existing table content
    studentTable.innerHTML = "";

    // Create the table header
    const headerRow = studentTable.insertRow();
    headerRow.insertCell().textContent = "Student ID";
    headerRow.insertCell().textContent = "Student Name";
    headerRow.insertCell().textContent = "Student Surname";
    headerRow.insertCell().textContent = "GPA";
    headerRow.style.backgroundColor = "#303030";
    headerRow.style.color = "whitesmoke";

    // Iterate through students and create table rows
    for (let i = 0; i < students.length; i++) {
        const row = studentTable.insertRow();
        row.insertCell().textContent = students[i].studentId;
        row.insertCell().textContent = students[i].name;
        row.insertCell().textContent = students[i].surname;
        row.insertCell().textContent = calculateStudentGPA(students[i].studentId);

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
