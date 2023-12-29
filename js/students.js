import {getStudentsData} from "../js/storagelocal.js";

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

    toString() {
        return this.name + " " + this.surname ;
    }
}



