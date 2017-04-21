import { Component, OnInit, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { BoardsArray } from './boards-array';
import { Lists } from '../list/list';

let LISTS: Lists[] = [];

@Component({
    selector: 'board-entry',
    templateUrl: './board-entry.component.html',
    styleUrls: ['./board-entry.component.css'],
})

export class BoardEntry implements OnInit {
    @Input() board;
    @Output() confirmChanges = new EventEmitter();

    show: boolean = false;
    boards_array: Array<BoardsArray> = [];
    lists = LISTS;
    visibility_newBoard: boolean = true;
    visibility_newForm: boolean = false;

    ngOnInit() {

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
        if (this.board.title.trim() != "") {
            for (var i = 0; i < dataArray.length; i++) {
                if (dataArray[i].id == id) {
                    dataArray[i].title = this.board.title.trim();
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
}