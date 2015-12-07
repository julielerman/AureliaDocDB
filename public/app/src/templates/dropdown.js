import $ from 'jquery';
import {getClans} from '../clans';
import {bindable} from 'aurelia-framework';
export class Dropdown {
  @bindable selectedClan;

  attached() {
    $(this.dropdown).dropdown();
  }


  constructor() {
    this.clans = getClans();
  }

}
 
