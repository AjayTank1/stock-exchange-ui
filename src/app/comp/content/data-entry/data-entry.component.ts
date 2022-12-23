import { Component, OnInit, Output , EventEmitter, Input, ChangeDetectionStrategy} from '@angular/core';
import {APIService, Transaction} from './../../api.service';
import { Observable, of } from 'rxjs';
import { map, startWith } from "rxjs/operators";
import { FormBuilder, FormGroup,FormArray, FormControl, FormGroupDirective} from '@angular/forms';


@Component({
  selector: 'data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.scss']
})
export class DataEntryComponent implements OnInit {

  @Input() index!: number;

  form!:FormGroup  ;
  myControl = new FormControl();

  options: string[] = ['ajay','tank'];
  filteredOptions: Observable<any[]>;

  constructor( private rootFormGroup: FormGroupDirective, 
    private apiService: APIService) {
    this.filteredOptions = of(['']);
    this.apiService.getSymbol().subscribe(val => {
      this.options = val;
      this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value)),
      map(name => (name ? this._filter(name) : this.options.slice()))
    );
    });
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(
      option => option.toLowerCase().indexOf(filterValue) !== -1
    );
  }

  ngOnInit(): void {
    let p = this.rootFormGroup.control.controls['transactions'] as FormArray
    this.form = p.controls[this.index] as FormGroup;
  }

}
