import React, { useContext } from "react";
import { Cell, LabelList, Legend, Pie, PieChart } from "recharts";
import { GRAPH_COLORS } from "../../constants";
import styles from "./DetailsGraph.module.css";
import { FactoryContext } from "../../contexts/FactoryContext";

const DetailsGraph = () => {
  const { detailsData } = useContext(FactoryContext);

  const productDetails = [
    { name: "Продукт 1", value: Number(detailsData["1"].product1.toFixed()) },
    { name: "Продукт 2", value: Number(detailsData["2"].product2.toFixed()) },
  ];

  return (
    <div className={styles.container}>
      <h1>
        Статистика по продукции {detailsData.tooltipPayload[0].name} за {detailsData.monthName}
      </h1>
      <PieChart width={400} height={400}>
        <Legend />

        <Pie data={productDetails} cx="50%" cy="50%" dataKey="value">
          <LabelList dataKey="value" position="outside" offset={20} className={styles.label} />

          {productDetails.map(({ name }, i) => (
            <Cell key={`cell-${name}`} fill={GRAPH_COLORS[i]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default DetailsGraph;
