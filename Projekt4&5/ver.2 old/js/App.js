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


for(i in localStorage)
{
    let retrievedObject = JSON.parse(localStorage.getItem(i))
    displayNote(retrievedObject, i)
}


function pinOnTopButton(divForTask){
    let button = document.createElement("div")
    button.classList.add("pinontop")
    button.innerText = "Przypnij notkę"
    divForTask.appendChild(button)
    
    button.addEventListener("click", function(){
        this.parentNode.parentNode.prepend(this.parentNode)
    })
}


function remove(id,divForTask) {
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