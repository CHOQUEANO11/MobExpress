import io from 'socket.io-client';

const socket = () => {
  return io('http://192.168.0.10:8000');
};

export default socket;
