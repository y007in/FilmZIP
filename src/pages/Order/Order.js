import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Page from '../../components/Page/Page';
import MovieList from '../../components/MovieList/MovieList';
import AccordionList from '../../components/AccordionList/AccordionList';
import OrderForm from './components/OrderForm/OrderForm';

import PopUp from '../../components/PopUp/PopUp';
import ProductPrice from '../../components/ProductPrice/ProductPrice';

const Order = () => {
  const [credit, setCredit] = useState(false);
  const navigate = useNavigate();

  const cartList = JSON.parse(localStorage.getItem('movie')) || [];
  const handleSubmit = formData => {
    setCredit(true);
    setTimeout(() => {
      setCredit(false);
      navigate('/completedOrder', { state: formData });
    }, '3000');
  };

  return (
    <div className="Order">
      <Page
        header={<Header header={'결제'} back />}
        footer={
          <Button
            styleType={'full'}
            styleSize={'large'}
            text={'결제하기'}
            form="order-form"
            onClick={() =>
              document.getElementById('order-form').requestSubmit()
            }
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
        <OrderForm onSubmit={handleSubmit} />
        <AccordionList title={'결제금액'} boolean={true}>
          <ProductPrice />
        </AccordionList>
      </Page>
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
