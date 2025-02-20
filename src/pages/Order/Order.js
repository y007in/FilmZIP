import { useState } from 'react';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import FormControl from '../../components/FormControl/FormControl';
import Page from '../../components/Page/Page';
import MovieList from '../../components/MovieList/MovieList';
import AccordionList from '../../components/AccordionList/AccordionList';
import { paymentMethod } from '../../constants/paymentMethod';

const Order = () => {
  const [checked, setChecked] = useState(paymentMethod[0]);
  const handleSubmit = e => {
    e.preventDefault();
    console.log('submit');
  };
  const cartList = JSON.parse(localStorage.getItem('movie')) || [];

  return (
    <div className="Order">
      <Page
        header={<Header header={'결제'} back />}
        footer={
          <Button
            styleType={'full'}
            text={'결제하기'}
            form="order-form"
            type="submit"
          />
        }
      >
        <AccordionList
          title={'주문 내역'}
          boolean={false}
          // detail={`${cartList[0].title} `}
          // detailCount={
          //   cartList.length > 1 ? `외 ${cartList.length - 1}건` : null
          // }
        >
          <MovieList list={cartList} />
        </AccordionList>
        <form className="forms" id="order-form" onSubmit={handleSubmit}>
          <AccordionList title={'개인정보'} boolean={true}>
            <FormControl label={'이름'} htmlFor={'userName'} required>
              <input
                type="text"
                id="userName"
                name="userName"
                placeholder="이름"
                autoFocus
                required
              />
            </FormControl>
            <FormControl label={'전화번호'} htmlFor={'userTel'} required>
              <input
                type="text"
                id="userTel"
                name="userTel"
                placeholder="01000000000"
                pattern="^\d{2,3}\d{3,4}\d{4}$"
                required
              />
            </FormControl>
          </AccordionList>
          <AccordionList title={'결제수단'} boolean={true}>
            <section className="paymentMethod">
              {paymentMethod.map(method => (
                <FormControl
                  key={method}
                  label={method}
                  htmlFor={method}
                  sr_only={'sr-only'}
                >
                  <Button
                    styleType={checked === method ? 'brand' : 'brandSolid'}
                    onClick={e => {
                      e.preventDefault();
                      setChecked(method);
                    }}
                    text={method}
                  />
                  <input
                    type="radio"
                    name="paymentMethod"
                    id={method}
                    value={method}
                    checked={checked === method}
                    onChange={() => setChecked(method)}
                  />
                </FormControl>
              ))}
            </section>
          </AccordionList>
          <AccordionList title={'총 결제금액'} boolean={true}></AccordionList>
        </form>
      </Page>
    </div>
  );
};

export default Order;
