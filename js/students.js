import {getStudentsData} from "../js/storagelocal.js";
import { findCourseFromSelectedStudent, findCourseInfosOfSelectedStudent, getCoursesOfStudent } from "../js/studentInfoData.js";
import { findCourseById, getCourseMidtermPercent } from "../js/coursedata.js";
import { findStudentById } from "./studentsdata.js";



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



    //This method returns students general average points based by 100.
    calculateStudentsAverage(studentId){
        const studentInfo = getCoursesOfStudent(studentId);
        let total = 0;
        if(studentInfo.length === 0){
            return "Its empty";
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

    //This methojd return students letter grade by selected course (tenBased is a boolen)
    findStudentsLetterGrade(studentId , courseId , tenBased){
        const midtermPercent = getCourseMidtermPercent(courseId);
        const finalPercent = 100 - midterm;
        const info = findCourseInfosOfSelectedStudent(courseId , studentId);
        const average = ((info.midtermGrade * midtermPercent)/100) + ((info.finalGrade * finalPercent)/100);
        if(tenBased){
            return this.getLetterGradeByTen(average);
        }else{
            return this.getLetterGradeBySeven(average);
        }
    }

    //This method returns letters note from numerical grade (Decreasing 10 points)
    getLetterGradeByTen(grade){
        switch(grade){
            case (grade < 100 && grade >= 90):
                return "AA";
            case (grade < 90 && grade >= 80):
                return "BA";
            case (grade < 80 && grade >= 70):
                return "BB";
            case (grade < 70 && grade >= 60):
                return "BC";
            case (grade < 60 && grade >= 50):
                return "CC";
            case (grade < 50 && grade >= 40):
                return "CD";
            case (grade < 40 && grade >= 30):
                return "DD";
            default:
                return "FF";
        }
    }

    //This method returns letters note from numerical grade (Decreasing 7 points)
    getLetterGradeBySeven(grade){
        switch(grade){
            case (grade < 100 && grade >= 93):
                return "AA";
            case (grade < 93 && grade >= 86):
                return "BA";
            case (grade < 86 && grade >= 79):
                return "BB";
            case (grade < 79 && grade >= 72):
                return "BC";
            case (grade < 72 && grade >= 65):
                return "CC";
            case (grade < 65 && grade >= 58):
                return "CD";
            case (grade < 58 && grade >= 51):
                return "DD";
            default:
                return "FF";
        }
    }



    toString() {
        return this.name + " " + this.surname ;
    }
}



