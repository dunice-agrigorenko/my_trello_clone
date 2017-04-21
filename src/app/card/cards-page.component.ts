import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Cards } from './card';
import { ListsDisplay } from '../list/lists-page.component';
import { Lists } from '../list/list';
import { CardEditing } from './modal.component';
import { DialogService } from "ng2-bootstrap-modal";
import { DragulaModule } from 'ng2-dragula';
import { DragulaService } from 'ng2-dragula/ng2-dragula';


@Component({
    selector: 'cards',
    templateUrl: './cards-page.component.html',
    styleUrls: ['./cards-page.component.css'],
    host: {
    '(document:click)': 'handleClick($event)',
  },
})

export class CardsDisplay {
    @Input() list: Lists;
    @ViewChild("cardName") cardName: ElementRef;
    @ViewChild("newCard") newCard: ElementRef;
    @ViewChild("newCardForm") newCardForm: ElementRef;
    visibility:boolean = false;

    boardId = 0;

    constructor(private dialogService: DialogService, private dragulaService: DragulaService) {
        dragulaService.drop.subscribe((value) => {
            this.onDropModel(value);
            console.log(value)
        });
    }
    private onDropModel(args) {
        let [el, target, source] = args;
        console.log(args)
        // do something else
    }



    showAlert(title, cardid, listid) {
        this.dialogService.addDialog(CardEditing,
            { title: title, cardId: cardid, listId: listid, boardId: this.boardId },
            { closeByClickingOutside: true, backdropColor: 'rgba(0, 0, 0, 0.5)' });
    }


    add_card(title, id) {
        var dataArray = JSON.parse(localStorage.getItem("Boards"));
        this.visibility = !this.visibility
        var card = {
            id: +new Date(),
            title: title,
            comment: [],
            description: "",
        };
        if (title.trim() !== "") {
            for (let i = 0; i <= dataArray[this.boardId].lists.length; i++) {
                if (dataArray[this.boardId].lists[i].id === id) {
                    dataArray[this.boardId].lists[i].cards[dataArray[this.boardId].lists[i].cards.length] = card;
                    var serialObj = JSON.stringify(dataArray);
                    localStorage.setItem("Boards", serialObj);
                    this.list.cards = dataArray[this.boardId].lists[i].cards;
                    break;
                }
            }
        }
    }

    delete_card(id) {
        let dataArray = JSON.parse(localStorage.getItem("Boards"));
        /******* Удаление нужной нам карты из хранилища и удаление её со страницы ********/
        for (let j = 0; j < dataArray[this.boardId].lists.length; j++) {
            for (let i = 0; i < dataArray[this.boardId].lists[j].cards.length; i++) {
                if (dataArray[this.boardId].lists[j].cards[i].id == id) {
                    dataArray[this.boardId].lists[j].cards.splice(i, 1);
                    var serialObj = JSON.stringify(dataArray);
                    localStorage.setItem("Boards", serialObj);
                    this.list.cards = dataArray[this.boardId].lists[j].cards;
                    break;
                }
            }/**********************************************************************************/
        }
    }

    new_card_form_vis(){
        this.visibility = !this.visibility
    }

    NewCardOnEnter(event, Name, ID) { //Создание борда при нажатии ENTER  
    switch (event.keyCode) {
      case 13:
        this.visibility = true;
        this.add_card(Name, ID);
        this.cardName.nativeElement.value = "";
        break;
      case 27:
        this.visibility = !this.visibility;
        this.cardName.nativeElement.value = "";
        break;
    }
  }

  handleClick(event) {
    var clickedComponent = event.target;
    var inside = false;
    do {
      switch (clickedComponent) {
        case this.newCard.nativeElement: {
          inside = true;
        }
        case this.newCardForm.nativeElement: {
          inside = true;
        }
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.visibility = false;
      this.cardName.nativeElement.value = "";
    }
  }
}