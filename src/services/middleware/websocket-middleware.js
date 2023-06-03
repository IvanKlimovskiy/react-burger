const websocketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { accessToken } = payload || {};
      const {
        connectionStart,
        connectionSuccess,
        getMessages,
        connectionError,
        connectionClose,
      } = wsActions;
      let isProfileRequest = false;

      if (type === connectionStart && accessToken) {
        isProfileRequest = true;
        socket = new WebSocket(`${wsUrl}?token=${accessToken.slice(7)}`);
      }

      if (type === connectionStart && !isProfileRequest) {
        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(connectionSuccess(event.type));
        };

        socket.onerror = (event) => {
          dispatch(connectionError(event));
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          dispatch(getMessages(data));
        };

        if (type === connectionClose) {
          socket.close();
        }
      }

      next(action);
    };
  };
};

export default websocketMiddleware;
