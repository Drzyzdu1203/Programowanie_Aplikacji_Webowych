import firebase from "firebase";
import { firebaseConfig } from "./config";
import { IAppStorage } from "./IAppStorage";

export class FirebaseStorage{
    app: any;
    db: any;

    constructor(){

        if (!firebase.apps.length) {
            this.app = firebase.initializeApp(firebaseConfig);  //jeśli nie istnieje to zainicjuj apke
        }
        else{
            this.app = firebase.app();
        }

        this.db = this.app.firestore();         //wyciagniecie firestore z firebase
    }

    async addNote(note:IAppStorage) {                   // dodawanie notatki
        await this.db.collection('notes_from_app').add(note);
    }

    async updateNote(id: string, note: IAppStorage){                   // odświeżanie  notatki
        await this.db.collection('notes_from_app').doc(id).update(note);
    }

    async getNote(id:string){       // pobieranie pojedyńczej
        return await this.db.collection('notes_from_app').doc(id).get().then((res:any) => res.data());
    }

    async getNotes(){               //pobranie całości
        const collection = await this.db.collection('notes_from_app').get().then((res: any) => ({size: res.size, docs: res.docs}));
        return collection.docs.map((doc: any) => ({id: doc.id, data: doc.data()}));
    }
    async deleteNote(id: string){                                   //usuwanioe
        await this.db.collection('notes_from_app').doc(id).delete();
    }
}