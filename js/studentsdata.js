import { getStudentsData , getStudentDataLength , setLocalStorage} from "../js/storagelocal.js";
import { Student } from "../js/students.js";

var studentList = []; 

async function setStudentList(){
    try{
    await setLocalStorage();
    const students = [];
    let student = getStudentsData();
    console.log(getStudentDataLength());
    for(let i = 0 ; i < student.length ; i++){
        let arrayStudent = new Student(
            student[i].studentName ,
            student[i].studentSurname ,
            student[i].studentID
        )
        students.push(arrayStudent);
        studentList.push(arrayStudent);
    }
    console.log("studentlist : \n" ,studentList);
    return students;
    }catch(err){
        console.log("setStudentList error , error : \n" , err);
    } 
}

setStudentList();

export function getStudentList(){
    try{
        return setStudentList();
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
        console.log("bulunamadi");
        return -1;
    }  catch (err) {
        console.log("findStudentById error , error : \n" ,err);
    }
}

//This method returns index of that student with same ID.
function findStudentByName(studentname){
    try{
        const students = studentList;
        for(let val = 0 ; val < students.length ; val++){
            if (studentname === students[val].name){
                return students[val];
            }

        }
        console.log("bulunamadi");
        return "Student has not been found .";
    }catch(err){
        console.log("Find student by name error , error :\n" , err);
    }   
}

function isStudentIdValid(studentID){
    let isValid = true;
    if(studentID <= 99999999 || studentID >= 1000000000){
        isValid = false
    }
    return isValid;
}


//This function creates new student with JSON format , then if student exist method returns a warning message .
//If student does not exists , we are pushing new student to student array from localStorage. 
export function addStudent(studentName , studentSurname , studentID){
    try{
        const studentsData = studentList; 
        if(isStudentIdValid(studentID)){
            console.log("calisti1");
            var newStudent = {
                "name" : studentName,
                "surname" : studentSurname,
                "studentId" : studentID
            };
            console.log("calisti2");
            if(!doesStudentExist(studentID)){
                studentsData.push(newStudent)
                localStorage.setItem("students" , JSON.stringify(studentsData));
                console.log(studentsData);
                return newStudent;
            } else {
                console.log("student exist");
                return "Student alredy exist!";
            }
        } else {
            console.log("Student ID is not valid.");
            return "Student ID is not valid ! ";
        }
    } catch(err) {
        console.log("Add new student error , error :\n" ,err);
    }
}

function doesStudentExist(studentID){       //This function checking Student with that ID is exists or not.
    let result = findStudentById(studentID);
    if(result === -1){
        return false;
    } 
    return true;
}


//This method finds students index at studentList , changes it . Also we are updating localStorage .
function updateStudent(updatedName, updatedSurname , studentID) {
    try {
        const studentsData = studentList;
        const index = findStudentById(studentID);
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
    const students = studentList;
    console.log("tableCreating : \n" +students);
    // Clear any existing table content
    studentTable.innerHTML = "";
  
    // Create the table header
    const headerRow = studentTable.insertRow();
    headerRow.insertCell().textContent = "Student ID";
    headerRow.insertCell().textContent = "Student Name";
    headerRow.insertCell().textContent = "Student Surname";
    //headerRow.insertCell().textContent = "ACTS"
    headerRow.style.backgroundColor = "#303030";
    headerRow.style.color = "whitesmoke";
  
    // Iterate through students and create table rows
    for (let i = 0; i < students.length; i++) {
        const row = studentTable.insertRow();
        row.insertCell().textContent = students[i].studentId;
        row.insertCell().textContent = students[i].name;
        row.insertCell().textContent = students[i].surname;
        //row.insertCell().textContent = students[i].calculateStudentsAverage(students[i].studentId);
        
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

export function insertToStudentTable(domElement , name , surname , studentId){
    const studentTable = domElement;
    const row = studentTable.insertRow();
    addStudent(name , surname , studentId);
    row.insertCell().textContent = studentId;
    row.insertCell().textContent = name;
    row.insertCell().textContent = surname;
    //row.insertCell().textContent = newStudent.calculateStudentsAverage(studentId);
    
    const background = studentList.length - 1;  //This method will also return 
    //Background color depends on index
    if (background % 2 === 1) {
      row.style.backgroundColor = "#B9B4C7";
      row.style.color = "49415c";
    } else {
      row.style.backgroundColor = "#49415c";
      row.style.color = "#B9B4C7";
    }
    console.log(localStorage.getItem("students"));

}

// addStudent("asdasd" , "asdasd" , "1");
