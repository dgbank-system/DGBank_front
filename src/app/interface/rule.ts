import { Aggregation } from "../enum/aggregationEnum";
import { Operation } from "../enum/operationEnum";
import { RuleType } from "../enum/ruletypeEnum";
import { TrxType } from "../enum/trxEnum";

export interface Rule {
    id : number,
    transactionType: TrxType;
    ruleType: RuleType,
    operation: Operation;
    aggregation: Aggregation;
    amount: string;
    date: string;
}