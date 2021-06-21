 import {AppStorage} from './appStorage';

export class Note{

    async newNote(){

            const ann = new AppStorage();
            ann.addNewNote();
    }
}