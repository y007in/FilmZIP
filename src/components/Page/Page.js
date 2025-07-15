import { useContext } from 'react';
import { LayoutContext } from '../../contexts/LayoutContext';
import PopUp from '../PopUp/PopUp';

const Page = ({ header, children, footer }) => {
  const { dialog } = useContext(LayoutContext);
  return (
    <div className="Page">
      {header && <header>{header}</header>}
      <main>{children}</main>
      {footer && <footer>{footer}</footer>}
      {dialog.isOpen && <PopUp>{dialog.content}</PopUp>}
    </div>
  );
};

export default Page;
