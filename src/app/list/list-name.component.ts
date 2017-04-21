import { Component, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Lists } from './list';

@Component({
    selector: 'list-name',
    template: `<div #listName (click)="edit_list()" [style.display]="visibility==false?'inline-block':'none'">{{list.title}}</div>
               <input #editList style="padding: 4px; border: none; border-radius: 4px; box-shadow: inset 0 0 5px grey;"
                                 [style.display]="visibility==true?'inline-block':'none'"
                                 (keydown)="EditListOnEnter($event, editList.value, list.id)">`,

    styles: [`div { width: 215px; }`],
    host: {
        '(document:click)': 'outClick($event)',
    },
})

export class ListName {
    @Input() list: Lists;
    @Input() boardId;

    @ViewChild("editList") editList: ElementRef;
    @ViewChild("listName") listName: ElementRef;
    visibility: boolean = false;

    edit_list() {
        this.editList.nativeElement.value = this.list.title;
        this.visibility = !this.visibility;
    }

    EditListOnEnter(event, Name, ID) { //Редактирование листа при нажатии ENTER
        switch (event.keyCode) {
            case 13:
                this.confirm(Name, ID);
                break;
            case 27:
                this.visibility = !this.visibility;
                this.editList.nativeElement.value = this.list.title;
        }
    }
    confirm(value, id) { /* Редактирование листа */
        this.visibility = !this.visibility;
        let dataArray = JSON.parse(localStorage.getItem("Boards"));
        if (value.trim() !== "")
            for (let i = 0; i <= dataArray[this.boardId].lists.length; i++) {
                if (dataArray[this.boardId].lists[i].id == id) {
                    dataArray[this.boardId].lists[i].title = value;
                    break;
                }
            }
        var serialObj = JSON.stringify(dataArray);
        localStorage.setItem("Boards", serialObj);
        this.list.title = value;
    }/**********************************************************************************/

    outClick(event) { /* Проверка клика вне эл-та */
        var clickedComponent = event.target;
        var inside = false;
        do {
            switch (clickedComponent) {
                case this.listName.nativeElement:
                    inside = true;
                    break;
                case this.editList.nativeElement:
                    inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.visibility = false;
            this.editList.nativeElement.value = this.list.title;;
        }
    }
}