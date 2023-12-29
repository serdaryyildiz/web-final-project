import {getCourseData , getCourseDataLength} from "../js/storagelocal.js";
import { Course } from "./courses.js";

const courseData = getCourseData();
const courseDataLength = getCourseDataLength();

export function getCourseList(){
    var courses = [];
    var course = getCourseData();
    for(let i = 0 ; i < getCourseDataLength() ; i++){
        var arrayCourse = new Course(
            course[i].courseName ,
            course[i].courseID ,
            course[i].lecturer,
            course[i].courseFaculty,
            course[i].courseDepartment,
            course[i].midtermPercent,
            course[i].acts
        )
        courses.push(arrayCourse)
    }
    console.log(courses);
    return courses;
}

//This method returns course object with same ID.
export function findCourseById(courseID){
    try{
        const courses = getCourseList();
        for(let val = 0 ; val < courses.length ; val++){
            if (courseID === courses[val].courseID){
                return courses[val];
            } else{
                console.log("bulunamadi");
                return "Course has not been found .";
            }
        }
    }  catch (err) {
        console.log("findCoursetById error , error : \n" +err);
    }
}

//This method returns index of that course with same ID.
function findCourseName(courseName){
    try{
        const courses = getCourseList();
        for(let val = 0 ; val < courses.length ; val++){
            if (courseName === courses[val].courseName){
                return courses[val];
            } else{
                console.log("bulunamadi");
                return "Course has not been found .";
            }
        }
    }  catch (err) {
        console.log("findCoursetByName error , error : \n" +err);
    }
}



//This function implements a new course by JSON format , then checks this course with same id exist or not .
//If it does not exists , this method pushes new course to the Courses Array from localStorage .
//If lecture is already exists , method returns a warning message.
function addNewCourse(courseName , courseID , courseFaculty , courseDepartment , midtermPercent , lecturer){
    try {
        const newCourse =
        {
            "courseName" : courseName,
            "courseID" : courseID ,
            "courseFaculty" : courseFaculty,
            "courseDepartment" : courseDepartment,
            "midtermPercent" : midtermPercent,
            "lecturer" : lecturer 
        }
        if(!doesCourseExist){
            courseData.push(newCourse)
            localStorage.setItem("courses" , JSON.stringify(courseData));
            console.log(courseData);
            return "New course added.";
        } else {
            console.log("course exist");
            return "Course already exists!";
        }
    } catch (err) {
         console.log("Add new course error , error : \n" + err);
        
    }
}

function doesCourseExist(courseID){         //This function checking Course with that ID is exists or not.
    let exist = false;
    const courses = getCourseList();
    for(let i = 0 ; i < courses.length ; i++){
        if(courseID === courses[i].courseID){
            exist = true;
        }
    }
    return exist;
}

//This function gets course index , and makes changes . But you can't change Faculty and Department of a lecture. 
function updateCourse(courseID , updatedCourseName , midtermPercent , lecturer){    
    try{
        const index = findCourseIndex(courseID);
        if(index !== -1){
            courseData[index] = 
            {
                "courseName" : updatedCourseName,
                "courseID" : courseID ,
                "courseFaculty" : courseData[index].courseFaculty,
                "courseDepartment" : courseData[index].courseDepartment,
                "midtermPercent" : midtermPercent,
                "lecturer" : lecturer 
            };
            console.log(courseData);
        }
    } catch (err) {
        console.log("Update course error , error :\n " +err);
    }
}

export function createCourseTable(domElement){
    const courseTable = domElement;
    const courses = getCourseList();
    //Clearing table HTML
    courseTable.innerHTML = "";

    //Table header
    const headerRow = courseTable.insertRow();
    headerRow.insertCell().textContent = "Course ID";
    headerRow.insertCell().textContent = "Course Name";
    headerRow.insertCell().textContent = "Lecturer";
    headerRow.insertCell().textContent = "Course Department";
    headerRow.insertCell().textContent = "ACTS";
    headerRow.style.backgroundColor = "#303030";
    headerRow.style.color = "whitesmoke";

    // Iterate through courses and create table rows
    for (let i = 0; i < courses.length; i++) {
        const row = courseTable.insertRow();
        row.insertCell().textContent = courses[i].courseID;
        row.insertCell().textContent = courses[i].courseName;
        row.insertCell().textContent = courses[i].lecturer;
        row.insertCell().textContent = courses[i].courseDepartment;
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