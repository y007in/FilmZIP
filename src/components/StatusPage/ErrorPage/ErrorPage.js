import React from 'react';

const ErrorPage = ({ statusCode }) => {
  const statusText = statusCode => {
    switch (statusCode) {
      case 404:
        return '페이지를 찾을 수 없습니다.';
      case 500:
        return '페이지에 서버에 문제가 발생했어요.';
      default:
        return '페이지에 알 수 없는 오류가 발생했습니다.';
    }
  };
  return (
    <div className="ErrorPage">
      <article>
        <h1>⚠️ {statusCode} 오류 Error</h1>

        <p>요청하신 {statusText(statusCode)}</p>
        <p>서비스 이용에 불편을 드려 죄송합니다.</p>
        <p>입력하신 주소가 정확한지 확인 후 다시 시도해 주시기 바랍니다.</p>
      </article>
    </div>
  );
};

export default ErrorPage;
