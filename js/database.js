import fs from 'fs';
import { promises as promises } from "fs";

const studentJsonFile = '../json/students.json';
const obsJsonFile = '../json/obs.json';
const courseJsonFile = '../json/courses.json';

function saveJson(path , data){
    try{
        const jsonData = JSON.stringify(data);
        promises.writeFile(path , jsonData);
    }catch(err){
        return "Writing JSON Error , error : "+ err; 
    }
}

function getJson(path){
    try{
        const data = promises.readFile(path , 'utf-8');
        const students = JSON.parse(data);
        return students;
    }catch(err){
        return "Reading file error , error : "+err;
    }
}

function findIndex(path , data){    //Burada yanlış var , key olmiycak . Düzelt
    try{
        let counter = 0;
        for (let key of Object.keys(data)){
            if(data === key){
                return counter;
            }
            counter++;
        }
    }catch(err){
        return "Database error , error :" +err;
    }
}

module.exports = {
    saveJson : saveJson,
    getJson : getJson,
    findIndex : findIndex
}