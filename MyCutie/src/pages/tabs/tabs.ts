import { Component } from '@angular/core';

import { NotesPage } from '../notes/notes';
import { HelpmePage } from '../helpme/helpme';
import { ShowusPage } from '../showus/showus';
import { HomePage } from '../home/home';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabNotes = NotesPage;
  tabHelpMe = HelpmePage;
  tabShowUs = ShowusPage;
  tabHome = HomePage;

  constructor() {

  }
}
