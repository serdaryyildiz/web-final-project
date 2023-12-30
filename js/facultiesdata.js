import { getFacultiesData , getFacultiesDataLength , getDepartments} from "../js/storagelocal.js";
import { Faculty } from "../js/faculties.js";
import { Department } from "./department.js";

const facultiesData = getFacultiesData();
let departmentList = [];



export function getDepartmentList(){
    return departmentList;
}


/* This method sets list of faculties to the program */
function setFacultiesList(){
    const facultiesList = [];
    var faculties = getFacultiesData();
    for(let i = 0 ; i < getFacultiesDataLength() ; i++){
        var faculty = new Faculty(
            faculties[i].facultyName,
            faculties[i].facultyID,
            faculties[i].departments
        );
        facultiesList.push(faculty);
        console.log("faculty added");
    }
    console.log(facultiesList);
    return facultiesList;
}



export function getFacultiesList(){
    try{
        return setFacultiesList();
    }catch (err){
        console.log("faculties list is empty, error : \n" , err);
    }
}

export function setDepartments(){
    const faculties = getFacultiesData();
    faculties.forEach(faculty => {
        if(faculty.departments && faculty.departments.length > 0) {
            faculty.departments.forEach(department => {
                var newDepartment = new Department(
                    department.departmentName ,
                    department.departmentID,
                    faculty.facultyID
                );
                departmentsData.push(newDepartment);
            })
        }
    });
}

function setDepartmentsToFaculty(){
    const departments = getDepartmentList();;
    departments.forEach(department => {
        const faculty = findFacultyById(department.faculty.facultyId);
        faculty.departments.push(department);
    });
    console.log("departments added.")
}

// Find a faculty by its name
function findFacultyByName(facultyName){
    try{
        const faculties = getFacultiesList();
        for(let val = 0 ; val < faculties.length ; val++){
            if (facultyName === faculties[val].facultyName){
                return faculties[val];
            }
        }
        console.log("bulunamadi");
        return "Faculty has not been found .";
    }catch(err){
        console.log("Find faculty by name error , error :\n" + err);
    }   
}

// Find a faculty by its ID
function findFacultyById(facultyId){
    try{
        const faculties = getFacultiesList();
        for(let val = 0 ; val < faculties.length ; val++){
            if (facultyId === faculties[val].facultyId){
                return faculties[val];
            }
        }
        return -1;
    }catch(err){
        console.log("Find faculty by Id error , error :\n" + err);
    }   
}

// Check if a faculty exists by its ID
function doesFacultyExists(facultyId){
    const result = findFacultyById(facultyId);
    if(result === -1){
        return false;
    }
    return true;
}

//This method returns an array of departments belongs to selected faculty.
function findDepartmentsOfFaculty(facultyId){
    const departmentls = getDepartmentList();
    let departmentsOfFaculty = [];
    for(let i = 0 ; i < departmentls.length ; i++){
        if(departmentls[i].faculty.facultyId === facultyId){
            departmentsOfFaculty.push(departmentls[i]);
        }
    }
    if(departmentsOfFaculty.length === 0){
        console.log("faculty do not have department");
    }
    return departmentsOfFaculty;
}

// Add a new faculty
function addFaculty(facultyName , facultyID , departments){
    try{
        if(isFacultyIdValid(facultyID)){
            var newFaculty = new Faculty(
                newFaculty.facultyName = facultyName,
                newFaculty.facultyID = facultyID,
                newFaculty.departments = departments
            )
            if(!doesFacultyExists(facultyID)){
                facultiesData.push(newFaculty)
                localStorage.setItem("faculties" , JSON.stringify(facultiesData));
                console.log(facultiesData);
                return "New faculty added.";
            } else {
                console.log("faculty exist");
                return "Faculty alredy exist!";
            }
        } else {
            console.log("Faculty ID is not valid.");
            return "Faculty ID is not valid ! ";
        }
    } catch(err) {
        console.log("Add new faculty error , error :\n" +err);
    }
}

export function createFacultiesTable(domElement) {
    const facultiesTable = domElement;
    let faculties = getFacultiesList();
    // Clear any existing table content
    facultiesTable.innerHTML = "";
  
    // Create the table header
    const headerRow = facultiesTable.insertRow();
    headerRow.insertCell().textContent = "Faculty Name";
    headerRow.insertCell().textContent = "Faculty ID";
    headerRow.insertCell().textContent = "Departments";
    headerRow.style.backgroundColor = "#303030";
    headerRow.style.color = "whitesmoke";
  
    // Iterate through faculties and create table rows
    for (let i = 0; i < faculties.length; i++) {
        const row = facultiesTable.insertRow();
        row.insertCell().textContent = faculties[i].facultyName;
        row.insertCell().textContent = faculties[i].facultyId;
        let departmentText = "";
        for(let j = 0 ; j < faculties[i].departments.length ; j++){
            if(faculties[i].departments.length === 0){
                departmentText += "Faculty has not any departments.";
                return;
            }
            if(j !== faculties[i].departments.length - 1){
                departmentText += faculties[i].departments[j].departmentName + "    /   " ;
            }else {
                departmentText += faculties[i].departments[j].departmentName + "    ";
            }
                
                console.log(faculties[i].departments[j].length + "ilk");
                console.log(faculties[i].departments.length + "iki");
            
        }
        row.insertCell().textContent = departmentText;

        //Background color depends on index
        if (i % 2 === 1) {
          row.style.backgroundColor = "#B9B4C7";
          row.style.color = "49415c";
        } else {
          row.style.backgroundColor = "#49415c";
          row.style.color = "#B9B4C7";
        }
      }

    
  
    // Return table as a string
    return facultiesTable.innerHTML;
}