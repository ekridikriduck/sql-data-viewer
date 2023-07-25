import { useMemo, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import clx from "classnames";
import {
  DATA_MAP_KEYS,
  getColumnItemsByTableName,
} from "../../utils/data-utils";
import styles from "./index.module.scss";

export const TableAndColumnSelect = ({
  onTableItemClick,
  onColumnItemClick,
  tableValue = "",
  columnValue = "",
}) => {
  const [tableDropdownOpen, setTableDropdownOpen] = useState(false);
  const [columnDropdownOpen, setColumnDropdownOpen] = useState(false);
  const toggleTableDropdown = () =>
    setTableDropdownOpen((prevState) => !prevState);
  const toggleColumnDropdown = () =>
    setColumnDropdownOpen((prevState) => !prevState);

  const tableItems = DATA_MAP_KEYS.map((tableName) => {
    return (
      <DropdownItem
        className={styles.builder_select_menu_item}
        key={tableName}
        onClick={() => onTableItemClick(tableName)}
      >
        {tableName}
      </DropdownItem>
    );
  });

  const columnItemValues = useMemo(() => {
    if (!tableValue) return [];
    return getColumnItemsByTableName(tableValue);
  }, [tableValue]);

  const columnItems = columnItemValues.map((column) => {
    const { key, type } = column;
    return (
      <DropdownItem
        className={styles.builder_select_menu_item}
        key={key}
        onClick={() => onColumnItemClick(key)}
      >
        {key + " (" + type + ")"}
      </DropdownItem>
    );
  });

  return (
    <div className={styles.select_query_cols_and_tables_wrapper}>
      <div className={styles.table_column_item}>
        <div className={styles.select_label}>Select Table</div>
        <Dropdown
          className={styles.builder_select}
          isOpen={tableDropdownOpen}
          toggle={toggleTableDropdown}
        >
          <DropdownToggle className={clx(styles.builder_select_toggle)} caret>
            {tableValue ? tableValue : "Table"}
          </DropdownToggle>
          <DropdownMenu className={styles.builder_select_menu}>
            {tableItems}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className={styles.table_column_item}>
        <div className={styles.select_label}>Select Column</div>
        <Dropdown
          className={styles.builder_select}
          isOpen={columnDropdownOpen}
          toggle={toggleColumnDropdown}
        >
          <DropdownToggle className={clx(styles.builder_select_toggle)} caret>
            {columnValue ? columnValue : "Column"}
          </DropdownToggle>
          <DropdownMenu className={styles.builder_select_menu}>
            {columnItems}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};
