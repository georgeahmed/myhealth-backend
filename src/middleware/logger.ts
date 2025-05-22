import pino from 'pino';
import pinoHttp from 'pino-http';
import { v4 as uuid } from 'uuid';

export default pinoHttp({
  genReqId: () => uuid(),                 // trace-id for every request
  serializers: {
    err: pino.stdSerializers.err,         // <-- use core pino, not pinoHttp
  },
});
