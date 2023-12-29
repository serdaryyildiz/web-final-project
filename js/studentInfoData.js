import { findCourseById } from "../js/coursedata.js";
import { getStudentsInfoData , getStudentsInfoDataLength} from "../js/storagelocal.js";
import { findStudentById } from "../js/studentsdata.js";

export function getStudentInfoList(){
    var studentInfo = [];
    var info = getStudentsInfoData();
    for(let i = 0 ; i < getStudentsInfoDataLength() ; i++){
        var arrayInfo = 
        {
            "studentId" : info[i].studentID,
            "studentDepartment" : info[i].studentDepartment,
            "studentCourseInfos" : info[i].studentCourseInfos
        }
        courses.push(arrayInfo)
    }
    console.log(studentInfo);
    return studentInfo;
}


function findStudentInStudentInfos(studentId){
    try{
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

export function getGradesOfCourse(studentId){
    
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