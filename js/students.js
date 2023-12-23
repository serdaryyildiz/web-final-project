const studentJsonFile = '../json/students.json';
const response = getJson(studentJsonFile); /* Reading JSON file to response variable */
const students = response.json(); /* Turning JSON file to student object */

async function getJson(path){
    const response = await fetch(path);
    return response;
}

function findStudentIndex(studentID){
    return index = students.findIndex((student) => student.studentId === studentId);
}

function isStudentIdValid(studentID){
    let isValid = true;
    if(studentID <= 99999999 || studentID >= 1000000000){
        isValid = false
    }
    return isValid;
}

function addStudent(name , surname , studentId){
    try{
        if(isStudentIdValid(studentId)){
            students.push({
                studentName: name,
                studentSurname: surname,
                studentId: studentId
            });
            saveJson(studentJsonFile, students);
        }else {
            return "Unvalid Student ID .";
        }
    }catch(err){
        return "An error has occured , error : " + err;
    }
}

function updateStudent(studentId , newName , newSurname){
    try{
        const studentsCopy = '../json/students.json' /* Before updating copying the file can let us handle updating errors*/
        const index = findStudentIndex(studentId);
        if(index !== -1){
            students[index].name = newName;
            students[index].surname = newSurname;
            saveJson(studentJsonFile , studentsCopy);
        }else{
            return "Student has not found , please try again.";
        }

    }catch (err){
        return "An error has occured , error : " + err;
    }

}

function deleteStudent(studentId){
    const index = findStudentIndex(studentId);
    if(index !== -1){
        students.splice(index);
        saveJson(studentJsonFile,students);
    }else {
        return "Student ID has not found , please try again.";
    }
}