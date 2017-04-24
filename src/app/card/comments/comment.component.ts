import { Component, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';

@Component({
    selector: 'comment',
    templateUrl: `./comment.component.html`,
    styleUrls: [`./comment.component.css`],
})

export class Comment {
    @Input() comment;
    @Input() boardId;
    @Input() listId;
    @Input() cardId;
    @Output() deleteComment = new EventEmitter();
    comment_value: string;

    visibility: boolean = false;

    confirm(value, id) { /******************** Редактирование листа ********************/
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
        this.comment.title = value;
    }/**********************************************************************************/

    delete_comment() { /******************************* Удаление комментария **********************************/
        var dataArray = JSON.parse(localStorage.getItem("Boards"));
        for (let j = 0; j < dataArray[this.boardId].lists.length; j++) {
            for (let i = 0; i < dataArray[this.boardId].lists[j].cards.length; i++) {
                for (let k = 0; k < dataArray[this.boardId].lists[j].cards[i].comment.length; k++) {
                    if (dataArray[this.boardId].lists[j].cards[i].comment[k].id == this.comment.id) {
                        dataArray[this.boardId].lists[j].cards[i].comment.splice(k, 1);
                        var serialObj = JSON.stringify(dataArray);
                        localStorage.setItem("Boards", serialObj);
                        this.deleteComment.emit(dataArray[this.boardId].lists[j].cards[i].comment);
                        break;
                    }
                }
            }
        }
    }/*********************************************************************************************************/

    edit_comment() { /* Отображение поля для редактирования */
        this.visibility = !this.visibility;
    }/*******************************************************/

    save() { /***** Сохранение в хранилище отредактированого комментария *****/
        this.visibility = !this.visibility;
        var dataArray = JSON.parse(localStorage.getItem("Boards"));
        for (let j = 0; j < dataArray[this.boardId].lists.length; j++) {
            if (dataArray[this.boardId].lists[j].id == this.listId) {
                for (let i = 0; i < dataArray[this.boardId].lists[j].cards.length; i++) {
                    if (dataArray[this.boardId].lists[j].cards[i].id == this.cardId) {
                        for (let k = 0; k < dataArray[this.boardId].lists[j].cards[i].comment.length; k++) {
                            if (dataArray[this.boardId].lists[j].cards[i].comment[k].id == this.comment.id) {
                                dataArray[this.boardId].lists[j].cards[i].comment[k].title = this.comment_value
                                var serialObj = JSON.stringify(dataArray);
                                localStorage.setItem("Boards", serialObj);
                                this.comment = dataArray[this.boardId].lists[j].cards[i].comment[k];
                                console.log(this.comment);
                                break;
                            }
                        }
                    }
                }
            }
        }
    }/************************************************************************/
}