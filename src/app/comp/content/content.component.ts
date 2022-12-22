import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  entries: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.entries.push({});
  }

  addDataEntry() {
    this.entries.push({});
  }

  saveData() {
    
  }

  updateEvent($event: any, index: number){
    this.entries[index].symbol = $event.symbol;
    this.entries[index].num = $event.num;
    this.entries[index].rate = $event.rate;
  }

}