import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Cards } from './card';
import { ListsDisplay } from '../list/lists-page.component';
import { Lists } from '../list/list';
import { CardEditing } from './modal.component';
import { DialogService } from "ng2-bootstrap-modal";
import { DragulaModule } from 'ng2-dragula';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'cards',
    templateUrl: './cards-page.component.html',
    styleUrls: ['./cards-page.component.css'],
    host: {
        '(document:click)': 'outClick($event)',
    },
})

export class CardsDisplay {
    @Input() list: Lists;
    new_card_name: string;
    @ViewChild("newCard") newCard: ElementRef;
    @ViewChild("newCardForm") newCardForm: ElementRef;
    visibility: boolean = false;

    boardId = 0;//?

    private id: number;
    private subscription: Subscription;

    constructor(
        private dialogService: DialogService,
        private dragulaService: DragulaService,
        private route: ActivatedRoute,
        private router: Router) {

        this.subscription = route.params.subscribe(params => this.id = params['id']);
        let dataArray = JSON.parse(localStorage.getItem("Boards"));
        for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i].id == this.id) {
                this.boardId = i;
                break;
            }
        }

        /***************************** Код ниже нужен для драг энд дропа TODO *********************************/
        dragulaService.drop.subscribe((value) => {
            this.onDropModel(value);
        });

    }

    private onDropModel(args) {
        let [el, target, source] = args;
        console.log(args);
    }/*****************************************************************************************************/


    showAlert(title, cardid, listid) { /* Вызов модального окна при клике на карту */
        this.dialogService.addDialog(CardEditing,
            { title: title, cardId: cardid, listId: listid, boardId: this.boardId },
            { closeByClickingOutside: true, backdropColor: 'rgba(0, 0, 0, 0.55)' });
    }


    add_card(id) { /* Добавление карты */
        var dataArray = JSON.parse(localStorage.getItem("Boards"));
        this.visibility = !this.visibility;
        var card = {
            id: +new Date(),
            title: this.new_card_name,
            comment: [],
            description: "",
        };
        if (this.new_card_name.trim() !== "") {
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
        this.new_card_name = "";
    }

    delete_card(id) {/**** Удаление нужной нам карты из хранилища и удаление её со страницы ****/
        let dataArray = JSON.parse(localStorage.getItem("Boards"));

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

    new_card_form_vis() { /* Отображение формы для ввода новой карты, при клике на соотв. эл-т */
        this.visibility = !this.visibility;
    }

    NewCardOnEnter(event, ID) { /* Создание борда при нажатии ENTER */
        switch (event.keyCode) {
            case 13:
                this.visibility = true;
                this.add_card(ID);
                break;
            case 27:
                this.visibility = !this.visibility;
                this.new_card_name = "";
                break;
        }
    }

    outClick(event) { /* Проверка на клик вне формы создания новой карты */
        var clickedComponent = event.target;
        var inside = false;
        do {
            switch (clickedComponent) {
                case this.newCard.nativeElement: {
                    console.log(this.newCard.nativeElement.parentNode)
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
            this.new_card_name = "";
        }
    }
}