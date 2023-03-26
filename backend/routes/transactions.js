
const { addExpense, getExpense, deleteExpense, updateExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome, updateIncome } = require('../controllers/income');
const middlewareC = require('../controllers/middlewareC');

const router = require('express').Router();


router.post('/add-income/',middlewareC.verifyToken, addIncome)
    .get('/get-incomes/',middlewareC.verifyToken, getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .put('/update-income/:id',updateIncome)
    .post('/add-expense',middlewareC.verifyToken, addExpense)
    .get('/get-expenses/',middlewareC.verifyToken, getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .put('/update-expense/:id',updateExpense)
    

module.exports = router