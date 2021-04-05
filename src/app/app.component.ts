import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
//import 'rxjs/Rx';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dictionaryApp';
  meanings: any;
  categories: any;
  output1: any = '';
  definition : string ='';

  constructor(private http: HttpClient ) {
    this.categories = [
      { value: "English", label: "en" },
      { value: "Hindi", label: "hi" },
      { value: "Spanish", label: "es" },
      { value: "French", label: "fr" },
      { value: "Japanese", label: "ja" },
      { value: "Russian", label: "ru" },
      { value: "German", label: "de" },
      { value: "Italian", label: "it" },
      { value: "Korean", label: "ko" },
      { value: "Brazilian Portuguese", label: "pt-BR" },
      { value: "Arabic", label: "ar" },
      { value: "Turkish", label: "tr" },
    ];
    //console.log(this.categories)
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  searchMeaning(form: NgForm) {

    const post = {
      word: form.value.inputWord,
      language: form.value.language
    }
    console.log(post);
    if (post.language && post.word) {
      this.http.get('https://api.dictionaryapi.dev/api/v2/entries/'+post.language+'/'+post.word)
      .subscribe((data) => {
        this.output1 = JSON.parse(JSON.stringify(data));
        console.log(this.output1);
      },(error) => {
        this.output1 = 'Error occurend'
      },() => {
        let meanings = this.output1[0].meanings;
        //console.log(meanings);
        let definitions = meanings[0].definitions;
        //console.log(definitions);
        this.definition = JSON.stringify(definitions[0].definition);
        //console.log(definition);
      })
       
    }
  }

    
    
}
