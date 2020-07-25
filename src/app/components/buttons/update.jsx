import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { func, shape, string, bool } from 'prop-types';

const UpdateButton = ({ setSubmitting, record, disabled }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const submit = useCallback((event) => {
    if (event) event.preventDefault();
    closeSnackbar();
    setSubmitting(true);
    const { id, title, frequency, url, imageUrl } = record;

    axios.patch(`/api/${id}?title=${title}&&frequency=${frequency}&&url=${url}&&imageUrl=${imageUrl}`)
      .then((res) => {
        if (res) {
          enqueueSnackbar('Successfully Updated');
        } else {
          enqueueSnackbar('Oops! Something gone wrong');
        }
      })
      .catch(() => {
        enqueueSnackbar('Oops! Something gone wrong');
      });
    setSubmitting(false);
  }, [closeSnackbar, setSubmitting, record, enqueueSnackbar]);

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

UpdateButton.propTypes = {
  setSubmitting: func.isRequired,
  record: shape({
    id: string,
    title: string,
    frequency: string,
    url: string,
    imageUrl: string,
  }).isRequired,
  disabled: bool.isRequired,
};

export default UpdateButton;
