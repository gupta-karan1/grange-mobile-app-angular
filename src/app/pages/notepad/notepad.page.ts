import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { QuillEditorComponent, QuillModule } from 'ngx-quill';
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

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  async preview() {
    console.log(this.myText);
    const modal = await this.modalCtrl.create({
      component: NotepadModalPage,
      componentProps: {
        data: this.myText,
      },
    });
    await modal.present();
  }
  clearEditor() {
    this.editor.quillEditor.setText('');
  }
}
