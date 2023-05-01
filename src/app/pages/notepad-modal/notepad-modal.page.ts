import { QuillModule } from 'ngx-quill';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-notepad-modal',
  templateUrl: './notepad-modal.page.html',
  styleUrls: ['./notepad-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, QuillModule],
})
export class NotepadModalPage implements OnInit {
  @Input() data: any;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  saveNote() {}
}
