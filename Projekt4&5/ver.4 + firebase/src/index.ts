let addNoteButton = <HTMLInputElement> document.querySelector("#buttonAddNote")
let popup = <HTMLInputElement> document.querySelector("#addNewNote")
let submitForm = <HTMLInputElement> document.querySelector("#submitButton")
let tasksID = <HTMLInputElement> document.querySelector('#noteContainer')

import firebase from 'firebase';
import { firebaseConfig } from './config';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const note =
{
    title: 'Second note',
    contenet: "Second note content from code"
}



async function addNote(note: { title: string; contenet: string; }){
    const res = await db.collection('notes').add(note)
}

async function deleteNote(id: any)
{
    const res = await db.collection('notes').doc(id).delete();
}

async function updateNote(id: any, note: any)
{
    const res = await db.collection('notes').doc(id).update(note)
}

async function getNote(id: any)
{
    return db.collection("notes").doc(id).get()
}


addNote(note);



class Note {
    constructor(){
        let dropdown = document.querySelector("select")
        let date = new Date()
        let fullDate = "Data dodania: " + date.getDate() + "." + date.getMonth()+1 + "." + date.getFullYear() + "\t\t"+ date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()

        let data = {
        'title': (document.querySelector("#title") as HTMLInputElement).value,
        'value': (document.querySelector("#value") as HTMLInputElement).value,
        'date': fullDate,
        'color': dropdown.options[dropdown.selectedIndex].value
        }
        localStorage.setItem((localStorage.length + 1).toString(), JSON.stringify(data))
    }  
}


addNoteButton.addEventListener('click', function(){
    if(popup.style.display == "none")
    {
        popup.style.display = "block"
    }
    else
    {
        popup.style.display = "none"
    }
}) 


submitForm.addEventListener("click", function(){
    let note = new Note()
})


function displayNote(retrievedObject: { color: string; title: string; value: string; date: string; }, i: string){
    let divForTask = document.createElement("div")
    divForTask.style.backgroundColor = retrievedObject.color
    divForTask.classList.add("task")
    tasksID.appendChild(divForTask)
    remove(i,divForTask)
    pinOnTopButton(divForTask)

    let h2ForTitle = document.createElement("h2")
    h2ForTitle.innerText = retrievedObject.title
    divForTask.appendChild(h2ForTitle)

    let placeForValue = document.createElement("h4")
    placeForValue.innerText = retrievedObject.value
    divForTask.appendChild(placeForValue)

    let placeForDate = document.createElement("h5")
    placeForDate.innerText = retrievedObject.date
    divForTask.appendChild(placeForDate)
}


for(let i in localStorage)
{
    let retrievedObject = JSON.parse(localStorage.getItem(i))
    displayNote(retrievedObject, i)
}


function pinOnTopButton(divForTask: HTMLDivElement){
    let button = document.createElement("div")
    button.classList.add("pinontop")
    button.innerText = "Przypnij notkę"
    divForTask.appendChild(button)
    
    button.addEventListener("click", function(){
        this.parentNode.parentNode.prepend(this.parentNode)
    })
}


function remove(id: string,divForTask: HTMLDivElement) {
    let exitButton = document.createElement("div")
    exitButton.classList.add("exitButton")
    divForTask.appendChild(exitButton)
    let cross1 = document.createElement("div")
    let cross2 = document.createElement("div")
    cross1.classList.add("cross1")
    cross2.classList.add("cross2")

    exitButton.appendChild(cross1)
    exitButton.appendChild(cross2)
    exitButton.addEventListener("click", function(){
        if (confirm('Czy na pewno usunąć tę notatkę?')) {
            localStorage.removeItem(id)
            location.reload()
        }
    })
}

