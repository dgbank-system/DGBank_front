import { Component } from '@angular/core';
import { TrxType } from 'src/app/enum/trxEnum';

@Component({
  selector: 'app-agg',
  template: `
  <div class="mt-4">
    <div class="row">
        <div class="col-md-6">
        <div class = "form-group mb-3">
            <label for = "aggregation" >Aggregation on Amount</label>
            <select  ngModel name="aggregation" class="form-control" id="aggregation">
              <option value="Sum">Sum</option>
              <option value="Avg">Average</option>
              <option value="Min">Min</option>
              <option value="Max">Max</option>
              <option value="Count">Count</option>
            </select>
        </div>
    </div>
</div>

<div class="d-flex justify-content-between flex-row mb-5 mt-4">
    <button class="btn btn-outline-primary" cdkStepperPrevious>
        <i class="fa fa-angle-left"></i> back To Information
    </button>
    <button class="btn btn-outline-primary" cdkStepperNext>
        Go To Security <i class="fa fa-angle-right"></i>
    </button>
</div>`
})
export class AggComponent {

}