 import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currUser")) ?? null
  );

  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const login = async (newUser, navigate) => {
    const response = await axios.post(`${BASE_URL}login`, newUser);

    localStorage.setItem("currUser", JSON.stringify(response.data));
    console.log(response.data);
    setUser(response.data);
    navigate("/");
    return response.data;
  };

  const logout = async () => {
    setUser(null);
    localStorage.clear();
  };
  const register = async (newUser, navigate) => {
    const response = await axios.post(`${BASE_URL}register`, newUser);

    console.log(response.data);
    setUser(response.data);
    navigate("/login");
  };
  //calculate incomes
  const addIncome = async (income) => {
    await axios
      .post(`${BASE_URL}add-income`, income, {
        headers: { token: `Bearer ${user.accessToken}` },
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes(user.accessToken);
  };

  const getIncomes = async (accessToken) => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`, {
        headers: { token: `Bearer ${accessToken}` },
      });
      setIncomes(response.data);
    } catch (error) {
      // Xử lý lỗi ở đây
      console.log(error);
    }
  };

  const deleteIncome = async (id) => {
    await axios.delete(`${BASE_URL}delete-income/${id}`);

    getIncomes(user.accessToken);
  };
  const updateIncome = async (id,income) => {
    await axios.put(`${BASE_URL}update-income/${id}`,income);
    console.log(`${BASE_URL}update-income/${id}`)
    getIncomes(user.accessToken);
  };
 

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  //calculate incomes
  const addExpense = async (income) => {
    await axios
      .post(`${BASE_URL}add-expense`, income, {
        headers: { token: `Bearer ${user.accessToken}` },
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpenses(user.accessToken);
  };

  const getExpenses = async (accessToken) => {
    try{
       const response = await axios.get(`${BASE_URL}get-expenses`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    setExpenses(response.data);
    }catch(error){
      console.log(error)
    }
   
    
    
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${BASE_URL}delete-expense/${id}`);
    getExpenses(user.accessToken);
  };
  const updateExpense = async (id,income) => {
    await axios.put(`${BASE_URL}update-expense/${id}`,income);
    
    getExpenses(user.accessToken);
  };

  const totalExpenses = () => {
    let totalIncome = 0;
    expenses.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        login,
        logout,
        user,
        register,
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        updateIncome,
        updateExpense,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
