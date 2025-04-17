import List from '../../../../components/List/List';
import { setSearchKeywordList } from '../../../../utils/storage';
import { TabType } from '../../../../constants/tabs';
import { useEffect } from 'react';

const HistoryKeyword = ({ historyList, handleRecommend }) => {
  const handleAllDel = e => {
    e.preventDefault();
    setSearchKeywordList([]);
    window.location.reload();
  };

  return (
    <>
      {historyList.length !== 0 && (
        <List
          title={TabType.HISTORY}
          type={'slide'}
          data={historyList}
          onClick={item => handleRecommend(item.text)}
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
