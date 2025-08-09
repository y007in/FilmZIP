import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MvInfoKrTit } from '../MovieTitle/MovieTitle';
import { useNavigate } from 'react-router-dom';
import { getContentType } from '../../utils/getContentType';
import Badge from '../Badge/Badge';
import 'swiper/css/navigation';

const SlideNav = ({ data }) => {
  const navigate = useNavigate();

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
          <span className="bannerBadge">
            <Badge
              text={`상영 중인 ${getContentType(item, '영화', '시리즈')}`}
              badgeType={'sub'}
            />
          </span>
          <img
            className="air"
            src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
            alt={`${item.title || item.name} 배경 이미지`}
          />
          <div className="bannerItemTit">
            <MvInfoKrTit data={item} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SlideNav;
