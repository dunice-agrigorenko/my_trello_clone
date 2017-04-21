import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BoardsPage } from './board/boards-page.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(document:click)': 'handleClick($event)',
  },
})

export class AppComponent implements OnInit {
  @ViewChild('showInfo') info: ElementRef;
  @ViewChild('infoCard') infocard: ElementRef;
  @ViewChild('showUser') user: ElementRef;
  @ViewChild('userCard') usercard: ElementRef;
  @ViewChild('showNotif') notif: ElementRef;
  @ViewChild('notifCard') notifcard: ElementRef;

  title = "Trello clone";
  USER_NAME = "";
  notif_content = "No Notifications";
  visibility_notif: boolean = false;
  visibility_info: boolean = false;
  visibility_user: boolean = false;

  constructor(private router: Router, myElement: ElementRef) { };

  ngOnInit() {
    var Current_user = JSON.parse(localStorage.getItem("Current_user"));
    if (Current_user !== null) {
      this.USER_NAME = Current_user[0].name;
    } else {
      this.router.navigate(['/autorization']);
    }
  }
  log_out() {
    // var Current_user = JSON.parse(localStorage.getItem("Current_user"));
    // this.close_window();
    // localStorage.removeItem("Current_user");
  }
  //---------------------------------------------------------------- отображения окна информации
  show_info() {
    this.visibility_info = !this.visibility_info;
  }
  //---------------------------------------------------------------- отображение окна notifications
  show_notif() {
    this.visibility_notif = !this.visibility_notif;
  }
  //---------------------------------------------------------------- отображения окна пользователя
  show_user() {
    var dataArray = JSON.parse(localStorage.getItem("User"));
    if (dataArray == null) {
      return;
    } else {
      this.visibility_user = !this.visibility_user;
    }
  }
  //-----------------------------------------------------------------------------------------------
  close_window(argument) {
    switch (argument) {
      case this.visibility_user:
        this.visibility_user = !this.visibility_user;
        break;

      case this.visibility_notif:
        this.visibility_notif = !this.visibility_notif;
        break;

      case this.visibility_info:
        this.visibility_info = !this.visibility_info;
        break;
    }
  }
  
//Проверка клика вне элемента new_board (взято с http://4dev.tech/2016/03/angular2-tutorial-detecting-clicks-outside-the-component/)
  handleClick(event) {
    var clickedComponent = event.target;
    var inside;
    do {
      switch (clickedComponent) {
        case this.user.nativeElement: {
          inside = true;
          this.visibility_info = false;
          this.visibility_notif = false;
          break;
        } case this.usercard.nativeElement: {
          inside = true;
          this.visibility_info = false;
          this.visibility_notif = false;
          break;
        } case this.info.nativeElement: {
          inside = true;
          this.visibility_notif = false;
          this.visibility_user = false;
          break;
        } case this.infocard.nativeElement: {
          inside = true;
          this.visibility_notif = false;
          this.visibility_user = false;
          break;
        } case this.notif.nativeElement: {
          inside = true;
          this.visibility_info = false;
          this.visibility_user = false;
          break;
        } case this.notifcard.nativeElement: {
          inside = true;
          this.visibility_info = false;
          this.visibility_user = false;
          break;
        }
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.close_window(true);
    }
  }
}