import { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { SQL_OPERATIONS } from "../../constants";
import styles from "./index.module.scss";

export const OperationSelect = ({ onItemClick, value = "" }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const dropdownItems = SQL_OPERATIONS.map((operation) => {
    const { value, description } = operation;
    return (
      <DropdownItem
        className={styles.builder_select_menu_item}
        key={value}
        onClick={() => onItemClick(value)}
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
