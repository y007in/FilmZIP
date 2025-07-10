export const getContentType = (item, movieType, tvType) => {
  return item.title ? movieType : tvType;
};

export const getBoolContentType = (contentType, movieOpt, tvOpt) => {
  return contentType === 'movie' ? movieOpt : tvOpt;
};
