import { Component, OnInit } from '@angular/core';
import {APIService, Transaction} from './../api.service';
import { FormBuilder, FormGroup,FormArray, FormControl} from '@angular/forms';
import * as moment from 'moment';
import { Subject } from 'rxjs';

interface PerDayDataForm {
    date: FormControl<Date|null>;
    transactions: FormArray<FormGroup<TransactionForm>>;
}

interface TransactionForm {
    symbol: FormControl<string|null>;
    num: FormControl<number|null>;
    rate: FormControl<number|null>;
    type: FormControl<string|null>;
}

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  entries: Transaction[] = [];
  date: any = moment(moment.now()).format('DD-MM-YYYY');

  selectedDate: Date|null = null;
  form: FormGroup;
  pickerCtl = new FormControl(new Date());

  public stringSubject = new Subject<any>();

  constructor(private apiService: APIService,
    private fb: FormBuilder) { 
    let p =  this.fb.array([]);

      this.form = fb.group({
        date: this.pickerCtl,
        transactions:this.fb.array([]),
      });
      this.pickerCtl.valueChanges.subscribe((v) => {
        this.date = moment(v).format('DD-MM-YYYY');
        this.stringSubject.next(this.date);
      });

    this.stringSubject.subscribe(value => {
      this.fetchData(value);
    });

    this.fetchData(this.date);
  }

  get transactions(): FormArray {
    return this.form.get('transactions') as FormArray;
  }

  getCtrls() {
    return  this.transactions.controls;
  }

  ngOnInit(): void {
    this.entries.push({symbol: '', num: 0, rate: 0.0, type: 'buy'});
  }

  addDataEntry() {
    this.transactions.push(this.fb.group({
         symbol :'',
         num: 0,
         rate:0.0,
         type:'buy',
      }));
  }

  saveData() {
    let val = this.form.value;
    this.apiService.saveData({...val, date: moment(val.date).format('DD-MM-YYYY')}).subscribe();
  }

  fetchData(date: string) {
    this.apiService.getData(date).subscribe(resp => {
      this.transactions.clear();
      if(resp.transactions) {
        for(let r of resp.transactions){
          this.transactions.push(this.fb.group(r));
        }
      } else {
        this.addDataEntry();
      }
    });
  }

}