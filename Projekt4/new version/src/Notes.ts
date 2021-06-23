import { AppStorage } from "./AppStorage";
import { IAppStorage } from "./IAppStorage";
import { FirebaseStorage } from "./FirebaseStorage";
import { storageType } from "./StorageSwitch";

export class Notes {
  async notesDisplay() {
    
    if (storageType === "firebase") {                            // sekcja firebase
      const type = new FirebaseStorage();
      const storage = await type.getNotes();

      for (let i = 0; i < storage.length; i++) {
        const mainDiv = document.createElement("div");
        mainDiv.className = "mainDivClass";                           // wyciaganie z .data !
        mainDiv.setAttribute("id", "note" + storage[i].data.id);
        mainDiv.style.borderColor = storage[i].data.color;

        const divTitle = document.createElement("h1");
        divTitle.innerHTML = storage[i].data.title;

        const divDescription = document.createElement("p");
        divDescription.innerHTML = storage[i].data.description;

        const divDate = document.createElement("p");
        divDate.className = "DivDateClass";
        divDate.innerHTML = storage[i].data.date;

        const removeButton = document.createElement("input");
        removeButton.style.borderColor = storage[i].data.color;
        removeButton.className = "RemoveButtonClass";
        removeButton.setAttribute("type", "button");
        removeButton.setAttribute("value", "Remove");
        removeButton.setAttribute("id", "removeButton" + storage[i].id);

        removeButton.addEventListener("click", async (ev: Event) => {
          const buttonId = (ev.target as Element).id.replace(
            "removeButton",
            ""
          );
          await type.deleteNote(buttonId);

          const notesDiv = document.getElementById("notes");
          notesDiv.innerHTML = "";

          this.notesDisplay();
        });

        const push = document.getElementById("notes");
        push.appendChild(mainDiv);
        mainDiv.appendChild(divTitle);
        mainDiv.appendChild(divDescription);
        mainDiv.appendChild(divDate);
        mainDiv.appendChild(removeButton);
      }
    }
                                                                      // sekcja local storage
    if (storageType === "localStorage") {
      const type = new AppStorage();
      const storage = type.getData();
      for (let i = 0; i < storage.length; i++) {
        const mainDiv = document.createElement("div");
        mainDiv.className = "mainDivClass";
        mainDiv.setAttribute("id", "note" + storage[i].id);
        mainDiv.style.borderColor = storage[i].color;

        const divTitle = document.createElement("h1");
        divTitle.innerHTML = storage[i].title;

        const divDescription = document.createElement("p");
        divDescription.innerHTML = storage[i].description;

        const divDate = document.createElement("p");
        divDate.className = "DivDateClass";
        divDate.innerHTML = storage[i].date;

        const removeButton = document.createElement("input");
        removeButton.className = "RemoveButtonClass";
        removeButton.style.borderColor = storage[i].color;
        removeButton.setAttribute("type", "button");
        removeButton.setAttribute("value", "Remove");
        removeButton.setAttribute("id", "removeButton" + storage[i].id);

        removeButton.addEventListener("click", async (ev: Event) => {
          const buttonId = (ev.target as Element).id.replace(
            "removeButton",
            ""
          );
          const ls_data: IAppStorage[] = [];
          const x = JSON.parse(localStorage.getItem("note"));

          x.map((storage: any) => {
            if (storage.id == buttonId) {
            } else {
              ls_data.push(storage);
            }
          });

          if (x.length === 1) {
            localStorage.removeItem("note");
            const notesDiv = document.getElementById("notes");
            notesDiv.innerHTML = "";
          } else {
            const notesDiv = document.getElementById("notes");
            notesDiv.innerHTML = "";
            localStorage.setItem("note", JSON.stringify(ls_data));
            this.notesDisplay();
          }
        });

        const push = document.getElementById("notes");
        push.appendChild(mainDiv);
        mainDiv.appendChild(divTitle);
        mainDiv.appendChild(divDescription);
        mainDiv.appendChild(divDate);
        mainDiv.appendChild(removeButton);
      }
    }
  }
}
