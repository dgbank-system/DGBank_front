import { Component } from '@angular/core';
import { TrxType } from 'src/app/enum/trxEnum';

@Component({
  selector: 'app-finish',
  template: `
  <div class="mt-4">
  <div class="ms-5">
      <i class="fa fa-check-circle fa-5x" style="color: green;"></i>
  </div>
  <p class="mb-4">Thanks for submitting the form!</p>
</div>`
})
export class FinishComponent {
    
}