import { useLocation } from 'react-router-dom';

export const useCreditInfo = () => {
  const location = useLocation();

  const { num, date, name, tel, payment, product, price } =
    location.state || {};
  return [
    { label: '예매번호', content: num },
    {
      label: '예매일',
      content: date,
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
      content: product,
    },
    { label: '결제금액', content: `${price}원` },
  ];
};
