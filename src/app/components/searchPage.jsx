import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { Route } from 'react-router-dom';
import FMStation from './fm';

const SearchPage = () => {
  const [fmList, setFMList] = useState([]);
  const [loading, setLoading] = useState(true);

  const sortFMByTitle = (titleA, titleB) => {
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('/api');
      const { data } = result;
      const fmByAscendingTitle = data.sort((a, b) => sortFMByTitle(
        a.title.toUpperCase(), b.title.toUpperCase(),
      ));

      setLoading(false);
      setFMList(fmByAscendingTitle);
    };
    fetchData();
  }, []);

  const onClick = fm => <Route path="/fm" render={() => <FMStation record={fm} edit />} />;

  return (
    <table id="fm-stations">
      <thead>
        <tr>
          <th>Station</th>
          <th>Frequency</th>
          <th>Image</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {!loading && fmList.length > 0
          ? fmList.map(fm => (
            <tr key={fm.id}>
              <td>{fm.title}</td>
              <td>{fm.frequency}</td>
              <td className="fm-img"><img src={fm.imageUrl} alt={fm.title} /></td>
              <td><Button onClick={() => onClick(fm)}>Click me</Button></td>
            </tr>
          ))
          : <>Still loading....</>}
      </tbody>
    </table>
  );
};

export default SearchPage;
