import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { AppComponent } from '../app.component'
import { BoardsArray } from './boards-array';
import { Lists } from '../list/list';
import { Router } from '@angular/router';

let LISTS: Lists[] = []

@Component({
  selector: 'boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.css'],
  host: {
    '(document:click)': 'outClick($event)',
  },
})

export class BoardsPage implements OnInit {

  newBoardTitle = "Create new board...";
  title = "Boards page";
  lists = LISTS;
  boards_array: Array<BoardsArray> = [];
  visibility_newBoard: boolean = true;
  edited_name: String;
  new_board_name: string = "";

  public elementRef;

  constructor(private router: Router, myElement: ElementRef) {
    this.elementRef = myElement;
  }

  ngOnInit() { //Прорисовка бордов при инициализации страницы
    var dataArray = JSON.parse(localStorage.getItem("Boards"));
    this.boards_array = dataArray;
  }

  create_board() { //Функция создания борда
    var dataArray = JSON.parse(localStorage.getItem("Boards"));
    if (dataArray == null) { // Если объект localStorage отсутствует, то создаем пустой объект
      dataArray = [];
    }
    if (this.new_board_name.trim() == '') {
      return;
    }
    var obj = {
      id: +new Date(),
      title: this.new_board_name,
      lists: this.lists,
    };
    dataArray[dataArray.length] = obj;
    var serialObj = JSON.stringify(dataArray);
    localStorage.setItem("Boards", serialObj);
    this.boards_array = dataArray;
  }

  //------------------------------------------------------------------------------------------
  new_board() { //Отрисовка формы для создания нового борда с формой ввода
    this.visibility_newBoard = !this.visibility_newBoard;
    this.new_board_name = '';
  }

  old_board() { //Отрисовка формы для создания нового борда без формы ввода
    this.visibility_newBoard = !this.visibility_newBoard;
  }
  //------------------------------------------------------------------------------------------

  boardName_change(value) {
    this.boards_array = value
  }

  NewBoardOnEnter(event) { //Создание борда при нажатии ENTER
    if (event.keyCode == 13) {
      this.create_board();
      this.old_board();
    } else if (event.keyCode == 27) {
      this.old_board();
    }
  }

  //Проверка клика вне элемента new_board (взято с http://4dev.tech/2016/03/angular2-tutorial-detecting-clicks-outside-the-component/)
  outClick(event) {
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.visibility_newBoard = true;
    }
  }//---------------------------------------------------------------------------------------------------------------------------------
}