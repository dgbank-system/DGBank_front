import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Rule } from '../interface/rule';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RuleService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  addRule(rule: Rule) :  Observable<Rule>{
    return this.http.post<Rule>(`${this.apiUrl}/rules/add`, rule); 
  }

  public getRule() : Observable<Rule[]>
  {
    return this.http.get<Rule[]>(`${this.apiUrl}/rules/all`);
  }

  public updateRule(rule: Rule): Observable<Rule>
  {
    return this.http.put<Rule>(`${this.apiUrl}/rules/update`,rule)
  }

  
  public deleteRule(ruleId : number) : Observable<Rule>
  {
    return this.http.delete<Rule>(`${this.apiUrl}/rules/delete/${ruleId}`)
  }

  public applyRules()
  {
    const url = `${this.apiUrl}/rules/applyRules`
    return this.http.get(url);
  }


}
