import React from 'react';
import { BeatLoader } from 'react-spinners';

const Loading = ({ isLoading, error }) => {
  return (
    <div className="loading">
      {isLoading && <BeatLoader />}
      {error && <p>오류 발생 잠시후 다시 시도해주세요</p>}
    </div>
  );
};

export default Loading;
