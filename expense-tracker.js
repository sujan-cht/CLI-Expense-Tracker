startExpenseTracker(); // Start the tracker

// Variables & Data Types
// Variables & Data Types
const CATEGORIES = ['food', 'transport', 'entertainment', 'other']; // Use const for expense categories (unchangeable)
let expenses = []; // Use let for dynamic calculations and user inputs (expenses can be added/removed)
let expenseIdCounter = 0; // Use let for a counter that changes
var appName = 'Expense Tracker'; // Using var - demonstrates its usage (appName can be changed, though it's not recommended)

// Function Declarations

/**
 * Displays the main menu options.
 */
function showMenu() {
    console.log('\n=== EXPENSE TRACKER ===');
    console.log('1. Add Expense');
    console.log('2. View All Expenses');
    console.log('3. View by Category');
    console.log('4. Calculate Total');
    console.log('5. Remove Expense');
    console.log('6. Generate Report');
    console.log('7. Exit');
}

/**
 * Adds a new expense to the expenses array.
 * @param {number} amount - The expense amount.
 * @param {string} category - The expense category.
 * @param {string} [description=''] - The expense description (optional).
 */
const addExpense = (amount, category, description = '') => {
    // Input Validation
    if (typeof amount !== 'number' || amount <= 0) {
        console.error('Error: Amount must be a positive number.');
        return;
    }

    if (!CATEGORIES.includes(category.toLowerCase())) {
        console.error('Error: Invalid category.');
        return;
    }

    // Type Coercion
    amount = Number(amount);

    const expense = {
        id: ++expenseIdCounter,
        amount: amount,
        category: category.toUpperCase(),
        description: description.trim(),
        date: new Date().toLocaleDateString()
    };

    expenses.push(expense);
    console.log(`Expense added successfully! ID: ${expense.id}`);
};

/**
 * Removes an expense from the expenses array by ID.
 * @param {number} id - The ID of the expense to remove.
 */
function removeExpense(id) {
    const index = expenses.findIndex(expense => expense.id === id);
    if (index > -1) {
        expenses.splice(index, 1);
        console.log(`Expense with ID ${id} removed successfully.`);
    } else {
        console.error(`Error: Expense with ID ${id} not found.`);
    }
}

/**
 * Calculates the total expenses, optionally filtered by category.
 * @param {string} [category=null] - The category to filter by (optional).
 * @returns {number} - The total expenses.
 */
function calculateTotal(category = null) {
    let total = 0;
    if (category) {
        const filteredExpenses = expenses.filter(expense => expense.category.toLowerCase() === category.toLowerCase());
        total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    } else {
        total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }
    return total;
}

/**
 * Views expenses, optionally filtered by category.
 * @param {string} category - The category to filter by.
 */
const viewByCategory = (category) => {
    const filteredExpenses = expenses.filter(expense => expense.category.toLowerCase() === category.toLowerCase());
    if (filteredExpenses.length === 0) {
        console.log(`No expenses found for category: ${category}`);
        return;
    }

    console.log(`${category.toUpperCase()} Expenses:`);
    filteredExpenses.forEach(expense => {
        console.log(`ID: ${expense.id} | $${expense.amount.toFixed(2)} | ${expense.description} | ${expense.date}`);
    });

    const categoryTotal = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    console.log(`Category Total: $${categoryTotal.toFixed(2)}`);
};

/**
 * Generates an expense report.
 */
function generateReport() {
    console.log('\nEXPENSE REPORT');
    console.log('================================');

    const categoryTotals = {};
    expenses.forEach(expense => {
        if (!categoryTotals[expense.category]) {
            categoryTotals[expense.category] = 0;
        }
        categoryTotals[expense.category] += expense.amount;
    });

    let grandTotal = 0;
    for (const category in categoryTotals) {
        const categoryTotal = categoryTotals[category];
        const categoryExpenses = expenses.filter(expense => expense.category === category);
        const numExpenses = categoryExpenses.length;
        console.log(`${category}: $${categoryTotal.toFixed(2)} (${numExpenses} expenses)`);
        grandTotal += categoryTotal;
    }

    console.log('================================');
    console.log(`TOTAL: $${grandTotal.toFixed(2)} (${expenses.length} expenses)`);
    const average = expenses.length > 0 ? grandTotal / expenses.length : 0;
    console.log(`AVERAGE: $${average.toFixed(2)} per expense`);
}

/**
 * Views all expenses.
 */
function viewAllExpenses() {
    if (expenses.length === 0) {
        console.log('No expenses added yet.');
        return;
    }

    console.log('All Expenses:');
    expenses.forEach(expense => {
        console.log(`ID: ${expense.id} | $${expense.amount.toFixed(2)} | ${expense.category} | ${expense.description} | ${expense.date}`);
    });

    const total = calculateTotal();
    console.log(`Total: $${total.toFixed(2)}`);
}


// Interactive Usage

function startExpenseTracker() {
    const appName = 'Expense Tracker';
    console.log(`Welcome to ${appName}!`); // Template literals

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    // Example of while loop for menu system and user input (basic)
    let choice = 0;
    
    // Helper function to show the menu and get the next choice
    function showMenuAndGetChoice(readline) {
        showMenu();
        readline.question('Choose option (1-7): ', (input) => {
            let choice = parseInt(input);

            // Switch statement for menu navigation
            switch (choice) {
                case 1:
                    // Add Expense
                    readline.question('Enter amount: ', (amount) => {
                        const parsedAmount = parseFloat(amount);
                        if (isNaN(parsedAmount) || parsedAmount <= 0) {
                            console.error('Error: Invalid amount. Please enter a positive number.');
                            showMenuAndGetChoice(readline);
                            return;
                        }
                        readline.question('Enter category: ', (category) => {
                            if (!CATEGORIES.includes(category.toLowerCase())) {
                                console.error('Error: Invalid category. Please choose from food, transport, entertainment, or other.');
                                showMenuAndGetChoice(readline);
                                return;
                            }
                            readline.question('Enter description: ', (description) => {
                                addExpense(parsedAmount, category, description);
                                // After handling the input, we need to re-prompt for the main menu
                                showMenuAndGetChoice(readline);
                            });
                        });
                    });
                    break;
                case 2:
                    // View All Expenses
                    viewAllExpenses();
                    // After handling the input, we need to re-prompt for the main menu
                    showMenuAndGetChoice(readline);
                    break;
                case 3:
                    // View by Category
                    readline.question('Enter category to view: ', (categoryToView) => {
                        viewByCategory(categoryToView);
                        // After handling the input, we need to re-prompt for the main menu
                        showMenuAndGetChoice(readline);
                    });
                    break;
                case 4:
                    // Calculate Total
                    let total = calculateTotal();
                    console.log(`Total expenses: $${total.toFixed(2)}`);
                    // After handling the input, we need to re-prompt for the main menu
                    showMenuAndGetChoice(readline);
                    break;
                case 5:
                    // Remove Expense
                    readline.question('Enter ID to remove: ', (idToRemove) => {
                        const parsedIdToRemove = parseInt(idToRemove);
                        if (isNaN(parsedIdToRemove)) {
                            console.error('Error: Invalid ID. Please enter a valid number.');
                            showMenuAndGetChoice(readline);
                            return;
                        }
                        removeExpense(parsedIdToRemove);
                        // After handling the input, we need to re-prompt for the main menu
                        showMenuAndGetChoice(readline);
                    });
                    break;
                case 6:
                    // Generate Report
                    generateReport();
                    // After handling the input, we need to re-prompt for the main menu
                    showMenuAndGetChoice(readline);
                    break;
                case 7:
                    // Exit
                    console.log('Exiting...');
                    readline.close();
                    break;
                default:
                    console.log('Invalid option. Please choose again.');
                    // After handling the input, we need to re-prompt for the main menu
                    showMenuAndGetChoice(readline);
            }
        });
    }
    showMenuAndGetChoice(readline);
}

// startExpenseTracker(); // Commented out to prevent automatic execution in Node.js


//Expose functions for testing purposes
module.exports = {
    addExpense,
    removeExpense,
    calculateTotal,
    viewByCategory,
    generateReport,
    viewAllExpenses,
};