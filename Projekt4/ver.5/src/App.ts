import {Notes} from "./notes";
import {Note} from "./note";

export default class App {
 
  storageElement: number = 0;

  constructor() {
    this.addNote();
  }
  addNote() {
    const clickAddButton = <HTMLInputElement>(
      document.getElementById("mainButton")
    );
    clickAddButton.addEventListener("click", (ev: Event) => this.addNewNote());
  }
  async addNewNote(){
    const noteTitle = <HTMLInputElement>document.getElementById('titleInput');
    const title = noteTitle.value;

    const noteDescription = <HTMLInputElement>document.getElementById('descriptionInput');
    const description = noteDescription.value;  
  }
}


