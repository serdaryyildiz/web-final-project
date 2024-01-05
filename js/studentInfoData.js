import { findCourseById, getCourseList } from "../js/coursedata.js";
import { getStudentsInfoData , getStudentsInfoDataLength, setLocalStorage} from "../js/storagelocal.js";
import { findStudentById, findStudentsIndex } from "../js/studentsdata.js";


var studentInfo = [];
const courses = getCourseList();

//We are setting studentInfo array from localStorage
async function setStudentInfoList(){
    await setLocalStorage();
    var info = getStudentsInfoData();
    for(let i = 0 ; i < getStudentsInfoDataLength() ; i++){
        var arrayInfo = 
        {
            "studentId" : info[i].studentID,
            "studentCourseInfos" : info[i].studentCourseInfos
        }
        studentInfo.push(arrayInfo)
    }
}

setStudentInfoList();

export async function getStudentInfoList(){
    try {
        await setStudentInfoList();
        return studentInfo;
    } catch (err){
        console.log("stundent info list is empty , error : \n" , err);
    }
}


//This method returns students index at array
export function findStudentIndex(studentId) {
    try {
        const students = studentInfo;
        for (let val = 0; val < students.length; val++) {
            if (students[val].studentId === studentId) {
                return val;
            }
        }
       // console.log("Student has not been found");
        return -1; // If method can't find the student , it will return -1.
    } catch (err) {
        console.log("findStudentIndex error , err : \n" + err);
    }
}


//This method returns selected courses infos 
function findCourseInfosIndex(courseId , studentId){
    try {
        const studentInfo = studentInfo;
        const studentIndex = findStudentIndex(studentId);
        for(let val = 0 ; val < studentInfo[studentIndex].studentCourseInfos.length ; val++){
            if(studentInfo[studentIndex].studentCourseInfos[val].courseID === courseId){
                return val;
            }else {
                console.log("courseinfosindex has not been found")
                return -1;
            }
        }
    }catch(err){
        console.log("findCourseInfosIndex error , error : \n"+err);
    }
}

function findStudentInStudentInfos(studentId) {
    try {
        var studentInfo = studentInfo;
        for (let val = 0; val < studentInfo.length; val++) {
            if (studentInfo[val].studentId === studentId) {
                console.log("Student found:", studentInfo[val]);
                return studentInfo[val];
            }
        }
        console.log("Student not found.");
    } catch (err) {
        console.log("findStudentInStudentInfos error , error : \n", err);
    }
}

export function findCourseFromSelectedStudent(courseId , studentId){
    try{
        const student = findStudentInStudentInfos(studentId);
        if(student.studentCourseInfos.length !== 0){
            for(let val = 0 ; val < student.studentCourseInfos.length ; val++){
                if(student.studentCourseInfos[val].courseID === courseId){
                    return findCourseById(student.studentCourseInfos[val].courseID);
                }
            }
        }
    }catch(err){
        console.log("findCourseFromSelectedStudent error , error : \n" + err);
    }
}

export function getCourseInfosOfStudent(studentId){
    try{
        const studentsInfoList = studentInfo;
        console.log(studentId);
        console.log(studentsInfoList);
        for(let val = 0 ; val < studentsInfoList.length ; val++){
            if(studentsInfoList[val].studentID === studentId){
               return studentsInfoList[val].studentCourseInfos;
            }
        }
    }catch(err){
        console.log("getStudentsInfoList error , error : " , err);
    }
}

//Getting student from studentId , then iterating in studentCourseInfos at studentInfo.json file , then returns courses of student
//Also this method returms midterm and final grade of student . So i can calculate students average with this function. 

export function getCoursesOfStudent(studentId){
    try{
        let studentsInfo = studentInfo;
        var student = findStudentIndex(studentId);
        let courses = studentsInfo[student].studentCourseInfos;
        let courseInfos = []
        if(courses.length !== 0){
            for(let val = 0 ; val < courses.length ; val++){
                const courseAndGrades = {
                    "courseID" : studentsInfo[student].studentCourseInfos[val].courseID,
                    "midtermGrade" : studentsInfo[student].studentCourseInfos[val].midtermGrade,
                    "finalGrade" : studentsInfo[student].studentCourseInfos[val].finalGrade
                }
                courseInfos.push(courseAndGrades);
            }
            return courseInfos;
        }else{
            console.log("Student has not any courses");
        }
        return courseInfos;
    } catch(err){
        console.log("getCoursesOfStudent error , error : \n",err);
    }
}

export function getStudentCourseInfos(studentId){
    try{
        let student = findStudentIndex(studentId);
        if(student !== -1){
            return studentInfo[student].studentCourseInfos;
        }else{
            return -1;
        }
    }catch(err){
        console.log("getCourseInfos error , error : ",err);
    }
}

export function getGradesOfStudent(courseId , studentId){
    try{
        let students = studentInfo;
        var student = findStudentIndex(studentId);
        const courseList = students[student].studentCourseInfos;
        const length = courseList.length;
        for(let val = 0 ; val < length ; val++ ){
            if(courseId === courseList[val].courseID){
                return courseList[val];
            }
        }
        return "Student does not have that course";
    }catch(err){
        console.log("getGradesOfStudent error , error : " , err);
    }
}

//Iterating in studentInfo.json file and finding students of selected course.
export function getStudentsOfCourse(courseId){
    let students = [];
    for(let val = 0 ; val < studentInfo.length ; val++){
        for(let i = 0 ; i < studentInfo[val].studentCourseInfos.length ; i++){
            if(studentInfo[val].studentCourseInfos[i].courseID === courseId){
                students.push(findStudentById(studentInfo[val].studentId));
                break; //Breaking for loop because student can't take same course twice. If we found it , we don't need to loop anymore.
            }
        }
    }
    if(students.length === 0){
        return "Course does not have any student."
    }
    return students;
}

export function updateStudentsGrades(courseId , studentId , updatedMidterm , updatedFinal){
    try {
        var student = findStudentIndex(studentId);
        const courses = studentInfo[student].studentCourseInfos;
        if(!isGradeValid(updatedMidterm)){
            console.log("Unvalid midterm grade");
            return "Unvalid grade.";
        }
        if(!isGradeValid(updatedFinal)){
            console.log("Unvalid final grade");
            return "Unvalid grade.";
        }
        for(let val = 0 ; val < courses.length ; val++){
            if(courses[val].courseID === courseId){
                studentInfo[student].studentCourseInfos[val].midtermGrade = updatedMidterm;
                studentInfo[student].studentCourseInfos[val].finalGrade = updatedFinal;
                localStorage.setItem("studentInfos", JSON.stringify(studentInfo));
                console.log("updated " , studentInfo);
                return "Updated";
            }
        }
        return "Student does not have that course !";
    }catch(err){
        console.log("updateStudentsGrades error , error : \n"+err);
    }
}

export function addStudentToCourse(courseId , studentId , midtermGrade , finalGrade){
    try{
        var students = studentInfo;
        var student = findStudentIndex(studentId);
        const courses = students[student].studentCourseInfos;
        if(!isGradeValid(midtermGrade)){
            console.log("Unvalid midterm grade");
            return "Unvalid grade.";
        }
        if(!isGradeValid(finalGrade)){
            console.log("Unvalid final grade");
            return "Unvalid grade.";
        }
        console.log("buraya geldi");
        for(let val = 0 ; val < courses.length ; val++){
            if(courses[val].courseID === courseId){
                return "Student have this course already!";
            }
        }
        const info = 
        {
            "courseID": courseId,
            "midtermGrade": midtermGrade,
            "finalGrade": finalGrade
        }
        console.log(getCourseInfosOfStudent(studentId));
        studentInfo[student].studentCourseInfos.push(info);
        localStorage.setItem("studentInfos", JSON.stringify(studentInfo));
    }catch(err){
        console.log("addStudentToCourse error , error : " , err);
    }
}

function isGradeValid(grade){
    if(grade <= 100 && grade >= 0){
        return true;
    }
    return false;
}
//Code didn't worked 
// export async function createStudentsInfoTable(domElement){
//     const studentsInfo = studentInfo;
//     const studentList = students;
//     const courseList = courses;
//     const table = domElement;
//     table.innerHTML = "";

//     const headerRow = table.insertRow();
//     headerRow.insertCell().textContent = "Student ID";
//     headerRow.insertCell().textContent = "Student Name";
//     headerRow.insertCell().textContent = "Course Name";
//     headerRow.insertCell().textContent = "Midterm Grade" ;
//     headerRow.insertCell().textContent = "Final Grade";
//     headerRow.insertCell().textContent = "Average"

//     for(let val = 0 ; val < studentInfo.length ; val++){
//         const student = findStudentsIndex()
//         const row = table.insertRow();
//     }

//     for(let val = 0 ; val < studentsInfo[index].studentCourseInfos.length ; val++){
//         const thisCourse = findCourseById(studentsInfo[index].studentCourseInfos[val]);
       
//         row.insertCell().textContent = thisCourse.courseName;
//         row.insertCell().textContent = studentsInfo[index].studentCourseInfos[val].courseID;
//         row.insertCell().textContent = studentsInfo[index].studentCourseInfos[val].midtermGrade;
//         row.insertCell().textContent = studentsInfo[index].studentCourseInfos[val].finalGrade;
//         row.insertCell().textContent = thisCourse.acts;
//     }

//     return table;
// }

