import React, { useState, useReducer, useCallback } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const initialState = {
  title: '',
  url: '',
  frequency: '',
  imageUrl: '',
};

const reducer = (state, action) => {
  const { data } = action;
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'update':
      return { ...state, [data.name]: data.value };
    default:
      return state;
  }
};

const FM = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [submitting, setSubmitting] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleChange = (name, value) => {
    dispatch({ type: 'update', data: { name, value } });
  };

  const submit = useCallback((event) => {
    if (event) event.preventDefault();
    closeSnackbar();
    setSubmitting(true);
    axios.post('/api', state)
      .then((res) => {
        if (res) {
          dispatch({ type: 'reset' });
          enqueueSnackbar('Successfully Added!!. Add another?');
        } else {
          enqueueSnackbar('Oops! Something gone wrong');
        }
      })
      .catch(() => {
        enqueueSnackbar('Oops! Something gone wrong');
      });
    setSubmitting(false);
  }, [closeSnackbar, enqueueSnackbar, state]);

  return (
    <div className="form-grid">
      <TextField
        id="title"
        label="Title"
        value={state.title}
        onChange={e => handleChange('title', e.target.value)}
      />
      <TextField
        id="frequency"
        label="Frequency"
        value={state.frequency}
        onChange={e => handleChange('frequency', e.target.value)}
      />
      <TextField
        id="url"
        label="Url"
        value={state.url}
        onChange={e => handleChange('url', e.target.value)}
      />
      <TextField
        id="imageUrl"
        label="ImageUrl"
        value={state.imageUrl}
        onChange={e => handleChange('imageUrl', e.target.value)}
      />
      <Button
        type="submit"
        color="primary"
        onClick={submit}
        disabled={submitting}
      >Submit
      </Button>
    </div>
  );
};

export default FM;
