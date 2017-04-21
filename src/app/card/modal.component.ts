import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Cards } from './card';

export interface AlertModel {
  listId: number;
  boardId: number;
  cardId: number;
  title: string;
  comment: any;
  description: String | number;
}

@Component({
  selector: 'card-editing',
  styleUrls: ['./modal.component.css'],
  templateUrl: `./modal.component.html`,
})
export class CardEditing extends DialogComponent<AlertModel, null> implements AlertModel, OnInit {

  @ViewChild("descriptForm") closet: ElementRef;
  visibility: boolean = false;
  listId;
  cardId;
  boardId;
  title;
  comment;
  description;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
    var dataArray = JSON.parse(localStorage.getItem("Boards"));
    for (let j = 0; j < dataArray[this.boardId].lists.length; j++) {
      for (let i = 0; i < dataArray[this.boardId].lists[j].cards.length; i++) {
        if (dataArray[this.boardId].lists[j].cards[i].id == this.cardId) {
          this.comment = dataArray[this.boardId].lists[j].cards[i].comment;
          this.description = dataArray[this.boardId].lists[j].cards[i].description;
          break;
        }
      }
    }
  }

  edit_descript(descript) {
    this.visibility = !this.visibility;
    var dataArray = JSON.parse(localStorage.getItem("Boards"));
    for (let j = 0; j < dataArray[this.boardId].lists.length; j++) {
      for (let i = 0; i < dataArray[this.boardId].lists[j].cards.length; i++) {
        if (dataArray[this.boardId].lists[j].cards[i].id == this.cardId) {
          dataArray[this.boardId].lists[i].cards[i].description = descript;
          var serialObj = JSON.stringify(dataArray);
          localStorage.setItem("Boards", serialObj);
          this.description = descript;
          break;
        }
      }
    }
  }

  add_comment(new_comment) {
    var dataArray = JSON.parse(localStorage.getItem("Boards"));
    var comment = {
      id: +new Date,
      title: new_comment,
    }
    if (new_comment.trim() !== "")
      for (let j = 0; j < dataArray[this.boardId].lists.length; j++) {
        if (dataArray[this.boardId].lists[j].id == this.listId) {
          for (let i = 0; i < dataArray[this.boardId].lists[j].cards.length; i++) {
            if (dataArray[this.boardId].lists[j].cards[i].id == this.cardId) {
              dataArray[this.boardId].lists[j].cards[i].comment[dataArray[this.boardId].lists[j].cards[i].comment.length] = comment;
              var serialObj = JSON.stringify(dataArray);
              localStorage.setItem("Boards", serialObj);
              this.comment = dataArray[this.boardId].lists[j].cards[i].comment;
              break;
            }
          }
        }
      }
  }

  delete_comment(id) { //TODO
    console.log(id);
  }
  edit_comment(id) {
    console.log(id);
  }

  description_form() {
    this.visibility = !this.visibility
  }
}
