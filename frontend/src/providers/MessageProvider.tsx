import {App, message as antdMessage} from 'antd';
import type {MessageInstance} from "antd/es/message/interface";

let message: MessageInstance = antdMessage;

const MessageProvider = () => {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  return null;
}

export {message};
export default MessageProvider; 