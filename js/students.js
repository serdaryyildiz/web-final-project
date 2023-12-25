import database from '../js/database.js'
const database = require('../js/database.js');

function findStudentIndex(studentID){
    return index = students.findIndex((student) => student.studentId === studentId);
}

function isStudentIdValid(studentID){
    let isValid = true;
    if(studentID <= 99999999 || studentID >= 1000000000){
        isValid = false
    }
    return isValid;
}

function addStudent(name , surname , studentId){
    try{
        if(isStudentIdValid(studentId)){
            if(findStudentIndex(studentId) === -1){
                students.push({
                    studentName: name,
                    studentSurname: surname,
                    studentId: studentId
                });
                database
            }else{
                return "A student with same ID already exists.";
            }
        }else {
            return "Unvalid Student ID .";
        }
    }catch(err){
        return "An error has occured , error : " + err;
    }
}

function updateStudent(studentId , newName , newSurname){
    try{
        const studentsCopy = '../json/students.json' /* Before updating copying the file can let us handle updating errors*/
        const index = findStudentIndex(studentId);
        if(index !== -1){
            students[index].name = newName;
            students[index].surname = newSurname;
            saveJson(studentJsonFile , studentsCopy);
        }else{
            return "Student has not found , please try again.";
        }

    }catch (err){
        return "An error has occured , error : " + err;
    }

}

function deleteStudent(studentId){
    try{
        const index = findStudentIndex(studentId);
        if(index !== -1){
            students.splice(index);
            saveJson(studentJsonFile,students);
        }else {
            return "Student ID has not found , please try again.";
        }
    }catch(err){
        return "An error occupied , error :" + err;
    }
   
}

function studentGradesByTenths(courseId , studentId){
    const studentIndex = findStudentIndex(studentId);
    const courseIndex = findCourseIndex(courseId);
    if(studentIndex !== -1){
        if(courseIndex !== -1){
        }else{
            return "Course has not been found , please try again.";
        }
    }else{
        return "Student has not been found , please try again.";
    }
}


class student{  //constructor class to manage student object
    constructor(name , surname , studentId){
        this.name = name;
        this.surname = surname;
        this.studentId = studentId;
    }

    toString() {
        return this.name + " " + this.surname ;
    }
}
