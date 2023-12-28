import storagelocal from "../js/storagelocal.js";
import { createStudentTable } from "../js/studentsdata.js";
import { createCourseTable } from "../js/coursedata.js";
import { createFacultiesTable } from "../js/facultiesdata.js";
//DOM Elements
const homeBtn = document.querySelector(".home-btn");
const coursesBtn = document.querySelector(".courses-btn");
const studentsBtn = document.querySelector(".students-btn");
const facultiesBtn = document.querySelector(".faculties-btn");
const courseCount = document.getElementById("courseCount");
const studentCount = document.getElementById("studentCount");
const stdAddButton = document.getElementById("std-add");
const courseAddBtn = document.getElementById("course-add");
const studentAddForm = document.getElementById("std-add-form");
const courseAddForm = document.getElementById("course-add-form");
const studentTable = document.getElementById("students-table");
const coursesTable = document.getElementById("coursesTable");
const facultiesTable = document.getElementById("faculties-table");

//Local Storage Variables
let studentCounter = storagelocal.getStudentDataLength();
let courseCounter = storagelocal.getCourseDataLength();
//HTML Implements
studentCount.textContent = "We have "+ studentCounter +" students";
courseCount.textContent = "We have "+ courseCounter +" courses";

//Home Page Actions
homeBtn.addEventListener("click" , function() {
    pageChange("home");
    
});

// Javascript Section for Course actions
coursesBtn.addEventListener("click" , function() {
    pageChange("courses");
    createCourseTable(coursesTable);
});

courseAddBtn.addEventListener("click" , function() {
    courseAddForm.classList.toggle("hidden");
})
// Javascript Section for student actions

studentsBtn.addEventListener("click" , function() {
    pageChange("students");
    createStudentTable(studentTable);
});

stdAddButton.addEventListener("click" , function() {
    studentAddForm.classList.toggle("hidden");
});

// Javascript Section for faculty actions
facultiesBtn.addEventListener("click" , function() {
    pageChange("faculties");
    createFacultiesTable(facultiesTable);
});

//Changing page function 
function pageChange(page){
    const pages = document.querySelectorAll(".page");
    for(let i = 0 ; i < pages.length ; i++){
        if(pages[i].classList.contains(page)){
            pages[i].classList.remove("hidden");
        }else{
            pages[i].classList.add("hidden");
        }
    }
}

// storagelocal.updateCourse("ATB3801" , "ATATURK" , "30%" , "Serdar YILDIZ")
// storagelocal.updateStudent("200709051" , "Kutay Hanzo" , "ÖZCAN")

