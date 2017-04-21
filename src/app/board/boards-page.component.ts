import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('newForm') newform: ElementRef;
  @ViewChild('newBoard') newboard: ElementRef;
  @ViewChild('entername') entername: ElementRef;

  newBoardTitle = 'Create new board...';
  title = 'Boards page';
  boards_array: Array<BoardsArray> = [];
  lists = LISTS;
  visibility_newBoard: boolean = true;
  visibility_newForm: boolean = false;
  edited_name: String;

  constructor(private router: Router) { }

  ngOnInit() { //Прорисовка бордов при инициализации страницы
    var dataArray = JSON.parse(localStorage.getItem("Boards"));
    this.boards_array = dataArray;
  }

  create_board(Name) { //Функция создания борда
    var dataArray = JSON.parse(localStorage.getItem("Boards"));
    if (dataArray == null) { // Если объект localStorage отсутствует, то создаем пустой объект
      dataArray = [];
    }
    Name.trim(); //обрезаем пробелы
    if (Name == '') {
      return;
    }
    var obj = {
      id: +new Date(),
      title: Name,
      lists: this.lists,
    };
    dataArray[dataArray.length] = obj;
    var serialObj = JSON.stringify(dataArray);
    localStorage.setItem("Boards", serialObj);
    this.boards_array = dataArray;
  }

  //------------------------------------------------------------------------------------------
  new_board() { //Отрисовка формы для создания нового борда с формой ввода
    this.visibility_newForm = !this.visibility_newForm;
    this.visibility_newBoard = !this.visibility_newBoard;
    this.entername.nativeElement.value = '';
  }

  old_board() { //Отрисовка формы для создания нового борда без формы ввода
    if (this.visibility_newForm == true) {
      this.visibility_newForm = !this.visibility_newForm;
      this.visibility_newBoard = !this.visibility_newBoard;
    }
  }
  //------------------------------------------------------------------------------------------

  boardName_change(value) {
    this.boards_array = value
  }

  NewBoardOnEnter(event, Name) { //Создание борда при нажатии ENTER
    if (event.keyCode == 13) {
      this.create_board(Name);
      this.old_board();
    } else if (event.keyCode == 27) {
      this.old_board();
    }
  }
  EditBoardOnEnter(event, ID) { //Создание борда при нажатии ENTER
    if (event.keyCode == 13) {
      this.confirm(ID);
    } else if (event.keyCode == 27) {
      this.cancel_editing(ID)
    }
  }

  delete_board(id) { //удаление отдельного борда
    var dataArray = JSON.parse(localStorage.getItem("Boards"));

    for (var i = 0; i < dataArray.length; i++) {
      if (dataArray[i].id == id) {
        dataArray.splice(i, 1);
        break;
      }
    }

    var serialObj = JSON.stringify(dataArray);
    localStorage.setItem("Boards", serialObj);
    this.boards_array = dataArray;
  }

  edit_board(id, title) { /* Форма для редактирования имени доски */
    document.getElementById(id).style.display = "block";
    document.getElementById(id + 1).focus();
    (<HTMLInputElement>document.getElementById(id + 1)).value = title;
  }

  confirm(id) { /* Принятие изменений, при редактировании названия доски */
    var dataArray = JSON.parse(localStorage.getItem("Boards"));
    if (this.edited_name.trim() != "") {
      for (var i = 0; i < dataArray.length; i++) {
        if (dataArray[i].id == id) {
          dataArray[i].title = this.edited_name.trim();
          break;
        }
      }
    }
    var serialObj = JSON.stringify(dataArray);
    localStorage.setItem("Boards", serialObj);
    this.boards_array = dataArray;
    // document.getElementById(id).style.display = "none";
  }

  cancel_editing(id) {
    document.getElementById(id).style.display = "none";
  }

  //------------------------------------------------------------------------------------------------------ 
  //Проверка клика вне элемента new_board (взято с http://4dev.tech/2016/03/angular2-tutorial-detecting-clicks-outside-the-component/)
  outClick(event) {
    var clickedComponent = event.target;
    var inside = false;
    do {
      switch (clickedComponent) {
        case this.newboard.nativeElement: {
          inside = true;
          this.entername.nativeElement.focus();
        }
        case this.newform.nativeElement: {
          inside = true;
          this.entername.nativeElement.focus();
        }
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.old_board();
    }
  }
  //------------------------------------------------------------------------------------------------------
}