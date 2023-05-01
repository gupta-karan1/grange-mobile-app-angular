import {
  AfterViewInit,
  Component,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { ContentChange, QuillEditorComponent, QuillModule } from 'ngx-quill';
import { NotepadModalPage } from '../notepad-modal/notepad-modal.page';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.page.html',
  styleUrls: ['./notepad.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    QuillModule,
    NotepadModalPage,
  ],
})
export class NotepadPage implements OnInit {
  // Install quill package using https://www.npmjs.com/package/ngx-quill?activeTab=readme
  // npm i ngx-quill
  //npm i --save-dev @types/quill

  @ViewChild(QuillEditorComponent) editor!: QuillEditorComponent;
  // the above code is to get the editor component from the html file and store it in the editor variable of type QuillEditorComponent which is imported from the ngx-quill package

  myText = null;
  @Output() wordCount = 0; // this is the word count of the text in the editor and output is used to pass the data to the child component which is the notepad-modal page

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}
  async preview() {
    console.log(this.myText);
    const modal = await this.modalCtrl.create({
      // this creates the modal and passes the data to the modal
      component: NotepadModalPage, // this is the modal page
      componentProps: {
        data: this.myText, // this is the data that is passed to the modal
        wordCount: this.wordCount, // this is the word count of the text in the editor
      },
    });
    await modal.present();
  }
  async clearEditor() {
    this.editor.quillEditor.setText(''); // this clears the editor content

    const toast = await this.toastCtrl.create({
      message: 'Note cleared',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  getWordCount() {
    // this function gets the word count of the text in the editor
    const text = this.editor.quillEditor.getText(); // this gets the text from the editor
    const words = text.match(/\w+/g); // this matches the words in the text and stores it in the words variable as an array of words
    // the above code is a regular expression that matches the words in the text
    // \w matches any word character (equal to [a-zA-Z0-9_])
    // + matches between one and unlimited times, as many times as possible, giving back as needed (greedy)
    // g modifier: global. All matches (don't return after first match)
    // the above code is from https://www.regular-expressions.info/wordboundaries.html
    this.wordCount = words ? words.length : 0; // this gets the length of the words array and stores it in the wordCount variable if the words array is not null else it stores 0 in the wordCount variable
  }

  // ngAfterViewInit(): void {
  //   this.editor.onContentChanged.subscribe(async (change: ContentChange) => {
  //     console.log('change', change);
  //   });
  // }
}
