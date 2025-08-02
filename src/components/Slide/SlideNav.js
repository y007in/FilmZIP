import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ContentType, MvInfoKrTit } from '../MovieTitle/MovieTitle';
import { useNavigate } from 'react-router-dom';
import { getContentType } from '../../utils/getContentType';

const SlideNav = ({ data }) => {
  const navigate = useNavigate();
  console.log(data);

  return (
    <Swiper navigation modules={[Navigation]} className="bannerSwipe">
      {data.map((item, idx) => (
        <SwiperSlide
          key={item.id || idx}
          onClick={() =>
            navigate(
              `/detail/${getContentType(item, 'movie', 'tv')}/${item.id}`,
            )
          }
        >
          <img
            className="air"
            src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
            alt={`${item.title || item.name} 배경 이미지`}
          />
          <div className="bannerItemTit">
            <MvInfoKrTit data={item} />
            <ContentType data={item} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SlideNav;
