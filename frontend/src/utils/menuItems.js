import {dashboard, expenses, transactions, trend} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "View Statistic",
        icon: transactions,
        link: "/statistic",
    },
    {
        id: 3,
        title: "Incomes",
        icon: trend,
        link: "/incomes",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/expenses",
    },

]