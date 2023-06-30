import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { API_URL, DEFAULT_FILTER, MONTHS } from "../constants";

export const FactoryContext = createContext();

const FactoryContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(() => localStorage.getItem("filter") || DEFAULT_FILTER);
  const [detailsData, setDetailsData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        setData(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleSaveFilter = (value) => {
    localStorage.setItem("filter", value);
    setFilter(value);
  };

  const getFiltredValue = (product1, product2) => {
    let value = 0;
    switch (filter) {
      case "all":
        value = product1 + product2;
        break;
      case "product1":
        value = product1;
        break;
      case "product2":
        value = product2;
        break;
      default:
        break;
    }
    return value;
  }

  const factoryData = useMemo(() => {
    const result = [];
    const filteredData = data.filter((obj) => obj.date !== null);

    const totalProductsValues = filteredData.reduce(
      (acc, { factory_id, product1, product2, date }) => {
        const month = date.split("/")[1];
        const monthName = MONTHS[month];
        let value = getFiltredValue(product1, product2);

        if (!acc[month]) {
          acc[month] = {
            [factory_id]: {
              total: 0,
              product1: 0,
              product2: 0,
            },
            monthName,
            month,
          };
        }

        if (!acc[month][factory_id]) {
          acc[month][factory_id] = {
            total: 0,
            product1: 0,
            product2: 0,
          };
        }

        acc[month][factory_id].total += value / 1000;
        acc[month][factory_id].product1 += product1 / 1000;
        acc[month][factory_id].product2 += product2 / 1000;

        return acc;
      },
      {}
    );

    for (const key in totalProductsValues) {
      result.push(totalProductsValues[key]);
    }

    result.sort(
      (a, b) => moment(a.month, "MM/YYYY") - moment(b.month, "MM/YYYY")
    );

    return result;
  }, [data, filter]);

  const handleClickDetails = (data) => {
    const monthNumber = data.month;
    const factoryId = data.tooltipPayload[0].dataKey.split(".")[0];
    setDetailsData(data);
    navigate(`/details/${factoryId}/${monthNumber}`);
  };

  const values = {
    factoryData,
    filter,
    setFilter,
    handleSaveFilter,
    detailsData,
    handleClickDetails
  };

  return (
    <FactoryContext.Provider value={values}>
      {children}
    </FactoryContext.Provider>
  )
};

export default FactoryContextProvider;