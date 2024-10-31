import { createPortal } from 'react-dom';

const ChatPortal = ({ children }) => {
  return createPortal(
    children,
    document.body
  );
};

export default ChatPortal;
