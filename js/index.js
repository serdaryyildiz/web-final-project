import storagelocal, { getCourseData, getStudentsData } from "../js/storagelocal.js";
import { createStudentTable , addStudent, deleteStudent, setStudentList, searchStudent, createSearchedStudentTable, getByTen, setByTen} from "../js/studentsdata.js";
import { addNewCourse, createCourseTable, deleteCourse, insertToCoursesTable, showStudentsOfCourses, updateCourse } from "../js/coursedata.js";
import { addStudentToCourse, updateStudentsGrades } from "./studentInfoData.js";
//DOM Elements

const contactBtn = document.querySelector(".contact-us-btn");

//student dom elements
const studentsBtn = document.querySelector(".students-btn");
const studentCount = document.getElementById("studentCount");
const stdAddButton = document.getElementById("std-add");
const stdDeteleButton = document.getElementById("std-dlt");
const stdDeleteForm = document.getElementById("std-delete-form");
const studentAddForm = document.getElementById("std-add-form");
const studentTable = document.getElementById("students-table");
const studentSearch = document.getElementById("stdSearchButton");
const stdBackButton = document.querySelector(".std-back-btn");

const byTenButton = document.getElementById("bytenbutton");
//course dom elements
const coursesBtn = document.querySelector(".courses-btn");

const courseAddBtn = document.getElementById("course-add");
const courseAddForm = document.getElementById("course-add-form");
const coursesTable = document.getElementById("coursesTable");
const coursesInfoTable = document.getElementById("coursesInfoTable");
const courseCount = document.getElementById("courseCount");
const courseDeleteButton = document.getElementById("course-dlt")
const courseDeleteForm = document.getElementById("course-delete-form");
const courseUpdateButton = document.getElementById("course-upd");
const courseUpdateForm = document.getElementById("course-upd-form");
const addStudentToCourseButton = document.getElementById("course-add-std");
const addStudentToCourseForm = document.getElementById("add-course-student-form");
const updateStudentsGradeButton = document.getElementById("course-upd-std");
const updateStudentsGradeForm = document.getElementById("upd-course-student-form");

//Local Storage Variables
let studentCounter = getStudentsData().length;
let courseCounter = getCourseData().length;
//HTML Implements
studentCount.textContent = "We have "+ studentCounter +" students";
courseCount.textContent = "We have "+ courseCounter +" courses";

//Home Page Actions
// homeBtn.addEventListener("click" , function() {
//     pageChange("home");
    
// });


byTenButton.addEventListener("click" , function() {
    let byTen = getByTen();
    if(byTen){
        setByTen(false);
        byTenButton.textContent = "By Ten : False";
        showStudentsOfCourses(coursesInfoTable);
        createStudentTable(studentTable);
    }else{
        setByTen(true);
        byTenButton.textContent = "By Ten : True";
        showStudentsOfCourses(coursesInfoTable);
        createStudentTable(studentTable);
    }
});
// Javascript Section for Course actions
coursesBtn.addEventListener("click" , function() {
    pageChange("courses");
    createCourseTable(coursesTable);
    showStudentsOfCourses(coursesInfoTable);
});

courseAddBtn.addEventListener("click" , function() {
    formChange("add" , ".course-form");
    courseAddForm.addEventListener("submit" , function(event){
        event.preventDefault();
        const courseIdInput = document.getElementById("courseIdInput").value;
        const courseNameInput = document.getElementById("courseNameInput").value;
        const courseLecturerInput = document.getElementById("courseLecturerInput").value;
        const courseMidtermInput = document.getElementById("courseMidtermInput").value;
        const courseActsInput = document.getElementById("courseActsInput").value;
        addNewCourse(courseNameInput , courseIdInput , courseMidtermInput , courseLecturerInput , courseActsInput);
        createCourseTable(coursesTable);
        courseCount.textContent = "We have "+ courseCounter +" courses";
    });
})

courseDeleteButton.addEventListener("click" , function(event) {
    formChange("delete" , ".course-form");
    courseDeleteForm.addEventListener("submit" , function(event) {
        event.preventDefault(); //It stops page re-loading.
        //getting input
        const courseIdInput = document.getElementById("deleteCourseInput").value;
        deleteCourse(courseIdInput);
        createCourseTable(coursesTable);
        courseCount.textContent = "We have "+ courseCounter +" courses";

    });
});

courseUpdateButton.addEventListener("click" , function() {
    formChange("upd" , ".course-form");
    courseUpdateForm.addEventListener("submit" , function(event) {
        event.preventDefault();
        //inputs
        const courseIdInputUpd = document.getElementById("courseIdInputUpd").value;
        const courseNewNameInput = document.getElementById("courseNewNameInput").value;
        const courseNewLecturerInput = document.getElementById("courseNewLecturerInput").value;
        const courseNewMidtermInput = document.getElementById("courseNewMidtermInput").value;
        const courseNewActsInput = document.getElementById("courseNewActsInput").value;
        updateCourse(courseIdInputUpd , courseNewNameInput , courseNewLecturerInput , courseNewMidtermInput , courseNewActsInput);
        createCourseTable(coursesTable);
    });
})

addStudentToCourseButton.addEventListener("click" , function() {
    formChange("addstd-course" , ".course-form");
    addStudentToCourseForm.addEventListener("submit" , function(event) {
        event.preventDefault();
        const studentIdInputCourse = document.getElementById("studentIdInputCourse").value
        const courseIdInputStudent = document.getElementById("courseIdInputStudent").value;
        const studentMidtermInput = document.getElementById("studentMidtermInput").value;
        const studentFinalInput = document.getElementById("studentFinalInput").value;
        addStudentToCourse(courseIdInputStudent , studentIdInputCourse , studentMidtermInput , studentFinalInput);
        showStudentsOfCourses(coursesInfoTable);
    });
});

updateStudentsGradeButton.addEventListener("click" , function() {
    formChange("updstd-course" , ".course-form");
    updateStudentsGradeForm.addEventListener("submit" , function(event) {
        event.preventDefault();
        const studentIdInput = document.getElementById("updateGradeIdInput").value
        const courseIdInputStudent = document.getElementById("updateGradeCourseInput").value;
        const studentMidtermInput = document.getElementById("studentUpdateMidtermInput").value;
        const studentFinalInput = document.getElementById("studentUpdateFinalInput").value;
        updateStudentsGrades(courseIdInputStudent , studentIdInput , studentMidtermInput , studentFinalInput);
        showStudentsOfCourses(coursesInfoTable);
    })
})
// Javascript Section for student actions

studentsBtn.addEventListener("click" , function() {
    pageChange("students");
    createStudentTable(studentTable);
});

stdAddButton.addEventListener("click" , function() {
    // studentAddForm.classList.toggle("hidden");
    formChange("add" , ".std-form")
    studentAddForm.addEventListener("submit" , function(event) {
        event.preventDefault(); //It stops page re-loading.
        //Get input from form :
        const studentNameInput = document.getElementById("studentNameInput").value;
        const studentSurnameInput = document.getElementById("studentSurnameInput").value;
        const studentIdInput = document.getElementById("studentIdInput").value;
        //insertToStudentTable(studentTable ,studentNameInput , studentSurnameInput , studentIdInput);
        studentCounter = getStudentsData().length;
        addStudent(studentNameInput , studentSurnameInput , studentIdInput);
        studentCount.textContent = "We have "+ studentCounter +" students";
        createStudentTable(studentTable);
    });
});

stdDeteleButton.addEventListener("click" , function() {
    // stdDeleteForm.classList.toggle("hidden");
    formChange("delete" , ".std-form");
    stdDeleteForm.addEventListener("submit" , function(event) {
        event.preventDefault();
        const studentIdInput = document.getElementById("deleteStudentInput").value;
        deleteStudent(studentIdInput);
        studentCounter = getStudentsData().length;
        studentCount.textContent = "We have "+ studentCounter +" students";
        createStudentTable(studentTable);
    });
});

studentSearch.addEventListener("click" , function() {
    const searchStudentInput = document.getElementById("studentSearch").value;
    createSearchedStudentTable(studentTable , searchStudent(searchStudentInput));
    stdBackButton.classList.remove("hidden");
});

stdBackButton.addEventListener("click" , function () {
    createStudentTable(studentTable);
    stdBackButton.classList.add("hidden");
})

contactBtn.addEventListener("click" , function() {
    pageChange("contact-us");
});

// Array.from(closeButton).forEach(function(button) {
//     button.addEventListener("click", closeForm);
// });

// closeButton.addEventListener("click" , function() {
//     hideForm(currentForm);
// })

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

let currentForm = null;

//Changing forms on a page
function formChange(form , page){
    const forms = document.querySelectorAll(page);
    for(let i = 0 ; i < forms.length ; i++){
        if(forms[i].classList.contains(form)){
            forms[i].classList.remove("hidden");
        }else{
            forms[i].classList.add("hidden");
        }
    }
    currentForm = form;
}

// function closeForm() {
//     const forms = document.querySelectorAll(".std-form"); // veya kapatmak istediğiniz tüm form sınıflarını seçin
//     forms.forEach(form => {
//         form.classList.add("hidden");
//     });
// }



// function hideForm(form){
//     const formElement = document.getElementById(form);
//     if(formElement){
//         formElement.classList.add("hidden");
//         currentForm = null;
//     }
// }


// storagelocal.updateCourse("ATB3801" , "ATATURK" , "30%" , "Serdar YILDIZ")
// storagelocal.updateStudent("200709051" , "Kutay Hanzo" , "ÖZCAN")

