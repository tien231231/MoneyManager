import React, { useState, useEffect } from "react";
import { Area } from "@ant-design/plots";
import { useGlobalContext } from "../../context/globalContext";
import { useNavigate } from "react-router-dom";

const Statistic = () => {
  const { user, expenses } = useGlobalContext();
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  if(user==null){
    navigate("/login")}
  useEffect(() => {
    setData(expenses);
  }, [expenses]);
  console.log(expenses);

  const config = {
    data,
    padding: 20,
    width: 1700,
    xField: "date",
    yField: "amount",
    seriesField: "category",
    slider: {
      start: 0.1,
      end: 0.9,
    },
  };

  return <Area {...config} style={{ padding: 20 }} />;
};
export default Statistic;
