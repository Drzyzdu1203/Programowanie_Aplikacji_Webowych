import { IAppStorage } from "./IAppStorage";
import { Notes } from "./Notes";
export class AppStorage {
  notes: IAppStorage[] = [];

  checkStorageId() {
    if (localStorage.getItem("note") === null) {
      return 0;
    } else {
      const check = JSON.parse(localStorage.getItem("note"));
      let id: number = 1;
      check.map((check: any) => {
        if (check.id > id) {
          id = check.id;
        }
      });
      return id;
    }
  }
  async addNewNote() {
    const noteTitle = <HTMLInputElement>document.getElementById("titleInput");
    const title = noteTitle.value;
    const noteDescription = <HTMLInputElement>(
      document.getElementById("descriptionInput")
    );
    const description = noteDescription.value;
    const noteColor = <HTMLSelectElement>document.getElementById("colorInput");
    const color = noteColor.value;

    const element = this.checkStorageId();

    const item: IAppStorage = {
      id: element + 1,
      title: title,
      description: description,
      color: color,
      date: new Date().toDateString(),
      pin: false,
    };

    this.saveData(item);

    const containerId = document.getElementById("container");
    containerId.innerHTML = "";

    const ann = new Notes();
    ann.notesDisplay();

    noteTitle.value = "";
    noteDescription.value = "";
  }

  saveData(addNewNote: any) {
    if (localStorage.getItem("note") === null) {
      this.notes.push(addNewNote);
      localStorage.setItem("note", JSON.stringify(this.notes));
    } else {
      const notes2: IAppStorage[] = [];
      const a = JSON.parse(localStorage.getItem("note"));

      a.map((x: any) => {
        notes2.push(x);
      });

      notes2.push(addNewNote);
      localStorage.setItem("note", JSON.stringify(notes2));
    }
  }
  getData() {
    if (localStorage.getItem("note") === null) {
      return 0;
    } else return JSON.parse(localStorage.getItem("note"));
  }

  removeData(data: any) {
    localStorage.removeItem(data);
  }
}
