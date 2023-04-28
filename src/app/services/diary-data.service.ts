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
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';

//using the latest imports from angular firestore 7.5 version to add, delete and update documents

import { Observable, map } from 'rxjs';

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

export interface Event {
  id?: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
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

  //getTasks from the firestore and filter the tasks that are not done yet and return them as an observable
  getTasks(): Observable<Task[]> {
    // return an observable of type Task[]
    const tasksRef = collection(this.firestore, 'tasks'); // create a reference to the tasks collection
    const taskQuery = query(tasksRef, where('done', '==', false)); // filter the tasks that are not done yet
    const taskOptions = { idField: 'id' }; // added the idField option to the collectionData operator to get the id of the document
    return collectionData(taskQuery, taskOptions) as Observable<Task[]>; // return the tasks that are not done yet
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
    // return addDoc(tasksRef, { ...task, done: false }); // add the task to the firestore and mark it as not done
    //add the task to the firestore
    return addDoc(tasksRef, task);
  }

  // delete task from the firestore
  deleteTaskById(task: Task) {
    const taskDocRef = doc(this.firestore, `tasks/${task.id}`); // create a reference to the task document
    return deleteDoc(taskDocRef); // delete the task from the firestore
  }

  // update task details like the title and text in the firestore
  updateSingleTaskById(task: Task) {
    const taskDocRef = doc(this.firestore, `tasks/${task.id}`); // create a reference to the task document
    return updateDoc(taskDocRef, {
      // update the task in the firestore with the new title and text passed in the task object
      title: task.title,
      text: task.text,
      done: task.done, // update the done status of the task
    }); // update the task in the firestore with the new title and done passed in the task object
  }

  //get done tasks from the firestore and return them as an observable of type Task[] to be displayed in the done tasks section
  getDoneTasks(): Observable<Task[]> {
    // return an observable of type Task[]
    const tasksRef = collection(this.firestore, 'tasks'); // create a reference to the tasks collection
    const taskQuery = query(tasksRef, where('done', '==', true)); // filter the tasks that are done already
    const taskOptions = { idField: 'id' }; // added the idField option to the collectionData operator to get the id of the document
    return collectionData(taskQuery, taskOptions) as Observable<Task[]>; // return the tasks that are done already
  }

  //update the done status of the task in the firestore by passing the task id and event to toggle the done status of the task in the firestore
  updateTaskById(taskId: string, event: any) {
    const taskDocRef = doc(this.firestore, `tasks/${taskId}`); // create a reference to the task document
    return updateDoc(taskDocRef, { done: event.detail.checked }); // update the done status of the task in the firestore // remember to pass the event.detail.checked to the updateDoc method and not just event.detail
  }

  //delete all the tasks that are done from the firestore by passing the task id and event to toggle the done status of the task in the firestore
  async deleteDoneTasks() {
    const tasksRef = collection(this.firestore, 'tasks'); // create a reference to the tasks collection
    const taskQuery = query(tasksRef, where('done', '==', true)); // filter the tasks that are done already
    return getDocs(taskQuery).then((querySnapshot) => {
      // get the tasks that are done already
      querySnapshot.forEach((doc) => {
        // loop through the tasks that are done already
        deleteDoc(doc.ref); // delete the task from the firestore
      });
    });
  }

  //add event to the firestore
  addEvent(event: Event) {
    const eventsRef = collection(this.firestore, 'events'); // create a reference to the events collection
    return addDoc(eventsRef, event); // add the event to the firestore
  }

  // // get the events from the firestore
  // getEvents(): Observable<Event[]> {
  //   // return an observable of type Event[]
  //   // create a reference to the events collection
  //   const eventsRef = collection(this.firestore, 'events');
  //   // added the idField option to the collectionData operator
  //   // to get the id of the document
  //   return collectionData(eventsRef, { idField: 'id' }) as Observable<Event[]>; // return the events
  // }

  //get events from firestore and map the Firestore Timestamp objects to Date objects with the appropriate format
  getEvents(): Observable<Event[]> {
    // return an observable of type Event[]
    // create a reference to the events collection
    const eventsRef = collection(this.firestore, 'events');
    // added the idField option to the collectionData operator
    // to get the id of the document
    return collectionData(eventsRef, { idField: 'id' }).pipe(
      map((events) =>
        events.map((event) => {
          // convert the Firestore Timestamp objects to Date objects with the appropriate format
          return {
            id: event['id'],
            title: event['title'],
            description: event['description'],
            startTime: new Date(event['startTime'].seconds * 1000), // convert the Firestore Timestamp objects to Date objects with the appropriate format
            endTime: new Date(event['endTime'].seconds * 1000), // convert the Firestore Timestamp objects to Date objects with the appropriate format
          };
        })
      )
    );
  }

  //get event by id from the firestore
  // getEventById(id: string): Observable<Event> {
  //   // return an observable of type Event
  //   const eventDocRef = doc(this.firestore, `events/${id}`); // create a reference to the event document
  //   return docData(eventDocRef, { idField: 'id' }) as Observable<Event>; // return the event by id
  // }

  // get event by id and map the Firestore Timestamp objects to Date objects with the appropriate format
  getEventById(id: string): Observable<Event> {
    // return an observable of type Event
    const eventDocRef = doc(this.firestore, `events/${id}`); // create a reference to the event document
    return docData(eventDocRef, { idField: 'id' }).pipe(
      map((event) => {
        // convert the Firestore Timestamp objects to Date objects with the appropriate format
        return {
          id: event['id'],
          title: event['title'],
          description: event['description'],
          startTime: new Date(event['startTime'].seconds * 1000), // convert the Firestore Timestamp objects to Date objects with the appropriate format
          endTime: new Date(event['endTime'].seconds * 1000), // convert the Firestore Timestamp objects to Date objects with the appropriate format
        };
      })
    );
  }

  async updateEvent(event: Event) {
    const eventDocRef = doc(this.firestore, `events/${event.id}`); // create a reference to the event document
    return updateDoc(eventDocRef, {
      // update the event in the firestore with the new title and text passed in the event object
      title: event.title,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
    }); // update the event in the firestore
  }

  //delete event from the firestore
  deleteEventById(event: Event) {
    const eventDocRef = doc(this.firestore, `events/${event.id}`); // create a reference to the event document
    return deleteDoc(eventDocRef); // delete the event from the firestore by passing the event id to the deleteDoc method to delete the event document
  }

  // // update an existing event in the firestore
  // async updateEvent(event: Event) {
  //   // create a reference to the event document
  //   const eventRef = this.firestore.doc(`events/${event.id}`);
  //   // update the event document
  //   await eventRef.update(event);
  // }

  // // delete an existing event from the firestore
  // async deleteEvent(event: Event) {
  //   // create a reference to the event document
  //   const eventRef = this.firestore.doc(`events/${event.id}`);
  //   // delete the event document
  //   await eventRef.delete();
  // }
}
