import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class NinjaList {
  ninjaId = '';
  ninja = '';
  currentPage = 1;
  textShowAll = 'Show All';
  

  constructor(httpClient){
    httpClient.configure(config => {
      config
        .useStandardConfiguration().withBaseUrl('/api');
    });
    this.httpClient = httpClient;
  }

  get canSearch() {
    return (this.searchEntry != '' ? true : false);
  }

  activate(params) {
    // Fetch the ninjas from the server and set them to the ninjas array
    return this.httpClient.fetch('/ninjas')
      .then(response => response.json())
      .then(ninjas => this.ninjas = ninjas);
  }
  
  getNinjas(params){
     return this.httpClient.fetch('/ninjas?q=' + params)
          .then(response => response.json())
      .then(ninjas => this.ninjas = ninjas);
  }
  
  getFilteredNinjas(){
    this.getNinjas(this.searchEntry);
  }

  getAllNinjas() {
    this.searchEntry = '';
    this.getNinjas();
  }
}
