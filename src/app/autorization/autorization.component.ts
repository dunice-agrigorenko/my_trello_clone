import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
    selector: 'autorization-page',
    templateUrl: './autorization.component.html',
    styleUrls: ['./autorization.component.css'],
})

export class Autorization implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
        AppComponent.bind(document.getElementById("header").style.display = "none");// Скрытие шапки страницы

        var dataArray = JSON.parse(localStorage.getItem("Current_user"));/**** Проверка на авторизованность пользователя ****/
        if (dataArray !== null) { // Если пользователь авторизован, то перенаправляем его на страницу досок
            this.router.navigate(['/boards']);
            AppComponent.bind(document.getElementById("header").style.display = "block");
        }/***********************************************************************************************************/
    }

    autorization_check(name, pass) {
        var dataArray = JSON.parse(localStorage.getItem("User")); // парсинг данных из хранилища, для проверки авторизации

        if ((name.length < 4) || (pass.length < 6)) { //Проверка на количество введенных символов
            console.log("Short user name");
            return;
        }

        for (let i = 0; i < dataArray.length; i++)
            if ((dataArray[i].name == name) && (dataArray[i].password == pass)) { // Проверка на совпадение введенны данных с данными в хранилище (пока что только для первого значения)
                /******************** Запись в хранилище имени пользователя ***********************/
                var currentUser = JSON.parse(localStorage.getItem("Current_user"));
                currentUser = [];
                var user_data = {
                    id: dataArray[i].id,
                    name: dataArray[i].name
                }
                currentUser[currentUser.length] = user_data;
                var serialObj = JSON.stringify(currentUser);
                localStorage.setItem('Current_user', serialObj);
                /**********************************************************************************/

                /***************** Стилизация формы ввода при корректных данных *******************/
                (<HTMLInputElement>document.getElementById("username")).disabled = true;
                (<HTMLInputElement>document.getElementById("password")).disabled = true;
                document.getElementById("username").style.backgroundColor = "#595959";
                document.getElementById("username").style.color = "white";
                document.getElementById("password").style.backgroundColor = "#595959";
                document.getElementById("password").style.color = "white";
                /**********************************************************************************/

                setTimeout(() => { /****** Отображение галочек и надписи, если данные введены верно *******/
                    document.getElementById("nam").style.opacity = "1";
                    document.getElementById("pas").style.opacity = "1";
                    document.getElementById("success").style.opacity = "1";
                    document.getElementById("success").innerHTML = "Successful";
                    document.getElementById("success").style.color = "cadetblue";
                    document.getElementById("success").style.textShadow = "0px 0px 5px #0e3";
                    document.getElementById("success").style.margin = "-100px 63px";
                    document.getElementById("success").style.fontSize = "30px";
                }, 200);/**********************************************************************************/

                setTimeout(() => { /* перенаправление на страницу с досками, при правильно введенных данных*/
                    this.router.navigate(['/boards']);
                    AppComponent.bind(document.getElementById("header").style.display = "block");
                }, 1200);/**********************************************************************************/

            } else { /***************** Отображение надписи при неверных данных ****************/
                document.getElementById("success").style.opacity = "1";
                document.getElementById("success").innerHTML = "Wrong user name or password";
                document.getElementById("success").style.color = "brown";
                document.getElementById("success").style.textShadow = "0px 0px 5px #4d0000";
                document.getElementById("success").style.margin = "-97px -16px";
                document.getElementById("success").style.fontSize = "25px";
            }/**********************************************************************************/
    }
    /***************** Смена форм регистрации и авторизации ******************/
    create_new() {
        document.getElementById("register-form").style.display = "block";
        document.getElementById("login-form").style.display = "none";
    }
    sign_in() {
        document.getElementById("register-form").style.display = "none";
        document.getElementById("login-form").style.display = "block";
    }/************************************************************************/

    registr(NAME, PASSWORD, CONFIRM_PASS) {/*********************** Клик на кнопку регистрации ************************/

        if ((NAME.length < 4) || (PASSWORD.length < 6)) { /*Проверка на количество введенных символов*/
            console.log("Short user name or password");
            return;
        }/********************************************************************************************/
        var dataArray = JSON.parse(localStorage.getItem("User"));
        if (dataArray == null) { dataArray = [] }
        NAME = NAME.trim();

        for (let i = 0; i < dataArray.length; i++) { /* проверка на существование пользователя с введенным именем */
            if (dataArray[i].name == NAME) {
                console.log('A user with this name already exists');
                return;
            }
        }/*********************************************************************************************************/

        if (PASSWORD == CONFIRM_PASS) { /******* проверка на совпадение введенных паролей ******/

            var obj = {
                id: +new Date(),
                name: NAME,
                password: PASSWORD,
            };

            dataArray[dataArray.length] = obj;
            var serialObj = JSON.stringify(dataArray);
            localStorage.setItem('User', serialObj);
            console.log("successfully registred")
            /**********************************************************************************/

        } else { /************************ Если пароли не совпадают ************************/
            console.log("Passwords do not match")
        }/**********************************************************************************/
    }
}