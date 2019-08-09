import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    width: 300
  },
}));

export default function AddTaskForm({error, name, handleChange, type, value, label, errorMessage, multiline}) {
  const [labelWidth, setLabelWidth] = React.useState(0);
  const labelRef = React.useRef(null);
  const classes = useStyles();

  React.useEffect(() => {
    setLabelWidth(labelRef.current.offsetWidth);
  }, []);


  return (
      <div className={classes.container}>
        <FormControl className={classes.formControl} variant="outlined" error={error}>
          <InputLabel ref={labelRef} htmlFor="component-outlined">
            {label}
          </InputLabel>
          <OutlinedInput
              value={value}
              type={type}
              name={name}
              onChange={handleChange}
              labelWidth={labelWidth}
              multiline={multiline}
              rows={3}
              rowsMax={3}
              aria-describedby="component-error-text"
          />
          {error ? <FormHelperText id="component-error-text">{errorMessage}</FormHelperText>: null}
        </FormControl>
      </div>
  );
}
