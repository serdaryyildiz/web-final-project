export class student{  //constructor class to manage student object
    constructor(name , surname , studentId){
        this.name = name;
        this.surname = surname;
        this.studentId = studentId;
    }

    toString() {
        return this.name + " " + this.surname ;
    }
}

import {getStudentsData} from "../js/storagelocal.js";

export function isStudentIdValid(studentID){
    let isValid = true;
    if(studentID <= 99999999 || studentID >= 1000000000){
        isValid = false
    }
    return isValid;
}


export function createStudentTable() {
    const studentTable = document.getElementById("students-table");
    const students = getStudentsData();
    // Clear any existing table content
    studentTable.innerHTML = "";
  
    // Create the table header
    const headerRow = studentTable.insertRow();
    headerRow.insertCell().textContent = "ID";
    headerRow.insertCell().textContent = "Name";
    headerRow.insertCell().textContent = "Surname";
    headerRow.style.backgroundColor = "#303030";
    headerRow.style.color = "whitesmoke";
  
    // Iterate through students and create table rows
    for (let i = 0; i < students.length; i++) {
        const row = studentTable.insertRow();
        row.insertCell().textContent = students[i].studentID;
        row.insertCell().textContent = students[i].studentName;
        row.insertCell().textContent = students[i].studentSurname;
  
        // Satırın indeksine göre arka plan rengini belirleme
        if (i % 2 === 1) {
          row.style.backgroundColor = "#B9B4C7";
          row.style.color = "49415c";
        } else {
          row.style.backgroundColor = "#49415c";
          row.style.color = "#B9B4C7";
        }
      }

    
  
    // Return table as a string
    return studentTable.innerHTML;
}