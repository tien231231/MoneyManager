const ExpenseSchema = require("../models/ExpenseModel")


exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date}  = req.body
    
    const income = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
        user:req.user.userId
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json(error)
    }

    console.log(income)
}
exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;
  
    try {
      // find the expense to update
      const expense = await ExpenseSchema.findById(id);
  
      // validations
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
      if (!title || !category || !description || !date) {
        return res.status(400).json({ message: 'All fields are required!' });
      }
    //   if (amount <= 0 || !Number.isInteger(amount)) {
    //     return res.status(400).json({ message: 'Amount must be a positive integer!' });
    //   }
  
      // update expense fields
      expense.title = title;
      expense.amount = amount;
      expense.category = category;
      expense.description = description;
      expense.date = date;
  
      // save updated expense
      const updateExpense= await expense.save();
  
      res.status(200).json(updateExpense);
    } catch (error) {
      res.status(500).json(error);
    }
  };
exports.getExpense = async (req, res) =>{
    try {
        const incomes = await ExpenseSchema.find({user:req.user.userId}).sort({date: 1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}
