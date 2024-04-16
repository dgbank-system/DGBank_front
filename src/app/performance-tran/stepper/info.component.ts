import { Component } from '@angular/core';

@Component({
  selector: 'app-information',
  template: `
  <div class="mt-4">
  <div class="row">
      <div class="col-md-6">
      <div class="form-group mb-3">
              <label for="transactionType">Transaction Type</label>
              <select ngModel name="transactionType" class="form-control" id="ruleType">
                <option value="Transfer">Transfer</option>
                <option value="Withdraw">Withdraw</option>
                <option value="Deposite">Deposite</option>
              </select>
            </div>
      </div>
  </div>
</div>
<div class="d-flex justify-content-end flex-row mb-5 mt-4">
  <button class="btn btn-outline-primary" cdkStepperNext>
      Go To Contact <i class="fa fa-angle-right"></i>
  </button>
</div>`,
  
})
export class InformationComponent {

}