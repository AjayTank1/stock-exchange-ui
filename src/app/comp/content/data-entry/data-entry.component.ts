import { Component, OnInit, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.scss']
})
export class DataEntryComponent implements OnInit {

  symbol: string = '';
  num: number = 0;
  rate: number = 0.0;

  @Output() updateEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  changeSymbol($event: any) {
    this.symbol = $event?.target?.value;
    this.emitUpdatedValue();
  }

  changeNum($event: any) {
    this.num = $event?.target?.value;
    this.emitUpdatedValue();
  }

  changeRate($event: any) {
    this.rate = $event?.target?.value;
    this.emitUpdatedValue();
  }

  emitUpdatedValue() {
    this.updateEvent.emit({symbol: this.symbol, num: this.num, rate:this.rate});
  }



}
