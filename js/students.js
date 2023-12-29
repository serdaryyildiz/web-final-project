import {getStudentsData} from "../js/storagelocal.js";
import { getCoursesOfStudent } from "../js/studentInfoData.js";
import { findCourseById } from "../js/coursedata.js";



export class Student{  //constructor class to manage student object
    
    constructor(name , surname , studentId){
        this.name = name;
        this.surname = surname;
        this.studentId = studentId;
    }

    getStudentName(){
        return this.name;
    }

    getStudentSurname(){
        return this.surname;
    }

    isStudentIdValid(studentID){
        let isValid = true;
        if(studentID <= 99999999 || studentID >= 1000000000){
            isValid = false
        }
        return isValid;
    }

    calculateStudentsAverage(studentId){
        const studentInfo = getCoursesOfStudent(studentId);
        let total = 0;
        if(studentInfo.length === 0){
            return "Student has not any course.";
        }
        for(let val = 0 ; val < studentInfo.length ; val++){
            const courseMidtermPercent = studentInfo[val].midtermPercent;
            const courseFinalPercent = 100 - courseMidtermPercent;
            const midterm = (studentInfo[val].midtermGrade * courseMidtermPercent) / 100;
            const final = (studentInfo[val].finalGrade * courseFinalPercent) / 100;
            total += (midterm + final); 
        }
        return (total / studentInfo.length);
    }

    findStudentsLetterGradeByTen(studentId , courseId){
        const course = findCourseById(courseId);
        
    }

    findStudentsLetterGradeBySeven(studentId){

    }

    toString() {
        return this.name + " " + this.surname ;
    }
}



