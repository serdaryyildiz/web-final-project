const studentsJsonPath = "../json/students.json";
const stInfosJsonPath = "../json/studentInfo.json";
const coursesJsonPath = "../json/courses.json";
const facultiesJsonPath = "../json/faculties.json";

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

function findStudentById(studentID){
    try{
        const studentsData = JSON.parse(localStorage.getItem("students"));
        return selectedStudent = studentsData.find(student => student.studentID === studentID);
    }catch(err){
        console.log("Find student by id error , error :\n" + err);
    }
    
}

function findCourseById(courseID){
    try{
        const coursesData = JSON.parse(localStorage.getItem("courses"));
        return course = coursesData.find(course => course.courseID === courseID); 
    } catch(err){
        console.log("Find course by id error , error : \n" + err);
    }
}

function getStudentInfos(studentID){
    try{
        const studentsData = JSON.parse(localStorage.getItem("studentInfos"));
        return selectedStudent = studentsData.find(student => student.studentID === studentID);
    }catch(err){
        console.log("Get Student infos error , error : \n" + err);
    }
}

function addNewStudent(studentName , studentSurname , studentID){
    const studentsData = JSON.parse(localStorage.getItem("studentInfos")) || [];
    const nSt = new student()
    const newStudent = {
        "studentName" : studentName,
        "studentSurname" : studentSurname,
        "studentID" : studentID
    }
    studentsData.push(newStudent)
    localStorage.setItem("students" , JSON.stringify(studentsData));
}