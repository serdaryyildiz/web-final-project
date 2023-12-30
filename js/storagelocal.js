import { Student } from "../js/students.js";
import { Faculty } from "./faculties.js";
import { Department } from "./department.js";




async function getJson(path) {
    try{
        const response = await fetch(path);
        const data = await response.json();
        return data;
    } catch(err){
        console.log("getJson error , error : \n" , err);
    }

}

export async function setLocalStorage() {  
    try {
        const studentsJsonPath = "../json/students.json";
        const stInfosJsonPath = "../json/studentInfo.json";
        const coursesJsonPath = "../json/courses.json";
        const facultiesJsonPath = "../json/faculties.json";

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
const courseData =  await JSON.parse(localStorage.getItem("courses"))  || [];
const studentsData = await JSON.parse(localStorage.getItem("students")) || [];
const studentsInfoData = await JSON.parse(localStorage.getItem("studentInfos")) || [];
const facultiesData = await JSON.parse(localStorage.getItem("faculties")) || [];
const departmentsData = [] ;


let courseDataLength = courseData.length;
let studentsDataLength = studentsData.length;
let facultiesDataLength = facultiesData.length;
let studentsInfoDataLength = studentsInfoData.length;

export function getDepartments(){
    return departmentsData;
}

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

export function getStudentsInfoDataLength(){
    return studentsInfoDataLength;
}

export function getFacultiesData(){
    return facultiesData;
}

export function getFacultiesDataLength(){
    return facultiesDataLength;
}



export default {
    getCourseData,
    getCourseDataLength,
    getStudentsData,
    getStudentDataLength,
    getStudentsInfoData,
    getFacultiesData,
    getFacultiesDataLength,
    getDepartments,
    getStudentsInfoDataLength
}