import { useDispatch, useSelector } from "react-redux";
import { CustomInput } from "../CustomInput";
import { setActiveQuery, selectActiveQuery } from "../../redux/store";

export const QueryInputField = () => {
  const dispatch = useDispatch();
  const activeQuery = useSelector(selectActiveQuery);

  const onChangeHandler = (e) => {
    dispatch(setActiveQuery(e.target.value));
  };

  return (
    <CustomInput
      id="sql-input"
      label="Sql Query"
      placeholder="Enter your Sql Query"
      onChange={onChangeHandler}
      value={activeQuery}
    />
  );
};
