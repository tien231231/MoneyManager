const IncomeSchema= require("../models/IncomeModel")


exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date}  = req.body

    const income = IncomeSchema({
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
         const newincome= await income.save()
        res.status(200).json(newincome)
    } catch (error) {
        res.status(500).json(error)
    }

    console.log(income)
}

exports.getIncomes = async (req, res) =>{
    try {
        
        const incomes = await IncomeSchema.find({user: req.user.userId}).sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}




exports.updateIncome = async (req, res) => {
    const {id} = req.params

    try {
        const income = await IncomeSchema.findById(id)

        if (!income) {
            return res.status(404).json({message: 'Income not found'})
        }

        // Only update fields that are sent in the request body
        if (req.body.title) {
            income.title = req.body.title
        }
        if (req.body.amount) {
            income.amount = req.body.amount
        }
        if (req.body.category) {
            income.category = req.body.category
        }
        if (req.body.description) {
            income.description = req.body.description
        }
        if (req.body.date) {
            income.date = req.body.date
        }

        const updatedIncome = await income.save()
        res.status(200).json(updatedIncome)
    } catch (error) {
        res.status(500).json(error)
    }
}