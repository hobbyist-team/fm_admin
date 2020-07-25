import React, { useState, useReducer, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { string, shape, bool } from 'prop-types';
import Delete from './buttons/delete';
import AddButton from './buttons/add';
import UpdateButton from './buttons/update';

const FM = ({ edit, record }) => {
  const initialState = {
    title: record.title || '',
    url: record.url || '',
    frequency: record.frequency || '',
    imageUrl: record.imageUrl || '',
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

  const [state, dispatch] = useReducer(reducer, initialState);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (name, value) => {
    dispatch({ type: 'update', data: { name, value } });
  };

  useEffect(() => {
    Object.keys(state).forEach((key) => {
      if (state[key] === '') {
        setFormError('Please add the required information');
      } else {
        setFormError('');
      }
    });
  }, [state]);

  return (
    <div className="form-grid">
      <h3>{formError}</h3>
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
      {!edit && (
      <AddButton
        newRecord={state}
        setSubmitting={setSubmitting}
        disabled={submitting || !!formError}
        dispatch={dispatch}
      />
      )}
      {edit && (
        <>
          <UpdateButton
            record={state}
            disabled={submitting || !!formError}
            setSubmitting={setSubmitting}
          />
          <Delete id={record.id} />
        </>
      )}
    </div>
  );
};

FM.propTypes = {
  record: shape({
    title: string,
    frequency: string,
    url: string,
    imageUrl: string,
    id: string,
  }),
  edit: bool,
};

FM.defaultProps = {
  record: {},
  edit: false,
};

export default FM;
