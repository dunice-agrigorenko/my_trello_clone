import { Component, OnChanges } from '@angular/core';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfo {
  name = 'User information page!';
  id = '';
  date;

  ngOnInit() {
    var time = new Date()
    var testdate = time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear() + ' ' + time.getHours() + ':' + time.getMinutes();
    var Current_user = JSON.parse(localStorage.getItem("Current_user"));
    this.name = 'User Name = ' + Current_user[0].name;
    this.id = 'User ID = ' + Current_user[0].id;
    this.date = 'Current date = ' + testdate
  }
}
