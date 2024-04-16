import { Component } from '@angular/core';

@Component({
  selector: 'app-security',
  template: `
  <div class="mt-4">
    <div class="row">
        <div class="col-md-6">
        <label for = "operation">Operation on Amount</label>
            <select  ngModel name="operation" class="form-control" id="operation">
              <option value="Greater">Greater than</option>
              <option value="Less">Less than</option>
              <option value="Equal">Equal to</option>
            </select>
        </div>
    </div>
</div>
<div class="d-flex justify-content-between flex-row mb-5 mt-4">
    <button class="btn btn-outline-primary" cdkStepperPrevious>
        <i class="fa fa-angle-left"></i> back To Contact
    </button>
    <button class="btn btn-outline-primary" cdkStepperNext>
        Submit Form <i class="fa fa-angle-right"></i>
    </button>
</div>
  `,
  
})
export class SecurityComponent {

}