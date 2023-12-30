import { findCourseById } from "../js/coursedata.js";
import { getStudentsInfoData , getStudentsInfoDataLength} from "../js/storagelocal.js";
import { findStudentById } from "../js/studentsdata.js";


var studentInfo = [];

function setStudentInfoList(){
    var info = getStudentsInfoData();
    for(let i = 0 ; i < getStudentsInfoDataLength() ; i++){
        var arrayInfo = 
        {
            "studentId" : info[i].studentID,
            "studentDepartment" : info[i].studentDepartment,
            "studentCourseInfos" : info[i].studentCourseInfos
        }
        studentInfo.push(arrayInfo)
    }
    return studentInfo;
}

export function getStudentInfoList(){
    try {
        return studentInfo;
    } catch (err){
        console.log("stundent info list is empty , error : \n" , err);
    }
}

function findStudentIndex(studentId) {
    try {
        const studentInfo = getStudentInfoList();
        for (let val = 0; val < studentInfo.length; val++) {
            if (studentInfo[val].studentId === studentId) {
                return val;
            }
        }
        console.log("Student has not been found");
        return -1; // If method can't find the student , it will return -1.
    } catch (err) {
        console.log("findStudentIndex error , err : \n" + err);
    }
}

function findCourseInfosIndex(courseId , studentId){
    try {
        const studentInfo = getStudentInfoList();
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
        var studentInfo = getStudentInfoList();
        for (let val = 0; val < studentInfo.length; val++) {
            if (studentInfo[val].studentId === studentId) {
                console.log("Student found:", studentInfo[val]);
                console.log("Student 3 : " , studentInfo[3]);
                return studentInfo[val];
            }
        }
        console.log("asdasdasdasdasd\n" ,studentInfo);
        console.log("length : " +studentInfo.length);
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
        let studentInfo = getStudentInfoList();
        let courses = [];
        var student = findStudentIndex(studentId);
        if(courses.length !== 0){
            for(let val = 0 ; val < studentInfo[student].studentCourseInfos.length ; val++){
                const courseAndGrades = {
                    "course" : findCourseById(studentInfo[student].studentCourseInfos[val].courseID),
                    "midtermGrade" : studentInfo[student].studentCourseInfos[val].midtermGrade,
                    "finalGrade" : studentInfo[student].studentCourseInfos[val].finalGrade
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
    let studentInfo = getStudentInfoList();
    let students = [];
    console.log(getStudentsInfoDataLength());
    for(let val = 0 ; val < getStudentsInfoDataLength() ; val++){
        for(let i = 0 ; i < studentInfo[val].studentCourseInfos.length ; i++){
            if(studentInfo[val].studentCourseInfos[i].courseID === courseId){
                students.push(findStudentById(studentInfo[val].studentID));
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
        const studentInfoList = getStudentInfoList();
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

export function createStudentsInfoTable(studentId){
    const studentInfo = getStudentInfoList();
    //Clear any existing table content

}