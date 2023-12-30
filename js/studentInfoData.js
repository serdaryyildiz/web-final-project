import { findCourseById } from "../js/coursedata.js";
import { getStudentsInfoData , getStudentsInfoDataLength} from "../js/storagelocal.js";
import { findStudentById } from "../js/studentsdata.js";

var studentInfo = [];
setStudentInfoList();

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
    console.log(studentInfo);
}
    
export function getStudentInfoList(){
    return studentInfo;
}

function findStudentIndex(studentId){
    try {
        const studentInfo = getStudentInfoList();
        for(let val = 0 ; val < studentInfo.length ; val++ ){
            if(studentInfo[val].studentID === studentId){
                return val;
            }else {
                console.log("findstudentindex has not been found");
                return -1;
            }
        }
    } catch (err){
        console.log("findStudentIndex error , err : \n"+err);
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

function findStudentInStudentInfos(studentId){
    try{
        const studentInfo = getStudentInfoList();
        for(let val = 0 ; val < getStudentsInfoDataLength() ; val++){
            if(studentInfo[val].studentID === studentId){
                return  studentInfo[val];
            }
        }
    } catch(err){
        console.log("findStudentInStudentInfos error , error : \n" +err);
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
        const student = findStudentInStudentInfos(studentId);
        if(student.studentCourseInfos.length !== 0){
            for(let val = 0 ; val < student.studentCourseInfos.lengt ; val++){
                const courseAndGrades = {
                    "course" : findCourseById(studentInfo[val].studentCourseInfos[i].courseID),
                    "midtermGrade" : studentInfo[val].studentCourseInfos[i].midtermGrade,
                    "finalGrade" : studentInfo[val].studentCourseInfos[i].finalGrade
                }
                courses.push(courseAndGrades);
            }
            return courses;
        }else{
            console.log(studentInfo[val] + " has not any courses");
        }
        return courses;
    } catch(err){
        console.log("getCoursesOfStudent error , error : \n"+err);
    }
}

//Iterating in studentInfo.json file and finding students of selected course.
export function getStudentsOfCourse(courseId){
    let studentInfo = getStudentInfoList();
    let students = [];
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
