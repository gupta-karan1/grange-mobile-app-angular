import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, SearchbarCustomEvent } from '@ionic/angular';
import { SearchStudentsPage } from 'src/app/pages/search-students/search-students.page';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SearchStudentsPage],
  selector: 'app-searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.scss'],
})
export class SearchableSelectComponent implements OnChanges {
  @Input() title = 'Search'; //input decorator to get the title from the parent component
  @Input() data!: any[]; //input decorator to get the data from the parent component
  @Input() multiple = false; //input decorator to get the multiple from the parent component if the user wants to select multiple items
  @Input() itemTextField = 'name'; //input decorator to get the itemTextField from the parent component
  @Output() selectChanged: EventEmitter<any> = new EventEmitter(); //output decorator to emit the selected items to the parent component
  isOpen = false;
  selected: any = []; // create a variable to store the selected items
  filtered: any = []; // create a variable to store the filtered items
  constructor() {}

  // ngOnInit() {}

  //ngOnChanges allows us to detect the changes in the input properties and update the component accordingly
  //SimpleChanges is an interface that stores the previous and current values of the input properties
  ngOnChanges(changes: SimpleChanges): void {
    this.filtered = this.data; // set the filtered items to the data
    //we can't do this in ngOnInit because the data is not available at that time
    // also we can't do this in constructor because it is an async function and the data is not available at that time

    // console.log(changes);
  }

  openModal() {
    // create a function to open the modal
    this.isOpen = true;
  }

  cancelModal() {
    // create a function to select the items
    const selected = this.data.filter((item) => item.selected); // this function filters the data array and returns the items that are selected
    this.selectChanged.emit(selected); // emit the selected items to the parent component
    // create a function to cancel the modal
    this.isOpen = false;
  }
  select() {
    // create a function to select the items
    const selected = this.data.filter((item) => item.selected); // this function filters the data array and returns the items that are selected
    this.selectChanged.emit(selected); // emit the selected items to the parent component

    this.isOpen = false;
  }

  // create a leaf function to get the nested object value from the parent component
  leaf = (obj: any) =>
    this.itemTextField.split('.').reduce((value, el) => value[el], obj); // this function takes the object as parameter and runs split function on the itemTextField and then runs reduce function on the split array and returns the value of the nested object
  // reference: https://stackoverflow.com/questions/8750362/using-variables-with-nested-javascript-object
  // we use this function to dynamically get the value of the nested object from the parent component

  // create a function to check if the item is selected or not
  itemSelected() {
    this.selected = this.data.filter((item) => item.selected); // this function filters the data array and returns the items that are selected

    if (!this.multiple) {
      this.selectChanged.emit(this.selected); // if the multiple is false then emit the selected items to the parent component
      // this.isOpen = false; // close the modal
    }
  }

  //create a function to filter and search the items
  filter(event: SearchbarCustomEvent) {
    const filter = event.detail.value?.toLowerCase(); // get the value from the searchbar and convert it to lowercase
    // this.filtered = this.data.filter(
    //   (item) => this.leaf(item).toLowerCase().indexOf(filter) >= 0
    // );

    this.filtered = this.data.filter((item) => {
      const itemValue = this.leaf(item).toLowerCase(); // get the value of the nested object and convert it to lowercase
      return itemValue.indexOf(filter) >= 0; // return the items that match the search query
    });
  }
}
