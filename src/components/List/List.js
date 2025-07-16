import BasicList from './BasicList';
import SlideList from './SlideList';

const List = ({ title, type, data, onClick, renderItem, allDel, onDelete }) => {
  return (
    <section className="List">
      <div className="listHeader">
        <h1 className="listTit">{title}</h1>
        {allDel}
      </div>
      <div className="listContent">
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
    </section>
  );
};

export default List;
