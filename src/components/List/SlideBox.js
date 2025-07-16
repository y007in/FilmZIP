import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import Poster from '../Poster/Poster';
import SlideList from './SlideList';

const SlideBox = ({ title, data, contentType }) => {
  return (
    <article className="slideBox">
      <h1 className="contentTit">{title}</h1>
      <SlideList data={data} contentType={contentType} />
    </article>
  );
};

export default SlideBox;
