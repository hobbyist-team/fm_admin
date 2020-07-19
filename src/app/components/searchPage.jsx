import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchPage = () => {
  const [fmList, setFMList] = useState([]);
  const [loading, setLoading] = useState(true);

  const sortFMByTitle = (titleA, titleB) => {
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
  };

  useEffect(() => {
    // TODO
    // MOVE THIS TO ITS CUSTOM HOOK
    // ADD TEST
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

  return (
    <table id="fm-stations">
      <thead>
        <tr>
          <th>Station</th>
          <th>Frequency</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {!loading && fmList.length > 0
          ? fmList.map(fm => (
            <tr key={fm.id}>
              <td>{fm.title}</td>
              <td>{fm.frequency}</td>
              <td className="fm-img"><img src={fm.imageUrl} alt={fm.title} /></td>
            </tr>
          ))
          : <>Still loading....</>}
      </tbody>
    </table>
  );
};

export default SearchPage;
