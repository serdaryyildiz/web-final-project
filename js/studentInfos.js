import { findCoursetById } from "../js/coursedata.js";
import { findStudentById } from "../js/studentsdata.js";

export class StudentInfos {
    
    constructor(studentId , courseId , midtermGrade , finalGrade){
        this.student = findStudentById(studentId);
        this.course = findCoursetById(courseId);
        this.midtermGrade = midtermGrade;
        this.finalGrade = finalGrade;
    }
}