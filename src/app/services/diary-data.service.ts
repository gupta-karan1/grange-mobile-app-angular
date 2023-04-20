import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  docData,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
//using the latest imports from angular firestore 7.5 version to add, delete and update documents

import { Observable } from 'rxjs';

// create an interface for the note
export interface Note {
  id?: string;
  title: string;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class DiaryDataService {
  constructor(private firestore: Firestore) {} // inject the firestore service

  // get the notes from the firestore
  getNotes(): Observable<Note[]> {
    // return an observable of type Note[]
    // create a reference to the notes collection
    const notesRef = collection(this.firestore, 'notes');
    // added the idField option to the collectionData operator
    // to get the id of the document
    return collectionData(notesRef, { idField: 'id' }) as Observable<Note[]>; // return the notes
  }

  // get Note by id from the firestore
  getNoteById(id: string): Observable<Note> {
    // return an observable of type Note
    const noteDocRef = doc(this.firestore, `notes/${id}`); // create a reference to the note document
    return docData(noteDocRef, { idField: 'id' }) as Observable<Note>; // return the note by id
  }

  // add Note to the firestore
  addNote(note: Note) {
    const notesRef = collection(this.firestore, 'notes'); // create a reference to the notes collection
    return addDoc(notesRef, note); // add the note to the firestore
  }

  // delete note from the firestore
  deleteNoteById(note: Note) {
    const noteDocRef = doc(this.firestore, `notes/${note.id}`); // create a reference to the note document
    return deleteDoc(noteDocRef); // delete the note from the firestore
  }

  // update note in the firestore
  updateNoteById(note: Note) {
    const noteDocRef = doc(this.firestore, `notes/${note.id}`); // create a reference to the note document
    return updateDoc(noteDocRef, { title: note.title, text: note.text }); // update the note in the firestore with the new title and text passed in the note object
  }
}
