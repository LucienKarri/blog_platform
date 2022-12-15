import { Controller } from 'react-hook-form';
import { Input } from 'antd';

import classes from './ControlledTextArea.module.css';
const { TextArea } = Input;

const ControlledTextArea = ({ control, name, placeholder, defaultValue = '' }) => {
  return (
    <label className={classes.label}>
      {placeholder}
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <TextArea
              placeholder={placeholder}
              status={error ? 'error' : null}
              autoSize={{ minRows: 6, maxRows: 6 }}
              {...field}
            />
            {error && <p className={classes.error}>{error.message}</p>}
          </>
        )}
      />
    </label>
  );
};

export { ControlledTextArea };
