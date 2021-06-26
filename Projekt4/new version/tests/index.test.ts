import { FirebaseStorage } from '../src/FirebaseStorage';
import { IAppStorage } from '../src/IAppStorage';

describe('notes_from_app',  () =>{

    const note: IAppStorage = {
        id: 1,
        title: "jest test 1",
        description: "test disc",
        color: "red",
        date: new Date().toDateString(),
    };

    const firestore = new FirebaseStorage();

    it('addNote', async () => {

        const returnNote = await firestore.addNote(note);
        

        expect(returnNote).toBe(myNote);
    })