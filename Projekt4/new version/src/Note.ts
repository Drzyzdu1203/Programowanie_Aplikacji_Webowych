 import {AppStorage} from './AppStorage';

export class Note{

    async newNote(){

            const ann = new AppStorage();
            ann.addNewNote();
    }
}