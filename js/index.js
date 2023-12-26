const courses = document.querySelector(".courses");
const students = document.querySelector(".students");
const faculties = document.querySelector(".faculties");

courses.addEventListener("click" , function() {
    if(courses.classList.contains("hidden")){
        courses.classList.remove("hidden");
    }

    if(!students.classList.contains("hidden")){
        students.classList.add("hidden");       //If students div do not have hidden class , then faculties user is at faculties page
                                                //so , i am not checking faculties.classList again.
    }else{
        faculties.classList.add("hidden");
    }
});

students.addEventListener("click" , function() {
    if(students.classList.contains("hidden")){
        students.classList.remove("hidden");
    }

    if(!courses.classList.contains("hidden")){
        courses.classList.add("hidden");
    }else{
        faculties.classList.add("hidden");
    }
});

faculties.addEventListener("click" , function() {
    if(faculties.classList.contains("hidden")){
        faculties.classList.remove("hidden");
    }

    if(!students.classList.contains("hidden")){
        students.classList.add("hidden");
    }else{
        courses.classList.add("hidden");
    }
});

