import styles from "./CustomTooltip.module.css";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.factory}>{`${payload[0].name} : ${Number(payload[0].value.toFixed(3))}`}</p>
        <p className={styles.factory}>{`${payload[1].name} : ${Number(payload[1].value.toFixed(3))}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;