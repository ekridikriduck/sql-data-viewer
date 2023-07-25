import { Input } from "reactstrap";
import styles from "./index.module.scss";
export const CustomInput = ({ label, placeholder, id, value, ...rest }) => {
  return (
    <div className={styles.custom_input_wrapper}>
      <label htmlFor={id}>{label}</label>
      <Input
        id={id}
        className={styles.custom_input}
        value={value}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};
