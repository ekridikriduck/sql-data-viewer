import { useState, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { CustomButton } from "../CustomButton";
import { CustomInput } from "../CustomInput";
import { OperationSelect } from "./OperationSelect";
import { TableAndColumnSelect } from "./TableAndColumnSelect";
import { addSavedQuery, setActiveQuery } from "../../redux/appSlice";
import {
  selectQueryName,
  setValues,
  selectQueryPreview,
  selectCondition,
  resetQueryBuilder,
} from "../../redux/queryBuilderSlice";
import styles from "./index.module.scss";

export const QueryBuilderToggler = () => {
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const toggle = () => {
    dispatch(resetQueryBuilder());
    setOpen(!isOpen);
  };
  return (
    <>
      <CustomButton onClick={toggle} color="primary">
        Build Query
      </CustomButton>
      {isOpen && <QueryBuilder isOpen={isOpen} onToggle={toggle} />}
    </>
  );
};

export const QueryBuilder = ({ isOpen, onToggle }) => {
  return (
    <Modal toggle={onToggle} size="lg" centered isOpen={isOpen}>
      <ModalHeader className={styles.query_builder_header}>
        Query Builder
      </ModalHeader>
      <ModalBody className={styles.query_builder_body}>
        <QueryPreviewField />
        <QueryNameField />
        <OperationSelect />
        <TableAndColumnSelect />
        <FilterField />
      </ModalBody>
      <ModalFooter>
        <CustomButton onClick={onToggle}>Cancel</CustomButton>
        <SaveQueryButton onToggle={onToggle} />
        <DoneButton onToggle={onToggle} />
      </ModalFooter>
    </Modal>
  );
};

const QueryNameField = () => {
  const dispatch = useDispatch();
  const queryName = useSelector(selectQueryName);
  const onChangeHandler = (e) => {
    dispatch(setValues({ key: "queryName", value: e.target.value }));
  };
  return (
    <CustomInput
      onChange={onChangeHandler}
      label="Query Name"
      value={queryName}
    />
  );
};

const QueryPreviewField = () => {
  const queryValue = useSelector(selectQueryPreview);
  return <CustomInput label="Query Preview" disabled value={queryValue} />;
};

const FilterField = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectCondition);
  const onChangeHandler = (e) => {
    dispatch(setValues({ key: "condition", value: e.target.value }));
  };
  return (
    <CustomInput
      label="Filter"
      onChange={onChangeHandler}
      value={filterValue}
      placeholder="Apply a filter to your query"
    />
  );
};

const SaveQueryButton = ({ onToggle }) => {
  const id = useId();
  const dispatch = useDispatch();
  const queryName = useSelector(selectQueryName);
  const queryValue = useSelector(selectQueryPreview);
  const onClick = () => {
    dispatch(
      addSavedQuery({ id, name: queryName || "Unnamed", query: queryValue })
    );
    onToggle();
  };
  return (
    <CustomButton onClick={onClick} color="primary">
      Save Query
    </CustomButton>
  );
};

const DoneButton = ({ onToggle }) => {
  const dispatch = useDispatch();
  const queryValue = useSelector(selectQueryPreview);
  const onClick = () => {
    dispatch(setActiveQuery(queryValue));
    onToggle();
  };
  return (
    <CustomButton onClick={onClick} color="primary">
      Done
    </CustomButton>
  );
};
