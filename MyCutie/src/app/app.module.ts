import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
//import { HttpClient } from '@angular/common/http';
import { SQLite } from "@ionic-native/sqlite/ngx";

import { NotesPage } from '../pages/notes/notes';
import { HelpmePage } from '../pages/helpme/helpme';
import { ShowusPage } from '../pages/showus/showus';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { QuestionPage } from '../pages/question/question';
import { DetailsPage } from '../pages/details/details';
import { AnswerPage } from '../pages/answer/answer';
import { AddNotePage } from '../pages/add-note/add-note';
import { EditNotePage } from '../pages/edit-note/edit-note';
import { HeadfacePage } from '../pages/headface/headface';
import { TodoPage } from '../pages/todo/todo';
import { DonePage } from '../pages/done/done';
import { SpecialPage } from '../pages/special/special';
import { CommunityPage } from '../pages/community/community';
import { RecordsPage } from '../pages/records/records';
import { MomentsPage } from '../pages/moments/moments';
import { MorePage } from '../pages/more/more';
import { PostPage } from '../pages/post/post';
import { RecommendDetailsPage } from '../pages/recommend-details/recommend-details';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { DataProvider } from '../providers/data/data';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    NotesPage,
    HelpmePage,
    ShowusPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    AddNotePage,
    EditNotePage,
    HeadfacePage,
    TodoPage,
    DonePage,
    SpecialPage,
    CommunityPage,
    RecordsPage,
    MomentsPage,
    MorePage,
    PostPage,
    RecommendDetailsPage
    //HttpClient,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotesPage,
    HelpmePage,
    ShowusPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    AddNotePage,
    EditNotePage,
    HeadfacePage,
    TodoPage,
    DonePage,
    SpecialPage,
    CommunityPage,
    RecordsPage,
    MomentsPage,
    MorePage,
    PostPage,
    RecommendDetailsPage
    //HttpClient,
  ],
  providers: [
    SQLite,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
    DataProvider,
    File,
    Transfer,
    FilePath,
    Camera
  ]
})
export class AppModule { }
