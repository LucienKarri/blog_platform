import classes from './ErrorAlert.module.css';

const ErrorAlert = ({ error, type = 'default' }) => {
  const messages = Object.entries(JSON.parse(error));

  if (type === 'default') {
    return <p className={classes.error}>{`${messages[0][0]} ${messages[0][1]}`}</p>;
  }
  for (let i = 0; i < messages.length; i++) {
    if (messages[i][0] === type) {
      return <p className={classes.error}>{`${messages[i][0]} ${messages[i][1]}`}</p>;
    }
  }

  return null;
};

export default ErrorAlert;
