import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { selectOperation, setValues } from "../../redux/queryBuilderSlice";
import { SQL_OPERATIONS } from "../../constants";
import styles from "./index.module.scss";

export const OperationSelect = () => {
  const dispatch = useDispatch();
  const value = useSelector(selectOperation);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const dropdownItems = SQL_OPERATIONS.map((operation) => {
    const { value, description } = operation;
    return (
      <DropdownItem
        className={styles.builder_select_menu_item}
        key={value}
        onClick={() => {
          dispatch(setValues({ key: "operation", value: value }));
        }}
      >
        {value}
        <span className={styles.operation_desc}>
          {" (" + description + ")"}
        </span>
      </DropdownItem>
    );
  });
  return (
    <div className={styles.select_query_operation_wrapper}>
      <div className={styles.select_label}>Select Query Operation</div>
      <Dropdown
        className={styles.builder_select}
        isOpen={dropdownOpen}
        toggle={toggle}
      >
        <DropdownToggle className={styles.builder_select_toggle} caret>
          {value ? value : "Operation"}
        </DropdownToggle>
        <DropdownMenu className={styles.builder_select_menu}>
          {dropdownItems}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
