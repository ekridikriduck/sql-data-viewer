import { useSelector, useDispatch } from "react-redux";
import { PREDEFINED_QUERIES } from "../../utils/data-utils";
import { selectSavedQueries, setActiveQuery } from "../../redux/store";
import styles from "./index.module.scss";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <PredefinedQueryContainer />
      <SavedQueryContainer />
    </div>
  );
};

const PredefinedQueryContainer = () => {
  const dispatch = useDispatch();

  const onQueryClickHandler = (query) => dispatch(setActiveQuery(query));

  const predefinedQueries = PREDEFINED_QUERIES.map((query) => {
    return (
      <div
        onClick={() => onQueryClickHandler(query.query)}
        key={query.name}
        className={styles.query_item}
      >
        <div className={styles.query_name}>{query.name}</div>
        <div className={styles.query_description}>{query.query}</div>
      </div>
    );
  });
  return (
    <div className={styles.sidebar_item}>
      <div className={styles.sidebar_item_header}>Default Queries</div>
      {predefinedQueries}
    </div>
  );
};

const SavedQueryContainer = () => {
  const dispatch = useDispatch();
  const savedQueries = useSelector(selectSavedQueries);

  const onQueryClickHandler = (query) => dispatch(setActiveQuery(query));

  const savedQueriesList = savedQueries.map((query) => {
    return (
      <div
        onClick={() => onQueryClickHandler(query.query)}
        key={query.id}
        className={styles.query_item}
      >
        <div className={styles.query_name}>{query.name}</div>
        <div className={styles.query_description}>{query.query}</div>
      </div>
    );
  });
  return (
    <div className={styles.sidebar_item}>
      <div className={styles.sidebar_item_header}>Saved Queries</div>
      {savedQueries.length === 0 ? (
        <div className={styles.empty_state}>No Saved Queries</div>
      ) : (
        savedQueriesList
      )}
    </div>
  );
};
