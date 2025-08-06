# CLI Expense Tracker

## Description

A command-line expense tracker application built with pure JavaScript.

## Features

-   Add expenses with amount, category, and description.
-   View all expenses.
-   View expenses by category.
-   Calculate total expenses.
-   Remove expenses.
-   Generate expense report.

## Tech Stack

-   Pure JavaScript (no external libraries)
-   Console-based interface

## How to Run

### Option 1: Node.js

1.  Install Node.js.
2.  Clone the repository.
3.  Navigate to the project directory in the terminal.
4.  Run `node expense-tracker.js`.

### Option 2: Browser Console

1.  Open any webpage.
2.  Press F12 or right-click -> "Inspect".
3.  Go to "Console" tab.
4.  Copy and paste the code from `expense-tracker.js` into the console.
5.  Press Enter to run.

## Example Usage

```javascript
// Initialize the tracker (Node.js only)
// startExpenseTracker();

// Add some expenses
addExpense(50, "food", "Groceries");
addExpense(20, "transport", "Bus fare");
addExpense(15.50, "entertainment", "Movie");

// View data
viewAllExpenses();
calculateTotal();
calculateTotal("food");

// Test validation
addExpense(0, "food"); // Should show error
addExpense(10, "invalid_category"); // Should show error
```