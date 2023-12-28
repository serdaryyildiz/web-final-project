const studentsJsonPath = "../json/students.json";
const stInfosJsonPath = "../json/studentInfo.json";
const coursesJsonPath = "../json/courses.json";
const facultiesJsonPath = "../json/faculties.json";

const courseData = JSON.parse(localStorage.getItem("courses"))  || [];
const studentsData = JSON.parse(localStorage.getItem("students")) || [];
const studentsInfoData = JSON.parse(localStorage.getItem("studentInfos")) || [];

let courseDataLength = courseData.length;
let studentsDataLength = studentsData.length;
let studentsInfoDataLength = studentsInfoData.length;

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

export function getCourseData(){
    return courseData;
}

export function getCourseDataLength(){
    return courseDataLength;
}

export function getStudentsData(){
    return studentsData;
}

export function getStudentDataLength(){
    return studentsDataLength;
}

export function getStudentsInfoData(){
    return studentsInfoData;
}

export default {
    getCourseData,
    getCourseDataLength,
    getStudentsData,
    getStudentDataLength,
    getStudentsInfoData
}