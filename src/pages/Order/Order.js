import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Page from '../../components/Page/Page';
import MovieList from '../../components/MovieList/MovieList';
import AccordionList from '../../components/AccordionList/AccordionList';
import OrderForm from './components/OrderForm/OrderForm';
import price from '../../constants/price';
import PopUp from '../../components/PopUp/PopUp';

const Order = () => {
  const [credit, setCredit] = useState(false);
  const navigate = useNavigate();

  const cartList = JSON.parse(localStorage.getItem('movie')) || [];
  const handleCredit = () => {
    setCredit(true);
    setTimeout(() => {
      setCredit(false);
      navigate('/completedOrder');
    }, '3000');
  };

  return (
    <div className="Order">
      <Page
        header={<Header header={'결제'} back />}
        footer={
          <Button
            type="submit"
            styleType={'full'}
            styleSize={'large'}
            text={'결제하기'}
            form="order-form"
            onClick={handleCredit}
          />
        }
      >
        <AccordionList
          title={'주문 내역'}
          boolean={false}
          detail={`${cartList[0].title} `}
          // detailCount={
          //   cartList.length > 1 ? `외 ${cartList.length - 1}건` : null
          // }
        >
          <MovieList list={cartList} />
        </AccordionList>
        <OrderForm />
        <AccordionList title={'결제금액'} boolean={true}>
          {price().map(price => (
            <div className="productPrice">
              <span>{price.label}</span>
              <span>{price.value}원</span>
            </div>
          ))}
        </AccordionList>
      </Page>{' '}
      {credit && (
        <PopUp>
          <BeatLoader />
          <div>
            <p>결제 진행 중입니다.</p>
            <p>잠시만 기다려 주세요.</p>
          </div>
        </PopUp>
      )}
    </div>
  );
};

export default Order;
