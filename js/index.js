import storagelocal from "./storagelocal.js";

//DOM Elements
const home = document.querySelector(".home");
const courses = document.querySelector(".courses");
const students = document.querySelector(".students");
const faculties = document.querySelector(".faculties");
const homeBtn = document.querySelector(".home-btn");
const coursesBtn = document.querySelector(".courses-btn");
const studentsBtn = document.querySelector(".students-btn");
const facultiesBtn = document.querySelector(".faculties-btn");
const courseCount = document.getElementById("courseCount");
const studentCount = document.getElementById("studentCount");
const studentTable = document.getElementById("student-table");

//Local Storage Variables
let studentCounter = storagelocal.getStudentDataLength();
let courseCounter = storagelocal.getCourseDataLength();
const studentData = storagelocal.getStudentsData();
const courseData = storagelocal.getCourseData();
//HTML Implements
studentCount.textContent = "We have "+ studentCounter +" students";
courseCount.textContent = "We have "+ courseCounter +" courses";

//Home Button
homeBtn.addEventListener("click" , function() {
    if(home.classList.contains("hidden")){
        home.classList.remove("hidden");
    }
    if(!students.classList.contains("hidden")){
        students.classList.add("hidden"); 
    }
    if(!courses.classList.contains("hidden")){
        courses.classList.add("hidden"); 
    }
    if(!faculties.classList.contains("hidden")){
        faculties.classList.add("hidden"); 
    }
    
});


// Javascript Section for Course actions
coursesBtn.addEventListener("click" , function() {
 
    if(courses.classList.contains("hidden")){
        courses.classList.remove("hidden");
    }

    if(!students.classList.contains("hidden")){
        students.classList.add("hidden");       //If students div do not have hidden class , then faculties user is at faculties page
                                                //so , i am not checking faculties.classList again.
    }
    if(!home.classList.contains("hidden")){
        home.classList.add("hidden"); 
    }
    if(!faculties.classList.contains("hidden")){
        faculties.classList.add("hidden"); 
    }
});




// Javascript Section for student actions


studentsBtn.addEventListener("click" , function() {
    

    if(students.classList.contains("hidden")){      // We could use students.classList.toggle() method but , if I use toggle() method
        students.classList.remove("hidden");        //when user clicks student page when it hasn't hidden class , toggle() method will add hidden class.
    }

    if(!courses.classList.contains("hidden")){
        courses.classList.add("hidden");
    }
    if(!home.classList.contains("hidden")){
        home.classList.add("hidden"); 
    }
    if(!faculties.classList.contains("hidden")){
        faculties.classList.add("hidden"); 
    }
    
});

// Javascript Section for faculty actions
facultiesBtn.addEventListener("click" , function() {
    if(faculties.classList.contains("hidden")){
        faculties.classList.remove("hidden");
    }

    if(!students.classList.contains("hidden")){
        students.classList.add("hidden");
    }
    if(!courses.classList.contains("hidden")){
        courses.classList.add("hidden"); 
    }
    if(!home.classList.contains("hidden")){
        home.classList.add("hidden"); 
    }
    
});

function createStudentTable() {
    const students = storagelocal.getStudentsData();
  
    // Clear any existing table content
    studentTable.innerHTML = "";
  
    // Create the table header
    const headerRow = studentTable.insertRow();
    headerRow.insertCell().textContent = "ID";
    headerRow.insertCell().textContent = "Name";
    headerRow.insertCell().textContent = "Surname";
  
    // Iterate through students and create table rows
    for (const student of students) {
      const row = studentTable.insertRow();
      row.insertCell().textContent = student.studentI
      row.insertCell().textContent = student.studentName;
      row.insertCell().textContent = student.studentSurname;
    }
  
    // Return table as a string
    return studentTable.innerHTML;
  }

// storagelocal.updateCourse("ATB3801" , "ATATURK" , "30%" , "Serdar YILDIZ")
// storagelocal.updateStudent("200709051" , "Kutay Hanzo" , "ÖZCAN")
storagelocal.addNewStudent("Mahmut" , "TUNCER" , "200709051");
storagelocal.addNewCourse("kursadi" , "22" , "fakulte" , "dep" , "30%" , "ahmet yildiz");

