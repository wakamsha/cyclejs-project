import { User, configureScope, init, captureException as sentryCaptureException, withScope } from '@sentry/browser';
import { omitRecursive } from '../utils/Object';

export function initLogger({
  environment,
  dsn,
  sanitizeKeys,
}: {
  environment: string;
  dsn: string;
  sanitizeKeys: RegExp[];
}) {
  init({
    dsn,
    environment,
    beforeSend(event) {
      return omitRecursive(event, sanitizeKeys);
    },
  });
}

export function setUser(user: User | null) {
  configureScope(scope => {
    scope.setUser(user);
  });
}

export function captureException({
  error,
  tags,
  extras,
}: {
  error: Error;
  tags: {
    type: string;
  };
  extras?: Record<string, any>;
}): Promise<string> {
  return new Promise(resolve => {
    withScope(scope => {
      scope.setTags(tags);
      if (extras) scope.setExtras(extras);

      const eventID = sentryCaptureException(error);
      resolve(eventID);
    });
  });
}
