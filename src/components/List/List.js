import BasicList from './BasicList';
import SlideList from './SlideList';

const List = ({ title, type, data, onClick, renderItem, allDel, onDelete }) => {
  return (
    <div className="List">
      <div className="listHeader">
        <h1 className="listTit">{title}</h1>
        {allDel}
      </div>
      {type === 'slide' ? (
        <SlideList
          data={data}
          renderItem={renderItem}
          onClick={onClick}
          onDelete={onDelete}
        />
      ) : (
        <BasicList
          data={data}
          renderItem={renderItem}
          onClick={onClick}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default List;
