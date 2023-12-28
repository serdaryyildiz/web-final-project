import {getCourseData , getCourseDataLength} from "../js/storagelocal.js";

const courseData = getCourseData();
const courseDataLength = getCourseDataLength();

//This method returns course object with same ID.
function findCourseById(courseID){
    try{
        const course = coursesData.find(course => course.courseID === courseID); 
        return course;
    } catch(err){
        console.log("Find course by id error , error : \n" + err);
    }
}

//This method returns index of that course with same ID.
function findCourseIndex(courseID){
    try{
        return courseData.findIndex(course => course.courseID === courseID); 
    } catch(err){
        console.log("Find course index error , error : \n" + err);
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
    for(let i = 0 ; i < getCourseDataLength() ; i++){
        if(courseID === courseData[i].courseID){
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