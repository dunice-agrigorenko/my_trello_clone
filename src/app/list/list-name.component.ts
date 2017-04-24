import { Component, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Lists } from './list';

@Component({
    selector: 'list-name',
    templateUrl: `./list-name.component.html`,
    styleUrls: [`./list-name.component.css`],
    host: {
        '(document:click)': 'outClick($event)',
    },
})

export class ListName {
    @Input() list: Lists;
    @Input() boardId;
    @Output() deleteList = new EventEmitter();
    value: string;
    visibility: boolean = false;
    public elementRef;

    constructor(myElement: ElementRef) {
        this.elementRef = myElement;
    }

    edit_list() {
        this.visibility = !this.visibility;
        this.value = this.list.title;
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
        this.deleteList.emit(dataArray[this.boardId].lists);
    }

    EditListOnEnter(event, ID) { //Редактирование листа при нажатии ENTER
        switch (event.keyCode) {
            case 13:
                this.confirm(this.value, ID);
                break;
            case 27:
                this.visibility = !this.visibility;
                break;
        }
    }

    confirm(value, id) { /* Редактирование листа */
        this.visibility = !this.visibility;
        let dataArray = JSON.parse(localStorage.getItem("Boards"));
        value.trim();
        if (value != "")
            for (let i = 0; i <= dataArray[this.boardId].lists.length; i++) {
                if (dataArray[this.boardId].lists[i].id == id) {
                    dataArray[this.boardId].lists[i].title = value;
                    this.list.title = value;
                    break;
                }
            }
        var serialObj = JSON.stringify(dataArray);
        localStorage.setItem("Boards", serialObj);

    }/**********************************************************************************/

    outClick(event) { /* Проверка клика вне эл-та */
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.visibility = false;
        }
    }
}