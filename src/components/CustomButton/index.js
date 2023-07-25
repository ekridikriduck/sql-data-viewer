import { Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectActiveQuery, setTableData } from "../../redux/appSlice";
import { DATA_MAP, DATA_MAP_KEYS } from "../../utils/data-utils";
import styles from "./index.module.scss";

export const CustomButton = ({ children, ...rest }) => {
  return (
    <Button className={styles.custom_button} {...rest}>
      {children}
    </Button>
  );
};

export const ExecuteQueryButton = () => {
  const dispatch = useDispatch();
  const activeQuery = useSelector(selectActiveQuery);

  const onExecuteQuery = () => {
    if (!activeQuery) return;
    const tableKey = findOne(
      activeQuery.split(" ").map((str) => str.toUpperCase()),
      DATA_MAP_KEYS
    );
    const tableData = DATA_MAP[tableKey];
    if (tableData) dispatch(setTableData(tableData));
  };
  return (
    <CustomButton onClick={onExecuteQuery} color="primary">
      Execute Query
    </CustomButton>
  );
};
var findOne = function (haystack, arr) {
  return arr.find(function (v) {
    return haystack.indexOf(v) > -1;
  });
};
