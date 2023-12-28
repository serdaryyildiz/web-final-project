import { getStudentsData , getStudentDataLength , getStudentsInfoData} from "../js/storagelocal.js";
import { isStudentIdValid } from "../js/students.js";

const studentsData = getStudentsData();
const studentsInfoData = getStudentsInfoData();
const studentsDataLength = getStudentDataLength();



//This method returns student object with same ID.
function findStudentById(studentID){
    try{
        const selectedStudent = studentsData.find(student => student.studentID === studentID);
        return selectedStudent; 
    }catch(err){
        console.log("Find student by id error , error :\n" + err);
    }   
}

//This method returns index of that student with same ID.
function findStudentIndex(studentID){
    try{
        return studentsData.findIndex(student => student.studentID === studentID);
    }catch(err){
        console.log("Find student index error , error :\n" + err);
    }   
}

function getStudentInfos(studentID){
    try{ 
        const selectedStudent = studentsInfoData.find(student => student.studentID === studentID);
        return selectedStudent;
    }catch(err){
        console.log("Get Student infos error , error : \n" + err);
    }
}

function findStudentInfosIndex(studentID){
    try{
        return studentsInfoData.findIndex(student => student.studentID === studentID);
    }catch(err){
        console.log("Find student info index error , error : \n" + err);
    }
}

//This function creates new student with JSON format , then if student exist method returns a warning message .
//If student does not exists , we are pushing new student to student array from localStorage. 
function addNewStudent(studentName , studentSurname , studentID){
    try{
        if(isStudentIdValid){
            const newStudent = {
                "studentName" : studentName,
                "studentSurname" : studentSurname,
                "studentID" : studentID
            }
            if(!doesStudentExist){
                studentsData.push(newStudent)
                localStorage.setItem("students" , JSON.stringify(studentsData));
                console.log(studentsData);
                return "New student added.";
            } else {
                console.log("student exist");
                return "Student alredy exist!";
            }
        } else {
            console.log("Student ID is not valid.");
            return "Student ID is not valid ! ";
        }
    } catch(err) {
        console.log("Add new student error , error :\n" +err);
    }
}

function doesStudentExist(studentID){       //This function checking Student with that ID is exists or not.
    let exist = false;
    for(let i = 0 ; i < getStudentDataLength() ; i++){
        if(studentID === studentsData[i].studentID){
            exist = true
        }
    }
    return exist;
}

function updateStudent(studentID, updatedName , updatedSurname) {
    try {
        const index = findStudentIndex(studentID);
        if (index !== -1) {     //index === -1 means that student has not found.
            studentsData[index] = {
                "studentName" : updatedName,
                "studentSurname" : updatedSurname,
                "studentID" : studentID                     // Student ID is unchangeable.
            };
            localStorage.setItem("students", JSON.stringify(studentsData));
            console.log("Student updated");
        } else {
            console.log("We couldn't find student . Please check Student ID.");
        }
        console.log(studentsData);
    } catch (err) {
        console.log("Update student error , error :\n" + err);
    }
}