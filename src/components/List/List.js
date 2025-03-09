import BasicList from './BasicList';
import SlideList from './SlideList';

const List = ({ title, type, data, onClick, renderItem, allDel }) => {
  return (
    <div className="List">
      <div className="listHeader">
        <h1 className="listTit">{title}</h1>
        {allDel}
      </div>
      {type === 'slide' ? (
        <SlideList data={data} renderItem={renderItem} onClick={onClick} />
      ) : (
        <BasicList data={data} renderItem={renderItem} onClick={onClick} />
      )}
    </div>
  );
};

export default List;
