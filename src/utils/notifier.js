import { notification } from 'antd';

export const notifier = {
  timer: 6,

  setTimer(sec) {
    this.timer = sec;
  },

  success(message, description = '', duration = this.timer) {
    notification.success({
      message,
      description,
      className: description ? 'notifier-content' : 'notifier-no-content',
      duration,
    });
  },

  error(message, description = '', duration = this.timer) {
    notification.error({
      message,
      description,
      className: description ? 'notifier-content' : 'notifier-no-content',
      duration,
    });
  },
};

export default notifier;
