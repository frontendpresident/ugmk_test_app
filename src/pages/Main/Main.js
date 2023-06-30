import React, { useContext } from "react";
import {
  Bar,
  BarChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { FILTERS } from "../../constants";
import styles from "./Main.module.css";
import CustomTooltip from "../../components/CustomTooltip/CustomTooltip";
import { FactoryContext } from "../../contexts/FactoryContext";

const Main = () => {
  const {
    factoryData,
    handleSaveFilter,
    filter,
    handleClickDetails
  } = useContext(FactoryContext);

  return (
    <div className={styles.wrapper}>
      <div className={styles.optionContainer}>
        <label htmlFor="filter">Фильтр по типу продукции</label>
        <select
          className={styles.options}
          id="filter"
          onChange={(e) => handleSaveFilter(e.target.value)}
          value={filter}
        >
          {FILTERS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.graphContainer}>
        <BarChart data={factoryData} width={1000} height={300}>
          <XAxis dataKey="monthName" />
          <YAxis />
          <Legend />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="1.total"
            fill="#ff0000"
            name="Фабрика А"
            onClick={handleClickDetails}
          />
          <Bar
            dataKey="2.total"
            fill="#0000ff"
            name="Фабрика Б"
            onClick={handleClickDetails}
          />
        </BarChart>
      </div>
    </div>
  );
};

export default Main;
