import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Cards } from './card';
import { Comment } from './comments/comment.component';

export interface AlertModel {
  listId: number;
  boardId: number;
  cardId: number;
  title: string;
  comment: any;
  description: String;
}

@Component({
  selector: 'card-editing',
  styleUrls: ['./modal.component.css'],
  templateUrl: `./modal.component.html`,
})
export class CardEditing extends DialogComponent<AlertModel, null> implements AlertModel, OnInit {

  @ViewChild("descriptForm") closet: ElementRef;
  visibility: boolean = false;
  change_card_name_val: boolean = true;
  listId;
  cardId;
  boardId;
  title;
  comment;
  description;
  newComment: string;
  newDescription: string;
  newCardName: string;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() { /* Подгрузка комментариев и описания */
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

  edit_card_name(event) {
    switch (event.keyCode) {
      case 13:
        this.change_card_name_val = true;
        this.confirm_new_card_name(this.newCardName);
        break;
      case 27:
        this.change_card_name_val = !this.change_card_name_val;
        break;
    }
  }
  confirm_new_card_name(value) {
    var dataArray = JSON.parse(localStorage.getItem("Boards"));
    for (let j = 0; j < dataArray[this.boardId].lists.length; j++) {
      for (let i = 0; i < dataArray[this.boardId].lists[j].cards.length; i++) {
        if (dataArray[this.boardId].lists[j].cards[i].id == this.cardId) {
          dataArray[this.boardId].lists[j].cards[i].title = value;
          var serialObj = JSON.stringify(dataArray);
          localStorage.setItem("Boards", serialObj);
          this.title = value;
          break;
        }
      }
    }
  }

  edit_descript() { /* Редактирование описания */
    this.visibility = !this.visibility;
    var dataArray = JSON.parse(localStorage.getItem("Boards"));
    for (let j = 0; j < dataArray[this.boardId].lists.length; j++) {
      for (let i = 0; i < dataArray[this.boardId].lists[j].cards.length; i++) {
        if (dataArray[this.boardId].lists[j].cards[i].id == this.cardId) {
          dataArray[this.boardId].lists[j].cards[i].description = this.newDescription;
          var serialObj = JSON.stringify(dataArray);
          localStorage.setItem("Boards", serialObj);
          this.description = this.newDescription;
          break;
        }
      }
    }
  }

  add_comment() { /* Добавление комментариев */
    var dataArray = JSON.parse(localStorage.getItem("Boards"));
    var comment = {
      id: +new Date,
      title: this.newComment,
    }
    if (this.newComment.trim() !== "") {
      for (let j = 0; j < dataArray[this.boardId].lists.length; j++) {
        if (dataArray[this.boardId].lists[j].id == this.listId) {
          for (let i = 0; i < dataArray[this.boardId].lists[j].cards.length; i++) {
            if (dataArray[this.boardId].lists[j].cards[i].id == this.cardId) {
              dataArray[this.boardId].lists[j].cards[i].comment[dataArray[this.boardId].lists[j].cards[i].comment.length] = comment; // ...
              var serialObj = JSON.stringify(dataArray);
              localStorage.setItem("Boards", serialObj);
              this.comment = dataArray[this.boardId].lists[j].cards[i].comment;
              break;
            }
          }
        }
      }
    }
  }

  comment_delete(comment) {
    this.comment = comment
  }

  description_form() { /* Отображение формы редактирования описания */
    this.visibility = !this.visibility
  }

  change_card_name() {
    this.change_card_name_val = false;
  }
}
