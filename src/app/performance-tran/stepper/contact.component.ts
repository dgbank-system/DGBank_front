import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  template: `
  <div class="mt-4">
    <div class="row">
        <div class="col-md-6">
        <div class="form-group mb-3">
            <label for="ruleType">Based on</label>
            <select  ngModel name="ruleType" class="form-control" id="ruleType">
              <option value="Customer">Customer</option>
              <option value="Account">Account</option>
            </select>
         </div>
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
</div>`,
  
})
export class ContactComponent {

}