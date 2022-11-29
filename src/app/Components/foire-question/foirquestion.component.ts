import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foirquestion',
  templateUrl: './foirquestion.component.html',
  styleUrls: ['./foirquestion.component.scss'],
})
export class FoirquestionComponent implements OnInit {
  question: boolean[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log('init compoenent');
  }
  collapse(n: number): void {
  this.question[n]=!this.question[n];
  }
}
