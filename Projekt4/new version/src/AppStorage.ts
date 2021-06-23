import { IAppStorage } from "./IAppStorage";
import { FirebaseStorage } from "./FirebaseStorage";
import { storageType } from "./StorageSwitch";
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
  async switchStorageType() {}

  async addNewNote() {
    const noteTitle = <HTMLInputElement>document.getElementById("titleInput");
    const title = noteTitle.value;

    const noteDescription = <HTMLInputElement>(
      document.getElementById("descriptionInput")
    );
    const description = noteDescription.value;

    const noteColor = <HTMLSelectElement>document.getElementById("colorInput");
    const color = noteColor.value;

    const check = this.checkStorageId();

    const item: IAppStorage = {
      id: check + 1,
      title: title,
      description: description,
      color: color,
      date: new Date().toDateString(),
    };
    if (storageType === "firebase") {
      const ann = new FirebaseStorage();
      ann.addNote(item);
    } else {
      this.saveData(item);
    }

    const noteId = document.getElementById("notes");
    noteId.innerHTML = "";

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
      const ls_data: IAppStorage[] = [];
      const a = JSON.parse(localStorage.getItem("note"));

      a.map((x: any) => {
        ls_data.push(x);
      });

      ls_data.push(addNewNote);
      localStorage.setItem("note", JSON.stringify(ls_data));
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
