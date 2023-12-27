const studentsJsonPath = "../json/students.json";
const stInfosJsonPath = "../json/studentInfo.json";
const coursesJsonPath = "../json/courses.json";
const facultiesJsonPath = "../json/faculties.json";


const courseData = JSON.parse(localStorage.getItem("courses"))  || [];
const studentsData = JSON.parse(localStorage.getItem("students")) || [];
const studentsInfoData = JSON.parse(localStorage.getItem("studentInfos")) || [];

function getCourseData(){
    return courseData;
}

function getStudentsData(){
    return studentsData;
}


let courseDataLength = courseData.length;
let studentsDataLength = studentsData.length;
let studentsInfoDataLength = studentsInfoData.length;

function getCourseDataLength(){
    return courseDataLength;
}

function getStudentDataLength(){
    return studentsDataLength;
}


async function getJson(path) {
    const response = await fetch(path);
    const data = await response.json();
    return data;
}

async function setLocalStorage() {  
    try {
        const students = await getJson(studentsJsonPath);
        const studentInfos = await getJson(stInfosJsonPath);
        const courses = await getJson(coursesJsonPath);
        const faculties = await getJson(facultiesJsonPath);

        localStorage.setItem("students", JSON.stringify(students));
        localStorage.setItem("studentInfos", JSON.stringify(studentInfos));
        localStorage.setItem("courses", JSON.stringify(courses));
        localStorage.setItem("faculties", JSON.stringify(faculties));
        
        console.log("Veriler localStorage'a kaydedildi.");
    } catch (error) {
        console.error("Hata oluştu: ", error);
    }
}
setLocalStorage();

function getLength(storageItem){
    return localStorage.getItem(storageItem).length
}

function findStudentById(studentID){
    try{
        const selectedStudent = studentsData.find(student => student.studentID === studentID);
        return selectedStudent;
    }catch(err){
        console.log("Find student by id error , error :\n" + err);
    }   
}

function findStudentIndex(studentID){
    try{
        return studentsData.findIndex(student => student.studentID === studentID);
    }catch(err){
        console.log("Find student index error , error :\n" + err);
    }   
}

function findCourseById(courseID){
    try{
        const course = coursesData.find(course => course.courseID === courseID); 
        return course;
    } catch(err){
        console.log("Find course by id error , error : \n" + err);
    }
}

function findCourseIndex(courseID){
    try{
        return courseData.findIndex(course => course.courseID === courseID); 
    } catch(err){
        console.log("Find course index error , error : \n" + err);
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

function addNewStudent(studentName , studentSurname , studentID){
    try{
        const newStudent = {
            "studentName" : studentName,
            "studentSurname" : studentSurname,
            "studentID" : studentID
        }
        studentsData.push(newStudent)
        localStorage.setItem("students" , JSON.stringify(studentsData));
    } catch(err) {
        console.log("Add new student error , error :\n" +err);
    }
}

function updateStudent(studentID, updatedName , updatedSurname) {
    try {
        const index = findStudentIndex(studentID);

        if (index !== -1) {
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

function updateCourse(courseID , updatedCourseName , midtermPercent , lecturer){
    try{
        const index = findCourseIndex(courseID);
        if(index !== -1){
            courseData[index].coursesDepartment
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

export default{
    setLocalStorage,
    getCourseData,
    getStudentsData,
    getCourseDataLength,
    getStudentDataLength,
    findStudentById,
    findStudentIndex,
    findCourseById,
    findCourseIndex,
    getStudentInfos,
    findStudentInfosIndex,
    addNewStudent,
    updateStudent,
    updateCourse
};