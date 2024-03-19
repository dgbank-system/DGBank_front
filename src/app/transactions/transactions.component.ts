import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Transaction } from '../interface/transaction';
import { TransactionService } from '../services/transaction.service';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit{

  transactions!: Transaction[] ;
  transaction! : Transaction;
  filteredTransactions: Transaction[] | undefined;
  amountLessThan: number | undefined;
  amountGreaterThan: number | undefined;
  
  sortKey: string = 'id'; // Default sorting key is 'id'
  reverse: boolean = false;
  selectedType: string = "";
  selectedStatus: string = "";
  searchTransactionId: string = '';
  searchAccountId1 : string = '';
  searchAccountId2 : string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(private trxService: TransactionService) {}

  ngOnInit() {
    this.GetTrxs();
    this.filterByTypeAndId();
  }

  GetTrxs() {
    this.trxService.getTrx().subscribe(
      (response: Transaction[]) => {
        this.transactions = response;
        this.filteredTransactions = this.transactions; // Initialize filteredTransactions
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Sorting function
  sort(key: string) {
    if (key === 'id') {
      this.reverse = !this.reverse; // Toggle the sorting direction
    } else {
      // For other columns, reset the sorting direction
      this.reverse = false;
    }
    this.sortKey = key;
    this.applySortAndFilter();
  }

 
  applySortAndFilter() {
    if (this.transactions) {
      this.filteredTransactions = this.transactions
        .slice() // Create a shallow copy to avoid modifying the original array
        .sort((a, b) => {
          if (this.sortKey === 'id') {
            return this.reverse ? b.id - a.id : a.id - b.id;
          } else {
            // Handle sorting for other columns here, if needed
            return 0; // No sorting for other columns in this example
          }
        });
    }
  }
  selectType(selectedType: string) {
    this.selectedType = selectedType;
    this.filterByTypeAndId(); // Call the filtering function based on the selected type
  }
  filterByTypeAndId() {
    if (this.selectedType && this.searchTransactionId) {
      const type = this.selectedType.toLowerCase();
      const id = this.searchTransactionId.toLowerCase();
      this.filteredTransactions = this.transactions?.filter(
        (transaction) =>
          transaction.type.toLowerCase() === type &&
          transaction.id.toString().toLowerCase().includes(id)
      );
    } else if (this.selectedType) {
      // If only type is selected, filter by type
      const type = this.selectedType.toLowerCase();
      this.filteredTransactions = this.transactions?.filter(
        (transaction) =>
          transaction.type.toLowerCase() === type
      );
    } else if (this.searchTransactionId ) {
      // If only ID is entered, filter by ID
      const id = this.searchTransactionId.toLowerCase();
      this.filteredTransactions = this.transactions?.filter(
        (transaction) =>
          transaction.id.toString().toLowerCase().includes(id)
      );
    } else {
      // If neither type nor ID is selected/entered, reset the filter
      this.filteredTransactions = this.transactions;
    }
  }
  
  searchTransaction() {
    this.filterByTypeAndId()
  }
  filterByAmount() {
    if (
      (this.amountLessThan !== undefined || this.amountGreaterThan !== undefined) &&
      this.transactions
    ) {
      this.filteredTransactions = this.transactions.filter((transaction) => {
        const amount = transaction.amount; // Assuming amount is a number
  
        const isLessThan =
          this.amountLessThan === undefined || this.amountLessThan === null || amount < this.amountLessThan;
  
        const isGreaterThan =
          this.amountGreaterThan === undefined || this.amountGreaterThan === null || amount > this.amountGreaterThan;
  
        return isLessThan && isGreaterThan;
      });
    } else {
      // If both "Less Than" and "Greater Than" values are not specified, reset the filter
      this.filteredTransactions = this.transactions;
    }
  }
  
  
  filterByStatus() {
    if (this.selectedStatus) {
        this.filteredTransactions = this.transactions?.filter(
            (transaction) => transaction.status === this.selectedStatus
        );
    } else {
        // If no status is selected, reset the filter
        this.filteredTransactions = this.transactions;
    }
}
filterByDate() {
  if (this.startDate && this.endDate) {
    // Convert the input date strings to Date objects
    const startDateObj = new Date(this.startDate);
    const endDateObj = new Date(this.endDate);

    // Filter the transactions based on the date range
    this.filteredTransactions = this.transactions?.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startDateObj && transactionDate <= endDateObj;
    });
  } else {
    // If either date is not specified, reset the filter
    this.filteredTransactions = this.transactions;
  }
}

applyFilters() {
  if (this.transactions) {
    // Create a copy of the original transactions array
    this.filteredTransactions = [...this.transactions];

    // Apply each filter independently
    if (this.selectedType) {
      const type = this.selectedType.toLowerCase();
      this.filteredTransactions = this.filteredTransactions.filter(
        (transaction) => transaction.type.toLowerCase() === type
      );
    }

    if (this.searchTransactionId) {
      const id = this.searchTransactionId.toLowerCase();
      this.filteredTransactions = this.filteredTransactions.filter(
        (transaction) =>
          transaction.id.toString().toLowerCase().includes(id)
      );
    }

    if (
      (this.amountLessThan !== undefined || this.amountGreaterThan !== undefined)
    ) {
      this.filteredTransactions = this.filteredTransactions.filter(
        (transaction) => {
          const amount = transaction.amount;
          const isLessThan =
            this.amountLessThan === undefined ||
            this.amountLessThan === null ||
            amount < this.amountLessThan;

          const isGreaterThan =
            this.amountGreaterThan === undefined ||
            this.amountGreaterThan === null ||
            amount > this.amountGreaterThan;

          return isLessThan && isGreaterThan;
        }
      );
    }

    if (this.selectedStatus) {
      this.filteredTransactions = this.filteredTransactions.filter(
        (transaction) => transaction.status === this.selectedStatus
      );
    }

    if (this.startDate && this.endDate) {
      const startDateObj = new Date(this.startDate);
      const endDateObj = new Date(this.endDate);

      this.filteredTransactions = this.filteredTransactions.filter(
        (transaction) => {
          const transactionDate = new Date(transaction.date);
          return (
            transactionDate >= startDateObj && transactionDate <= endDateObj
          );
        }
      );
    }
    if (this.searchAccountId1) {
      const id = this.searchAccountId1.toLowerCase();
      this.filteredTransactions = this.filteredTransactions.filter(
        (transaction) =>
          transaction.accountId && // Check if account property is not null
          transaction.accountId.toString().toLowerCase().includes(id)
      );
    }
    if (this.searchAccountId2) {
      const id = this.searchAccountId2.toLowerCase();
      this.filteredTransactions = this.filteredTransactions.filter(
        (transaction) =>
          transaction.anotherAccountId && // Check if account property is not null
          transaction.anotherAccountId.toString().toLowerCase().includes(id)
      );
    }
  }
}

}

  
