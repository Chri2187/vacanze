import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleHoliday from './SingleHoliday';
const url = 'https://mocki.io/v1/ee2ffa96-c6b4-4bf6-96e1-ac64f2d9a27f';

const Holiday = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(0);

  const nextHoliday = () => {
    setSelected((prevValue) => {
      if (prevValue + 1 === data.data.length) {
        return 0;
      } else {
        return prevValue + 1;
      }
    });
  };
  const prevHoliday = () => {
    setSelected((prevValue) => {
      if (prevValue - 1 < 0) {
        return data.data.length - 1;
      } else {
        return prevValue - 1;
      }
    });
  };
  // fetch
  const getData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  // Conditional return
  if (data.success === true) {
    return (
      <>
        {data.data.length > 0 ? (
          <SingleHoliday
            {...data.data[selected]}
            next={nextHoliday}
            prev={prevHoliday}
          />
        ) : (
          <h4>No Vacanze</h4>
        )}
      </>
    );
  } else {
    return <h2>...Loading</h2>;
  }
};

export default Holiday;
