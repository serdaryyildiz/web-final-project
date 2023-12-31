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
function findStudentIndex(studentId) {
    try {
        for (let val = 0; val < studentInfo.length; val++) {
            if (studentInfo[val].studentId === studentId) {
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
        for(let val = 0 ; val < studentInfo[studentIndex].studentCourseInfos.lengt ; val++){
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

export function findCourseInfosOfSelectedStudent(courseId , studentId){
    try{
        const student = findStudentInStudentInfos(studentId);
        if(student.studentCourseInfos.length !== 0){
            for(let val = 0 ; val < student.studentCourseInfos.length ; val++){
                if(student.studentCourseInfos[val].courseID === courseId){
                    const course = {
                        "courseID" : student.studentCourseInfos[val].courseID ,
                        "midtermGrade" : student.studentCourseInfos[val].midtermGrade,
                        "finalGrade" : student.studentCourseInfos[val].finalGrade
                    }
                    return course;
                }
            }
        }
    }catch(err){
        console.log("findCourseFromSelectedStudent error , error : \n" + err);
    }
}

//Getting student from studentId , then iterating in studentCourseInfos at studentInfo.json file , then returns courses of student
//Also this method returms midterm and final grade of student . So i can calculate students average with this function. 

export function getCoursesOfStudent(studentId){
    try{
        let studentsInfo = studentInfo;
        let courses = [];
        var student = findStudentIndex(studentId);
        if(courses.length !== 0){
            for(let val = 0 ; val < studentsInfo[student].studentCourseInfos.length ; val++){
                const courseAndGrades = {
                    "course" : findCourseById(studentsInfo[student].studentCourseInfos[val].courseID),
                    "midtermGrade" : studentsInfo[student].studentCourseInfos[val].midtermGrade,
                    "finalGrade" : studentsInfo[student].studentCourseInfos[val].finalGrade
                }
                courses.push(courseAndGrades);
            }
            return courses;
        }else{
            console.log("Student has not any courses");
        }
        return courses;
    } catch(err){
        console.log("getCoursesOfStudent error , error : \n",err);
    }
}

//Iterating in studentInfo.json file and finding students of selected course.
export function getStudentsOfCourse(courseId){
    let students = [];
    for(let val = 0 ; val < studentInfo.length ; val++){
        for(let i = 0 ; i < studentInfo[val].studentCourseInfos.length ; i++){
            if(studentInfo[val].studentCourseInfos[i].courseID === courseId){
                console.log("sirayla " ,findStudentById(studentInfo[val].studentId));
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
        const studentInfoList = studentInfo;
        const studentIndex = findStudentIndex(studentId);
        const courseIndex = findCourseInfosIndex(courseId);
        if(studentIndex !== -1){
            if(courseIndex !== -1){
                studentInfoList[studentIndex].studentCourseInfos[courseIndex] = {
                    "courseID" : courseId ,
                    "midtermGrade" : updatedMidterm,
                    "finalGrade" : updatedFinal
                };
                localStorage.setItem("studentInfos" , JSON.stringify(studentInfoList));
                console.log("Student grades has been updated.");
            }else{
                return "Course has not been found.";
            }
        }else{
            return "Student has not been found.";
        }

    }catch(err){
        console.log("updateStudentsGrades error , error : \n"+err);
    }
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

//     // for(let val = 0 ; val < studentsInfo[index].studentCourseInfos.length ; val++){
//     //     const thisCourse = findCourseById(studentsInfo[index].studentCourseInfos[val]);
//     //    
//     //     row.insertCell().textContent = thisCourse.courseName;
//     //     row.insertCell().textContent = studentsInfo[index].studentCourseInfos[val].courseID;
//     //     row.insertCell().textContent = studentsInfo[index].studentCourseInfos[val].midtermGrade;
//     //     row.insertCell().textContent = studentsInfo[index].studentCourseInfos[val].finalGrade;
//     //     row.insertCell().textContent = thisCourse.acts;
//     // }

//     return table;
// }

