import {getCourseData , getCourseDataLength, setLocalStorage} from "../js/storagelocal.js";
import { Course } from "./courses.js";
import { getGradesOfStudent, getStudentsOfCourse } from "./studentInfoData.js";
import { calculateStudentGrade } from "./studentsdata.js";

var coursesList = [];

async function setCourseList() {
    try {

        await setLocalStorage();
  
        const courseData = getCourseData(); //we need data first.   
        for (let i = 0; i < getCourseDataLength(); i++) {
        const arrayCourse = new Course(
            courseData[i].courseName,
            courseData[i].courseID,
            courseData[i].lecturer,
            courseData[i].midtermPercent,
            courseData[i].acts
        );
        coursesList.push(arrayCourse);
      }
    } catch (err) {
      console.log("setCourseList error, error: \n", err);
    }
}

setCourseList();
  export function getCourseList() {
    try {
      return coursesList;
    } catch (err) {
      console.log("course list is empty, error: \n" + err);
    }
  }

//This method returns course object with same ID.
export function findCourseById(courseID){
    try{
        const courses = coursesList;
        for(let val = 0 ; val < courses.length ; val++){
            if (courseID === courses[val].courseID){
                return courses[val];
            }
        }
        return "Course has not been found.";
    }  catch (err) {
        console.log("findCoursetById error , error : \n" +err);
    }
}

//This method returns index of that course with same ID.
export function findCourseIndex(courseID){
    for(let val = 0 ; val < coursesList.length ; val++){
        if(coursesList[val].courseID === courseID){
            return val;
        }
    }
    return -1;
}



//This function implements a new course by JSON format , then checks this course with same id exist or not .
//If it does not exists , this method pushes new course to the Courses Array from localStorage .
//If lecture is already exists , method returns a warning message.

export function addNewCourse(courseName , courseID  , lecturer , midtermPercent , acts){
    try{
            const newCourse = 
            {
                "courseName" : courseName,
                "courseID" : courseID,
                "lecturer" : midtermPercent,
                "midtermPercent" : lecturer,
                "acts" : acts
            }
            if(courseID.length < 4 || courseID.length > 12){
                console.log("Invalid course ID");
                return "Unvalid input";
            }
            
            if(acts <= 0 || acts > 10){
                console.log("Invalid acts");
                return "Unvalid input";
            }
            if(!doesCourseExist(courseID)){
                coursesList.push(newCourse);
                console.log("Course Added");
                localStorage.setItem("courses" , JSON.stringify(coursesList));
                return "New course added.";
            }else {
                console.log("Course Already Exists");
                return "Course already exists!";
            }
    }catch(err){
        console.log("Course Add error , error : \n" , err);
    }
}

function doesCourseExist(courseID){         //This function checking Course with that ID is exists or not.
    let exist = false;
    const courses = coursesList;
    for(let i = 0 ; i < courses.length ; i++){
        if(courseID === courses[i].courseID){
            exist = true;
        }
    }
    return exist;
}

//This function gets course index , and makes changes .
export function updateCourse(courseID , updatedCourseName , midtermPercent , lecturer , acts){    
    try{
        console.log("claistim1");
        const index = findCourseIndex(courseID);
        console.log(index);
        if(index === -1){
            return "Course has not found.";
        }
        console.log("calistim2");
        coursesList.splice(index , 1);
        const updatedCourse = {
            "courseName" : updatedCourseName,
            "courseID" : courseID,
            "lecturer" : midtermPercent,
            "midtermPercent" : lecturer,
            "acts" : acts
        }
        coursesList.splice(index , 0 , updatedCourse);
        localStorage.setItem("courses" , JSON.stringify(coursesList));
    } catch (err) {
        console.log("Update course error , error :\n " +err);
    }
}

export function deleteCourse(courseID){
    try{
        const index = findCourseIndex(courseID);
        
        if(index === -1){
            return "Course has not found , please try again.";
        }
        coursesList.splice(index , 1);
        localStorage.setItem("courses" , JSON.stringify(coursesList));
    }catch(err){
        console.log("deleteCourse error , error :\n" , err);
    }
}

export function getCourseMidtermPercent(courseId){
    try{
        const course = findCourseById(courseId);
        return course.midtermPercent;
    }catch (err){
        console.log("getCourseMidtermPercent error , error : \n" +err);
    }
}

export function createCourseTable(domElement){
    const courseTable = domElement;
    const courses = coursesList;
    //Clearing table HTML
    courseTable.innerHTML = "";

    //Table header
    const headerRow = courseTable.insertRow();
    headerRow.insertCell().textContent = "Course ID";
    headerRow.insertCell().textContent = "Course Name";
    headerRow.insertCell().textContent = "Lecturer";
    headerRow.insertCell().textContent = "Midterm Percent";
    headerRow.insertCell().textContent = "ACTS";
    headerRow.style.backgroundColor = "#303030";
    headerRow.style.color = "whitesmoke";

    // Iterate through courses and create table rows
    for (let i = 0; i < courses.length; i++) {
        const row = courseTable.insertRow();
        row.insertCell().textContent = courses[i].courseID;
        row.insertCell().textContent = courses[i].courseName;
        row.insertCell().textContent = courses[i].lecturer;
        row.insertCell().textContent = courses[i].midtermPercent + "%";
        row.insertCell().textContent = courses[i].acts;
        
        //Background color depends on index
        if (i % 2 === 1) {
          row.style.backgroundColor = "#B9B4C7";
          row.style.color = "49415c";
        } else {
          row.style.backgroundColor = "#49415c";
          row.style.color = "#B9B4C7";
        }
      }
      return courseTable.innerHTML;
}

export function insertToCoursesTable(domElement , courseName , courseID , midtermPercent , lecturer , acts){
    const courseTable = domElement;
    const row = courseTable.insertRow();
    row.insertCell().textContent = courseName;
    row.insertCell().textContent = courseID;
    row.insertCell().textContent = midtermPercent;
    row.insertCell().textContent = lecturer;
    row.insertCell().textContent = acts;

    const background = coursesList.length -1;
    if (background % 2 === 1) {
        row.style.backgroundColor = "#B9B4C7";
        row.style.color = "49415c";
      } else {
        row.style.backgroundColor = "#49415c";
        row.style.color = "#B9B4C7";
      }

}

export function showStudentsOfCourses(domElement){
    const courseTable = domElement;
    courseTable.innerHTML = "";
    for(let val = 0 ; val<coursesList.length ; val++){
        const headerRow = courseTable.insertRow();
        headerRow.insertCell().textContent = "Course ID";
        headerRow.insertCell().textContent = "Course Name";
        headerRow.insertCell().textContent = "Student ID";
        headerRow.insertCell().textContent = "Student Name";
        headerRow.insertCell().textContent = "Midterm";
        headerRow.insertCell().textContent = "Final";
        headerRow.insertCell().textContent = "Letter Grade";
        headerRow.style.backgroundColor = "#303030";
        headerRow.style.color = "whitesmoke";
        
        const courseStudents = getStudentsOfCourse(coursesList[val].courseID);
        for(let i = 0 ; i < courseStudents.length ; i++){
            const grades = getGradesOfStudent(coursesList[val].courseID ,courseStudents[i].studentId);
            const row = courseTable.insertRow();
            row.insertCell().textContent = coursesList[val].courseID;
            row.insertCell().textContent = coursesList[val].courseName;
            row.insertCell().textContent = courseStudents[i].studentId;
            row.insertCell().textContent =  courseStudents[i].name;
            row.insertCell().textContent =  grades.midtermGrade;
            row.insertCell().textContent =  grades.finalGrade;
            row.insertCell().textContent =  calculateStudentGrade(courseStudents[i].studentId , coursesList[val].courseID);
            //console.log("öğrenci harf notu : " ,findStudentsLetterGrade(courseStudents[i].studentId , coursesList[val].courseID , true));
            
            if (i % 2 === 1) {
                row.style.backgroundColor = "#B9B4C7";
                row.style.color = "49415c";
              } else {
                row.style.backgroundColor = "#49415c";
                row.style.color = "#B9B4C7";
              }
        }
    
    }
    
}