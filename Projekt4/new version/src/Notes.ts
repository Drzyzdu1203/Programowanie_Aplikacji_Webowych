import { AppStorage } from "./appStorage";
import { IAppStorage } from "./IAppStorage";

export class Notes {

  async notesDisplay() {
    
    const a = new AppStorage();
    
    const storage = a.getData();

    for (let i = 0; i < storage.length; i++) {

      const mainDiv = document.createElement("div");
      mainDiv.className = "mainDivClass";
      mainDiv.setAttribute("id", "note" + storage[i].id);
      mainDiv.style.borderColor = storage[i].color;

      const divTop = document.createElement("div");
      divTop.className = "divTopClass";

      const divTitle = document.createElement("h1");
      divTitle.innerHTML = storage[i].title;

      const divDescription = document.createElement("p");
      divDescription.innerHTML = storage[i].description;

      const divDate = document.createElement("p");
      divDate.innerHTML = storage[i].date;

      const push = document.getElementById("container");
      push.appendChild(mainDiv);
      mainDiv.appendChild(divTop);
      mainDiv.appendChild(divTitle);
      mainDiv.appendChild(divDescription);
      mainDiv.appendChild(divDate);
    }
  }
}
