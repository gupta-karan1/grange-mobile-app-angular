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
  DocumentData,
  query,
  where,
} from '@angular/fire/firestore';

//using the latest imports from angular firestore 7.5 version to add, delete and update documents

import { Observable } from 'rxjs';

// create an interface for the note
export interface Note {
  id?: string;
  title: string;
  text: string;
  timestamp?: string;
}

// create an interface for the task
export interface Task {
  id?: string;
  title: string;
  text: string;
  done: boolean;
  timestamp?: string;
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

  // //getTasks from the firestore
  // getTasks(): Observable<Task[]> {
  //   // return an observable of type Task[]
  //   // create a reference to the tasks collection
  //   const tasksRef = collection(this.firestore, 'tasks');
  //   // added the idField option to the collectionData operator
  //   // to get the id of the document
  //   return collectionData(tasksRef, { idField: 'id' }) as Observable<Task[]>; // return the tasks
  // }

  getTasks(): Observable<Task[]> {
    const tasksRef = collection(this.firestore, 'tasks');
    const taskQuery = query(tasksRef, where('done', '==', false));
    const taskOptions = { idField: 'id' };
    return collectionData(taskQuery, taskOptions) as Observable<Task[]>;
  }

  // get Task by id from the firestore
  getTaskById(id: string): Observable<Task> {
    // return an observable of type Task
    const taskDocRef = doc(this.firestore, `tasks/${id}`); // create a reference to the task document
    return docData(taskDocRef, { idField: 'id' }) as Observable<Task>; // return the task by id
  }

  // add Task to the firestore and mark it as not done
  addTask(task: Task) {
    const tasksRef = collection(this.firestore, 'tasks'); // create a reference to the tasks collection
    return addDoc(tasksRef, { ...task, done: false }); // add the task to the firestore and mark it as not done
  }

  // delete task from the firestore
  deleteTaskById(task: Task) {
    const taskDocRef = doc(this.firestore, `tasks/${task.id}`); // create a reference to the task document
    return deleteDoc(taskDocRef); // delete the task from the firestore
  }

  // update task in the firestore
  updateTaskById(task: Task) {
    const taskDocRef = doc(this.firestore, `tasks/${task.id}`); // create a reference to the task document
    return updateDoc(taskDocRef, { title: task.title, done: task.done }); // update the task in the firestore with the new title and done passed in the task object
  }

  //get done tasks from the firestore
  getDoneTasks(): Observable<Task[]> {
    const tasksRef = collection(this.firestore, 'tasks');
    const taskQuery = query(tasksRef, where('done', '==', true));
    const taskOptions = { idField: 'id' };
    return collectionData(taskQuery, taskOptions) as Observable<Task[]>;
  }

  addDoneTask(task: Task) {
    const tasksRef = collection(this.firestore, 'tasks'); // create a reference to the tasks collection
    return addDoc(tasksRef, { ...task, done: true }); // add the task to the firestore and mark it as done
  }
}
