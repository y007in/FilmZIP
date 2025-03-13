import { useRef, useState } from 'react';
import FormControl from '../../../../components/FormControl/FormControl';
import AccordionList from '../../../../components/AccordionList/AccordionList';
import Button from '../../../../components/Button/Button';
import { paymentMethod } from '../../../../constants/paymentMethod';
import { formatDate, randomNum } from '../../../../utils/date';
import { getCartList } from '../../../../utils/storage';
import price from '../../../../constants/price';

const OrderForm = ({ onSubmit }) => {
  const [checked, setChecked] = useState(paymentMethod[0]);
  const userNameRef = useRef(null);
  const userTelRef = useRef(null);
  const [errors, setErrors] = useState({
    name: '',
    tel: '',
  });

  const validate = values => {
    let errors = {};
    if (!values.name.trim()) {
      errors.name = '이름을 입력하세요';
    }
    if (!values.tel.trim()) {
      errors.tel = '전화번호를 입력하세요';
    } else if (!/^\d{2,3}\d{3,4}\d{4}$/.test(values.tel)) {
      errors.tel = '올바른 전화번호 형식을 입력하세요';
    }
    return errors;
  };
  const values = {
    name: userNameRef.current?.value || '',
    tel: userTelRef.current?.value || '',
  };

  const handleSubmit = e => {
    e.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const formData = {
      num: randomNum,
      date: formatDate,
      name: values.name,
      tel: values.tel,
      payment: checked,
      product: getCartList()[0]?.title || '상품 없음',
      price: price()[2]?.value || 0,
    };

    onSubmit(formData);
  };

  return (
    <form className="forms" id="order-form" onSubmit={handleSubmit}>
      <AccordionList title={'개인정보'} boolean={true}>
        <FormControl label={'이름'} htmlFor={'userName'} errors={errors.name}>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="이름"
            ref={userNameRef}
            autoFocus
          />
        </FormControl>
        <FormControl label={'전화번호'} htmlFor={'userTel'} errors={errors.tel}>
          <input
            type="text"
            id="userTel"
            name="userTel"
            placeholder=" - 없이 입력"
            ref={userTelRef}
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
    </form>
  );
};

export default OrderForm;
