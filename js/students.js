import {getCoursesOfStudent } from "../js/studentInfoData.js";




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
        const studentsInfo = getCoursesOfStudent(studentId);
        let total = 0;
        if(studentsInfo.length === 0){
            return "Its empty";
        }
        for(let val = 0 ; val < studentsInfo.length ; val++){
            const courseMidtermPercent = studentsInfo[val].midtermPercent;
            const courseFinalPercent = 100 - courseMidtermPercent;
            const midterm = (studentsInfo[val].midtermGrade * courseMidtermPercent) / 100;
            const final = (studentsInfo[val].finalGrade * courseFinalPercent) / 100;
            total += (midterm + final); 
        }
        return (total / studentsInfo.length);
    }










    toString() {
        return this.name + " " + this.surname ;
    }
}



