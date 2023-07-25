import { useEffect, useState, useId } from "react";
import { useDispatch } from "react-redux";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { CustomButton } from "../CustomButton";
import { CustomInput } from "../CustomInput";
import { OperationSelect } from "./OperationSelect";
import { TableAndColumnSelect } from "./TableAndColumnSelect";
import { addSavedQuery, setActiveQuery } from "../../redux/store";
import styles from "./index.module.scss";

export const QueryBuilderToggler = () => {
  const [isOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!isOpen);
  return (
    <>
      <CustomButton onClick={toggle} color="primary">
        Build Query
      </CustomButton>
      {isOpen && <QueryBuilder isOpen={isOpen} onToggle={toggle} />}
    </>
  );
};

const INITIAL_BUILDER_STATE = {
  operation: "",
  table: "",
  column: "",
  condition: "",
};

export const QueryBuilder = ({ isOpen, onToggle }) => {
  const dispatch = useDispatch();
  const [builderState, setBuilderState] = useState({
    ...INITIAL_BUILDER_STATE,
  });
  const [queryName, setQueryName] = useState("");
  const id = useId();

  useEffect(() => {
    // reset state when modal is closed
    return () => setBuilderState({ ...INITIAL_BUILDER_STATE });
  }, [isOpen]);

  const onOperationSelect = (operation) =>
    setBuilderState({ ...builderState, operation: operation });

  const onTableSelect = (table) => {
    setBuilderState({ ...builderState, table: table, column: "" });
  };

  const onQueryNameChangeHandler = (e) => setQueryName(e.target.value);

  const onColumnSelect = (column) =>
    setBuilderState({ ...builderState, column: column });

  const onConditionChange = (e) =>
    setBuilderState({ ...builderState, condition: e.target.value });

  const getQuery = () => {
    const { operation, table, column, condition } = builderState;
    let baseQuery = `SELECT`;
    if (operation) baseQuery = baseQuery.concat(` ${operation}`);
    if (column) baseQuery = baseQuery.concat(` (${column})`);
    if (table) baseQuery = baseQuery.concat(` FROM ${table}`);
    if (condition) baseQuery = baseQuery.concat(` WHERE ${condition}`);

    return baseQuery.concat(`;`);
  };

  const onSaveQuery = () => {
    dispatch(
      addSavedQuery({ id, name: queryName || "Unnamed", query: getQuery() })
    );
    onToggle();
  };

  const onDoneClick = () => {
    dispatch(setActiveQuery(getQuery()));
    onToggle();
  };

  return (
    <Modal toggle={onToggle} size="lg" centered isOpen={isOpen}>
      <ModalHeader className={styles.query_builder_header}>
        Query Builder
      </ModalHeader>
      <ModalBody className={styles.query_builder_body}>
        <CustomInput label="Query Preview" disabled value={getQuery()} />
        <CustomInput
          label="Query Name"
          onChange={onQueryNameChangeHandler}
          value={queryName}
        />
        <OperationSelect
          onItemClick={onOperationSelect}
          value={builderState.operation}
        />
        <TableAndColumnSelect
          onTableItemClick={onTableSelect}
          tableValue={builderState.table}
          columnValue={builderState.column}
          onColumnItemClick={onColumnSelect}
        />
        <CustomInput
          label="Condition"
          placeholder="Apply a filter to your query"
          onChange={onConditionChange}
          value={builderState.condition}
        />
      </ModalBody>
      <ModalFooter>
        <CustomButton onClick={onToggle}>Cancel</CustomButton>
        <CustomButton onClick={onSaveQuery} color="primary">
          Save Query
        </CustomButton>
        <CustomButton onClick={onDoneClick} color="primary">
          Done
        </CustomButton>
      </ModalFooter>
    </Modal>
  );
};
