import React from 'react';

const Banner = ({ text, bannerType }) => {
  return <span className={[`banner ${bannerType}`]}>{text}</span>;
};

export default Banner;
