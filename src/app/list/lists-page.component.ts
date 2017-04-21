import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Cards } from '../card/card';
import { Subscription } from 'rxjs/Subscription';
import { CardsDisplay } from '../card/cards-page.component';
import { ListName } from './list-name.component';

var CARDS: Cards[] = [];

@Component({
  selector: 'board',
  templateUrl: './lists-page.component.html',
  styleUrls: ['./lists-page.component.css'],
  host: {
    '(document:click)': 'outClick($event)',
  },
})

export class ListsDisplay implements OnInit, OnDestroy {
  @ViewChild("newListName") newList: ElementRef;
  @ViewChild("createListForm") createListForm: ElementRef;
  @ViewChild("createList") createList: ElementRef;
  @ViewChild("editList") editList: ElementRef;
  visibility: boolean = false;
  title = ''; /* название страницы */
  boardId = 0; /* № доски в localStorage */
  lists = []; /* Переменная в которую записываются листы */
  cards = CARDS;

  private id: number;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.subscription = route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() { /* При загрузке: */
    let dataArray = JSON.parse(localStorage.getItem("Boards"));
    // let id = +this.route.snapshot.params['id']; //id страницы

    /************************ Смена имени страницы ************************/
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].id == this.id) {
        this.title = dataArray[i].title;
        this.boardId = i;
        break;
      }
    }/*********************************************************************/

    /********************************* Отрисовка листов *********************************/
    for (let i = 0; i < dataArray[this.boardId].lists.length; i++) {
      this.lists = dataArray[this.boardId].lists;
    }/***********************************************************************************/
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  add_new_list(name) { /* Добавление нового листа */
    var dataArray = JSON.parse(localStorage.getItem("Boards"));
    this.visibility = !this.visibility;

    (<HTMLInputElement>document.getElementById("new_list_name")).value = "";

    var list = {
      id: +new Date(),
      title: name,
      cards: this.cards,
    };

    /************** Добавление новых листов в хранилище и отображение на странице ***************/
    for (let i = 0; i <= dataArray[this.boardId].lists.length; i++) {
      if (name.trim() !== "") {
        dataArray[this.boardId].lists[dataArray[this.boardId].lists.length] = list;
        var serialObj = JSON.stringify(dataArray);
        localStorage.setItem("Boards", serialObj);
        this.lists = dataArray[this.boardId].lists;
        break;
      }
    }/*******************************************************************************************/
  }

  delete_list(id) { /* Удаление листа */
    let dataArray = JSON.parse(localStorage.getItem("Boards"));

    /******* Удаление нужного нам листа из хранилища и удаление его со страницы ********/
    for (let i = 0; i <= dataArray[this.boardId].lists.length; i++) {
      if (dataArray[this.boardId].lists[i].id == id) {
        dataArray[this.boardId].lists.splice(i, 1);
        break;
      }
    }/**********************************************************************************/

    var serialObj = JSON.stringify(dataArray);
    localStorage.setItem("Boards", serialObj);
    this.lists = dataArray[this.boardId].lists;
  }

  delete_card(listId, cardId) {
    let dataArray = JSON.parse(localStorage.getItem("Boards"));
    /******* Удаление нужной нам карты из хранилища и удаление её со страницы ********/
    for (let j = 0; j < dataArray[this.boardId].lists.length; j++)
      if (dataArray[this.boardId].lists[j].id == listId)
        for (let i = 0; i < dataArray[this.boardId].lists[j].cards.length; i++) {
          if (dataArray[this.boardId].lists[j].cards[i].id == cardId) {
            dataArray[this.boardId].lists[j].cards.splice(i, 1);
            break;
          }
        }/**********************************************************************************/

    var serialObj = JSON.stringify(dataArray);
    localStorage.setItem("Boards", serialObj);
    this.lists = dataArray[this.boardId].lists;
  }

  new_list_form() { /* Отображение формы ввода листа */
    this.visibility = !this.visibility;
  }

  NewListOnEnter(event, Name) { //Создание борда при нажатии ENTER
    switch (event.keyCode) {
      case 13:
        this.visibility = true;
        this.add_new_list(Name);
        break;
      case 27:
        this.visibility = !this.visibility;
        this.newList.nativeElement.value = "";
        break;
    }
  }
  outClick(event) { /* Проверка клика вне эл-та */
    var clickedComponent = event.target;
    var inside = false;
    do {
      switch (clickedComponent) {
        case this.createList.nativeElement: {
          inside = true;
        }
        case this.createListForm.nativeElement: {
          inside = true;
        }
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.visibility = false;
      this.newList.nativeElement.value = "";
    }
  }
}