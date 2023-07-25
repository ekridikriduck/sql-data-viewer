import { useSelector, useDispatch } from "react-redux";
import { Table } from "reactstrap";
import {
  selectTableData,
  setSortState,
  selectSortState,
} from "../../redux/appSlice";
import { getRowValueByType, toSentenceCase } from "../../utils/data-utils";
import { LiaSortSolid } from "react-icons/lia";
import styles from "./index.module.scss";

export const CustomTable = () => {
  const tableData = useSelector(selectTableData);
  const sortState = useSelector(selectSortState);
  const dispatch = useDispatch();
  if (!tableData || !tableData.length) return null;

  const onSort = (column) => {
    const { sortByKey, direction } = sortState;
    const newSortState = {
      sortByKey: column,
      direction: sortByKey === column && direction === "asc" ? "desc" : "asc",
    };
    dispatch(setSortState(newSortState));
  };
  const columns = Object.keys(tableData[0]);
  return (
    <div className={styles.table_container}>
      <Table size="lg" bordered hover>
        <thead>
          <tr>
            {columns.map((column, idx) => (
              <th key={idx}>
                {toSentenceCase(column)}
                <span
                  onClick={() => onSort(column)}
                  className={styles.sort_icon}
                >
                  <LiaSortSolid />
                </span>
              </th>
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
