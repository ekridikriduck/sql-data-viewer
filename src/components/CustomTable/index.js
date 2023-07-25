import { useSelector } from "react-redux";
import { Table } from "reactstrap";
import { selectTableData } from "../../redux/store";
import { getRowValueByType, toSentenceCase } from "../../utils/data-utils";
import styles from "./index.module.scss";

export const CustomTable = () => {
  const tableData = useSelector(selectTableData);
  if (!tableData || !tableData.length) return null;

  const columns = Object.keys(tableData[0]);
  return (
    <div className={styles.table_container}>
      <Table size="lg" bordered hover>
        <thead>
          <tr>
            {columns.map((column, idx) => (
              <th key={idx}>{toSentenceCase(column)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, idx) => (
            <tr key={idx}>
              {columns.map((column, idx) => (
                <td key={idx}>{getRowValueByType(row[column])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
