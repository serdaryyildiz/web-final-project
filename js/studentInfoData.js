import { findCourseById } from "../js/coursedata.js";
import { getStudentsInfoData , getStudentsInfoDataLength} from "../js/storagelocal.js";
import { findStudentById } from "../js/studentsdata.js";


const studentInfo = getStudentsInfoData();

export function getGradesOfCourse(studentId){
    
}

/* This method returns an array with courses and grades of a Student .*/
export function getCoursesOfStudent(studentId){
    let courses = [];
    for(let val = 0 ; val < getStudentsInfoDataLength() ; val++){
        if(studentInfo[val].studentID === studentId){
            if(studentInfo[val].studentCourseInfos.length !== 0){
                for(let i = 0 ; i < studentInfo[val].studentCourseInfos.length ; i++){ 
                    const courseAndGrades = {
                        "course" : findCourseById(studentInfo[val].studentCourseInfos[i].courseID),
                        "midtermGrade" : studentInfo[val].studentCourseInfos[i].midtermGrade,
                        "finalGrade" : studentInfo[val].studentCourseInfos[i].finalGrade
                    }
                    courses.push(courseAndGrades);
                }
            }else{
                console.log(studentInfo[val] + " has not any courses")
            }
            return courses;
        }
        console.log("Student has not been found");
        return "Student has not been found.";
    }
}

export function getStudentsOfCourse(courseId){
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