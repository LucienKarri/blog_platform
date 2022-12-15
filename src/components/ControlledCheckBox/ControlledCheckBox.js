import { Controller } from 'react-hook-form';
import { Checkbox } from 'antd';

import classes from './ControlledCheckBox.module.css';

const ControlledCheckBox = ({ control, name, text }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Checkbox {...field} checked={field.value}>
            {text}
          </Checkbox>
          {error && <p className={classes.error}>{error.message}</p>}
        </>
      )}
    />
  );
};

export { ControlledCheckBox };
