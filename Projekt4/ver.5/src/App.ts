//import { Notes } from "./notes";
//import { Note } from "./note";
import { IAppStorage } from "./IAppStorage";

export default class App {
  storageElement: number = 0;
  notes: IAppStorage[] = [];

  constructor() {
    this.addNote();
    this.notesInStorage();
  }
  addNote() {
    const clickAddButton = <HTMLInputElement>(
      document.getElementById("mainButton")
    );
    clickAddButton.addEventListener("click", (ev: Event) => this.addNewNote());
  }
  async addNewNote() {
    const noteTitle = <HTMLInputElement>document.getElementById("titleInput");
    const title = noteTitle.value;

    const noteDescription = <HTMLInputElement>(
      document.getElementById("descriptionInput")
    );
    const description = noteDescription.value;

    const item: IAppStorage = {
      id: this.storageElement + 1,
      title: title,
      description: description,
      date: new Date().toDateString(),
    };
    this.saveData(item);
  }
  saveData(addNewNote: any) {
    this.storageElement++;
    this.notes.push(addNewNote);
    localStorage.setItem(
      "note" + this.storageElement,
      JSON.stringify(addNewNote)
    );
    const result = JSON.parse(
      localStorage.getItem("note" + this.storageElement)
    );
    console.log(result);
  }

  notesInStorage() {
    const notesStorage = localStorage.length;
    for (let i = 1; i < notesStorage; i++) {
      localStorage.getItem("notes" + i);
      this.addNewNote();
    }
  }
}
