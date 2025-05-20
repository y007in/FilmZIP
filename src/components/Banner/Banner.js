const Banner = ({ text, bannerType }) => {
  const ban_type = ['brandSolid', 'brand', 'sub'].includes(bannerType)
    ? bannerType
    : '';
  return <span className={[`banner ${ban_type}`]}>{text}</span>;
};

export default Banner;
