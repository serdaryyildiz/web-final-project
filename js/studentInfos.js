import { Courses } from "../js/courses.js";
import { Student } from "../js/students.js";

export class StudentInfos {
    
    constructor(studentId , courseId , midtermGrade , finalGrade){
        this.student = new Student(studentId);
        this.course = new Courses(courseId);
        this.midtermGrade = midtermGrade;
        this.finalGrade = finalGrade;
    }
}