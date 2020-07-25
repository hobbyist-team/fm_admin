import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { func, shape, string, bool } from 'prop-types';

const AddButton = ({ setSubmitting, newRecord, disabled, dispatch }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const submit = useCallback((event) => {
    if (event) event.preventDefault();
    closeSnackbar();
    setSubmitting(true);
    axios.post('/api', newRecord)
      .then((res) => {
        if (res) {
          dispatch({ type: 'reset' });
          enqueueSnackbar('Successfully Added. Add another?');
        } else {
          enqueueSnackbar('Oops! Something gone wrong');
        }
      })
      .catch(() => {
        enqueueSnackbar('Oops! Something gone wrong');
      });
    setSubmitting(false);
  }, [closeSnackbar, setSubmitting, newRecord, dispatch, enqueueSnackbar]);

  return (
    <Button
      type="submit"
      color="primary"
      onClick={submit}
      disabled={disabled}
    >
      Submit
    </Button>
  );
};

AddButton.propTypes = {
  setSubmitting: func.isRequired,
  newRecord: shape({
    title: string,
    frequency: string,
    url: string,
    imageUrl: string,
  }).isRequired,
  disabled: bool.isRequired,
  dispatch: func.isRequired,
};

export default AddButton;
