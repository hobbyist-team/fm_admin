import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { string } from 'prop-types';
import { useSnackbar } from 'notistack';

const DeleteButton = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteRecord = useCallback((event) => {
    if (event) event.preventDefault();
    closeSnackbar();
    axios.delete(`/api/${id}`)
      .then((res) => {
        if (res) {
          enqueueSnackbar('Successfully removed the record');
        } else {
          enqueueSnackbar('Oh oh, something went horribly wrong');
        }
      })
      .catch(() => {
        enqueueSnackbar('Oh oh, something went horribly wrong');
      });
    setOpen(false);
  }, [closeSnackbar, enqueueSnackbar, id]);

  return (
    <>
      <Button
        onClick={handleOpen}
        color="secondary"
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Are you sure you want to delete this record?</DialogTitle>
        <DialogActions>
          <Button onClick={deleteRecord}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteButton.propTypes = { id: string.isRequired };

export default DeleteButton;
