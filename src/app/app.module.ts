import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BoardsPage } from './board/boards-page.component';
import { UserInfo } from './user/user-info.component';
import { ListsDisplay } from './list/lists-page.component';
import { Autorization } from './autorization/autorization.component';
import { CardsDisplay } from './card/cards-page.component';
import { ListName } from './list/list-name.component';
import { Comment } from './card/comments/comment.component'
import { CommonModule } from "@angular/common";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { CardEditing } from './card/modal.component';
import { DragulaModule } from 'ng2-dragula';
import { BoardEntry } from './board/board-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardsPage,
    UserInfo,
    ListsDisplay,
    Autorization,
    CardsDisplay,
    Comment,
    BoardEntry,
    ListName,
    CardEditing,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragulaModule,
    CommonModule,
    BootstrapModalModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'boards',
        component: BoardsPage
      },
      {
        path: 'user-info',
        component: UserInfo
      },
      {
        path: 'board/:id',
        component: ListsDisplay
      },
      {
        path: '',
        redirectTo: '/boards',
        pathMatch: 'full'
      },
      {
        path: 'autorization',
        component: Autorization
      },
      // {
      //   path: '**',
      //   component: NotFound
      // }
    ])
  ],
  providers: [],
  entryComponents: [CardEditing],
  bootstrap: [AppComponent]
})
export class AppModule { }
