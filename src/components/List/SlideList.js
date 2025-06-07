import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import DelBtn from '../Button/DelBtn';

const SlideList = ({ data, onClick, onDelete }) => {
  return (
    <Swiper modules={[FreeMode]} spaceBetween={5} slidesPerView="auto">
      {data.map((item, i) => (
        <SwiperSlide key={item.id ?? `${item.text}-${i}`}>
          <span className="listItem">
            <span onClick={() => onClick(item)}>{item.text}</span>
            <DelBtn
              onClick={e => {
                e.preventDefault();
                onDelete(item.id ?? item.text);
              }}
            />
          </span>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SlideList;
