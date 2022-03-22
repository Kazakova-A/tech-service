import { Response } from './types';
import { RESPONSE_STATUSES as rs, SERVER_MESSAGES as sm } from '../config';

export { Response };

export default (
  Request: any,
  Response: any,
  status: number = rs[200],
  message: string = sm.ok,
  data: any = null,
  middleware = false,
) => {
  const responseObject: Response = {
    datetime: Date.now(),
    message,
    request: `${(middleware && Request.originalUrl) || Request.url} [${Request.method}]`,
    status,
  };
  if (data) {
    responseObject.data = data;
  }

  return Response.status(status).send(responseObject);
};
