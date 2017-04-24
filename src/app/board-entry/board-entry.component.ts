import { Component, OnInit, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { BoardsArray } from '../board/boards-array';
import { Lists } from '../list/list';

@Component({
    selector: 'board-entry',
    templateUrl: './board-entry.component.html',
    styleUrls: ['./board-entry.component.css'],
    host: {
        '(document:click)': 'outClick($event)',
    },
})

export class BoardEntry {
    @Input() board;
    @Output() confirmChanges = new EventEmitter();

    show: boolean = false;
    boards_array: Array<BoardsArray> = [];
    visibility_newBoard: boolean = true;
    visibility_newForm: boolean = false;
    board_title: string;

    public elementRef;

    constructor(myElement: ElementRef) {
        this.elementRef = myElement;
    }

    EditBoardOnEnter(event, ID) { //Создание борда при нажатии ENTER
        if (event.keyCode == 13) {
            this.confirm(ID);
        } else if (event.keyCode == 27) {
            this.show = false;
        }
    }

    delete_board(id) { //удаление отдельного борда
        var dataArray = JSON.parse(localStorage.getItem("Boards"));

        for (var i = 0; i < dataArray.length; i++) {
            if (dataArray[i].id == id) {
                dataArray.splice(i, 1);
                this.confirmChanges.emit(dataArray);
                break;
            }
        }
        var serialObj = JSON.stringify(dataArray);
        localStorage.setItem("Boards", serialObj);
        this.boards_array = dataArray;
    }

    confirm(id) { /* Принятие изменений, при редактировании названия доски */
        var dataArray = JSON.parse(localStorage.getItem("Boards"));
        if (this.board_title.trim() != "") {
            for (var i = 0; i < dataArray.length; i++) {
                if (dataArray[i].id == id) {
                    dataArray[i].title = this.board_title.trim();
                    this.confirmChanges.emit(dataArray);
                    break;
                }
            }
        }
        var serialObj = JSON.stringify(dataArray);
        localStorage.setItem("Boards", serialObj);
        this.boards_array = dataArray;
        this.show = false;
    }

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
            this.show = false;
        }
    }
}