import { LayoutProvider } from '../../contexts/LayoutContext';

const PopUp = ({ children }) => {
  return (
    <div className="popUp">
      <LayoutProvider>
        <section>{children}</section>
      </LayoutProvider>
    </div>
  );
};

export default PopUp;
