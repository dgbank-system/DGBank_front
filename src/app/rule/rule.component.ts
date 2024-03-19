import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Rule } from '../interface/rule';
import { RuleType } from '../enum/ruletypeEnum';
import { Operation } from '../enum/operationEnum';
import { Aggregation } from '../enum/aggregationEnum';
import { RuleService } from '../services/rule.service';
import { TrxType } from '../enum/trxEnum';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit{
  rule: Rule = {
    id: 0,
    transactionType: TrxType.Withdraw,
    ruleType: RuleType.Customer,
    operation: Operation.Equal,
    aggregation: Aggregation.Sum,
    amount: '',
    date: '',

  };
ruleType : typeof  RuleType = RuleType ;
operation : typeof Operation = Operation;
aggregation : typeof Aggregation = Aggregation;
transactionType : typeof TrxType = TrxType;
public rules!: Rule[];
 public Editrule! : Rule ;
 public confirmDelete: boolean = false;
 @ViewChild('deleteModalCloseButton') deleteModalCloseButton: ElementRef | undefined;

 ruleDescription: string = '';
 constructor(private ruleService: RuleService){}

  ngOnInit() {
    
    this.getRules();  

    
    // Check or uncheck the input based on the retrieved status

}
  

  public getRules() : void {
    this.ruleService.getRule().subscribe(
      (response: Rule[]) => {
        this.rules = response;
       
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddRule(addForm : NgForm): void{
    document.getElementById('add-employee-form')?.click();
   
    this.ruleService.addRule(addForm.value).subscribe(
      (response: Rule) =>
      {
          console.log(response);
          this.getRules();
          addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onUpdateRule(rule : Rule): void{
    this.ruleService.updateRule(rule).subscribe(
      (response: Rule) =>
      {
       
         this.getRules();
         

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
       
      }
    )
  }

  public onDeleteEmloyee(ruleId: number): void {
    const confirmDeleteCheckbox = document.getElementById('confirmDeleteCheckbox') as HTMLInputElement;
    if (confirmDeleteCheckbox.checked) {
    this.ruleService.deleteRule(ruleId).subscribe(
      (response: any) => {
    
        this.getRules();
        this.closeDeleteModal()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    }

    
  }


  public onOpenModel(event: Event,rule:Rule | null , mode : string): void{
    event.preventDefault();
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if(mode === 'add')
    {
      button.setAttribute('data-target','#AddRuleModel');
    }
    if(mode === 'edit')
    {
      if(rule !== null)
      {
    
        this.Editrule = rule ;
        button.setAttribute('data-target','#EditruleModel');
      }   
    }
    if(mode === 'delete')
    {
      if(rule !== null)
      {
        this.Editrule = rule ;
        button.setAttribute('data-target','#DeleteruleModel');
      }
    }
    container?.appendChild(button);
    button.click();
  }

  private closeDeleteModal(): void {
    if (this.deleteModalCloseButton) {
      this.deleteModalCloseButton.nativeElement.click();
    }
  }


  
 
}
