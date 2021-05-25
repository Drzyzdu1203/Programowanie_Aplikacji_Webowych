let addNoteButton = document.querySelector("#buttonAddNote")
let popup = document.querySelector("#addNewNote")
let submitForm = document.querySelector("#submitButton")
let tasksID = document.querySelector('#noteContainer')



class Note {
    constructor(){
        let dropdown = document.querySelector("select")
        let date = new Date()
        let fullDate = "Data dodania: " + date.getDate() + "." + date.getMonth()+1 + "." + date.getFullYear() + "\t\t"+ date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()

        let data = {
        'title': document.querySelector("#title").value,
        'value': document.querySelector("#value").value,
        'date': fullDate,
        'color': dropdown.options[dropdown.selectedIndex].value
        }
        localStorage.setItem(localStorage.length + 1, JSON.stringify(data))
    }  
}

//Dodatkowe efekty do formularza notatki
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

//Tworzenie nowej notatki po zatwierdzeniu formularza
submitForm.addEventListener("click", function(){
    let note = new Note()
})

//Wyświetlanie notatki
function displayNote(retrievedObject, i){
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