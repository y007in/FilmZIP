import { useState, useEffect } from 'react';
import { getMovieRecords } from '../utils/storage';

export const useRecordList = () => {
  const [recordList, setRecordList] = useState([]);

  useEffect(() => {
    const records = getMovieRecords();
    setRecordList(records);
  }, []);

  const getRecordList = id => {
    return recordList
      .filter(item => item.movieId === Number(id))
      .sort((a, b) => {
        const dateA = new Date(a.watchEndDate);
        const dateB = new Date(b.watchEndDate);

        if (dateA.getTime() === dateB.getTime()) return b.createId - a.createId;

        // 날짜 최신순 정렬
        return dateB - dateA;
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
    return deduplicated.reverse();
  };

  return {
    recordList,
    setRecordList,
    getRecordList,
    getNoDupRecordList,
  };
};
