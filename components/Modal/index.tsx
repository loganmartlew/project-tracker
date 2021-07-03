import {
  useEffect,
  useState,
  FC,
  MouseEventHandler,
  SetStateAction,
} from 'react';
import ReactDOM from 'react-dom';
import { ModalOverlay, ModalContainer } from './ModalStyles';

interface IProps {
  show: boolean;
  setShow: (value: SetStateAction<boolean>) => void;
}

const Modal: FC<IProps> = ({ show, setShow, children }) => {
  const [isBrowser, setIsBrowser] = useState<boolean>(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick: MouseEventHandler = e => {
    e.preventDefault();

    if (!(e.target instanceof HTMLElement)) return;
    if (!e.target.dataset.wrapper) return;

    setShow(false);
  };

  const modalContent = show && (
    <ModalOverlay onClick={handleCloseClick} data-wrapper>
      <ModalContainer>{children}</ModalContainer>
    </ModalOverlay>
  );

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')!
    );
  } else {
    return null;
  }
};

export default Modal;
