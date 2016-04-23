import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import 'fetch';


import {Router} from 'aurelia-router';

@inject(HttpClient, Router)

export class Edit {
  searchEntry = '';
  ninjas = [];
  ninjaId = '';
  ninja = '';
  ninjaRoot = '';
  currentPage = 1;
  textShowAll = 'Show All';
  myRouter = '';

  constructor(httpClient,router) {
    httpClient.configure(config => {
      config
        .useStandardConfiguration().withBaseUrl('/api');
    });
    this.httpClient = httpClient;
    this.router=router;
  }

  retrieveNinja(id) {
    return this.httpClient.fetch('/ninjas/' + id)
      .then(response => response.json())
      .then(ninja => this.ninja = ninja);

  }

  save() {
    this.ninjaRoot = {
      id: this.ninja.id,
      ServedInOniwaban: this.ninja.ServedInOniwaban,
      Clan: this.ninja.Clan,
      Name: this.ninja.Name,
      DateOfBirth: this.ninja.DateOfBirth
    };
    return this.httpClient.fetch('/updateDetails', {
      method: 'post',

      body: json(this.ninjaRoot) 
    }).then(response => {this.router.navigate('ninjaList');
      });
    }



  get canSearch() {
    return (this.searchEntry != '' ? true : false);
  }

  activate(params) {
    var result = this.retrieveNinja(params.Id);
    return result;
  }

}
