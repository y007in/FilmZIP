import { useState } from 'react';
import {
  getSearchKeywordList,
  setSearchKeywordList,
} from '../../../../utils/storage';
import List from '../../../../components/List/List';
import { TabType } from '../../../../constants/tabs';

const HistoryKeyword = ({ handleRecommend }) => {
  const [historyList, setHistoryList] = useState(getSearchKeywordList() ?? []);

  const handleDelete = key => {
    const delKeyword = historyList.filter(item => item.text !== key);
    setHistoryList(delKeyword);
    setSearchKeywordList(delKeyword);
  };

  const handleAllDel = e => {
    e.preventDefault();
    setHistoryList([]);
    setSearchKeywordList([]);
  };

  return (
    <>
      {historyList.length !== 0 && (
        <List
          title={TabType.HISTORY}
          type="slide"
          data={historyList}
          onClick={item => handleRecommend(item.text)}
          onDelete={handleDelete}
          allDel={
            <button className="allDel" onClick={handleAllDel}>
              전체 삭제
            </button>
          }
        />
      )}
    </>
  );
};

export default HistoryKeyword;
