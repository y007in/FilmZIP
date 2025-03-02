import React from 'react';
import Page from '../../components/Page/Page';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import price from '../../constants/price';

const CompletedOrder = () => {
  const cartList = JSON.parse(localStorage.getItem('movie')) || [];
  const navigate = useNavigate();
  const location = useLocation();
  const { name, tel, payment } = location.state || {};
  const data = [
    { label: '예매번호', content: '202500000001' },
    {
      label: '예매일',
      content: '2025.00.00',
    },

    { label: '예매자명', content: name },
    {
      label: '연락처',
      content: tel,
    },
    {
      label: '결제방법',
      content: payment,
    },
    {
      label: '예매목록',
      content: `${cartList[0].title}`,
    },
    { label: '결제금액', content: `${price()[2].value}원` },
  ];
  return (
    <div className="CompletedOrder">
      <Page header={<Header back />}>
        <div className="orderContainer">
          <div className="bookInfo">
            <h1>결제가 완료되었습니다.</h1>
            {data.map(book => (
              <div className="personalBook" key={book.label}>
                <p className="bookLabel">{book.label}</p>
                <p className="bookContent">{book.content}</p>
              </div>
            ))}
            <Button
              text={'홈으로'}
              styleSize={'small'}
              styleType={'full'}
              onClick={() => navigate('/')}
            />
          </div>
          <ul className="precautions">
            <li>
              ※ 구매 후 시청하시기 전에 구매일로부터 7일 이내에 구매 취소
              가능합니다.
            </li>
          </ul>
        </div>
      </Page>
    </div>
  );
};

export default CompletedOrder;
