import { useState, useEffect } from 'react';
import { getMovieRecords } from '../utils/storage';

export const useRecordList = () => {
  const [recordList, setRecordList] = useState([]);
  const records = getMovieRecords();
  useEffect(() => {
    setRecordList(records);
  }, []);
  const getLatestRecord = () => {
    return recordList.sort((a, b) => {
      const dateA = new Date(a.watchEndDate);
      const dateB = new Date(b.watchEndDate);
      return dateA.getTime() === dateB.getTime()
        ? b.createId - a.createId
        : dateB - dateA;
    });
  };

  const getRecordList = id => {
    return recordList
      .filter(item => item.movieId === Number(id))
      .sort((a, b) => {
        const dateA = new Date(a.watchEndDate);
        const dateB = new Date(b.watchEndDate);
        return dateA.getTime() === dateB.getTime()
          ? b.createId - a.createId
          : dateB - dateA;
      });
  };

  const getNoDupRecordList = recordList => {
    const deduplicated = recordList.reduce((acc, curr) => {
      const existing = acc.find(item => item.movieId === curr.movieId);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ ...curr, count: 1 });
      }
      return acc;
    }, []);
    return deduplicated;
  };

  return {
    recordList,
    getLatestRecord,
    setRecordList,
    getRecordList,
    getNoDupRecordList,
  };
};
