import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LinearProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import TextLink from './buttons/textLink';

const SearchPage = () => {
  const [fmList, setFMList] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

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

  const onClick = (fm) => {
    history.push({
      pathname: '/fm',
      record: fm,
      edit: true,
    });
  };

  return (
    <>
      {!loading && fmList.length > 0
        ? (
          <table id="fm-stations">
            <thead>
              <tr>
                <th>Station</th>
                <th>Frequency</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {fmList.map(fm => (
                <tr key={fm.id} onClick={() => onClick(fm)}>
                  <td><TextLink text={fm.title} onClick={() => onClick(fm)} /></td>
                  <td>{fm.frequency}</td>
                  <td className="fm-img"><img src={fm.imageUrl} alt={fm.title} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )
        : <LinearProgress />}
    </>
  );
};

export default SearchPage;
