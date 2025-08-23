import fs, { PathLike } from 'fs';
import { IncomingMessage } from 'http';
import FormData from 'form-data';
import { FilePayload } from './types/webhook-payload.js';

export function sendFile(hookUrl: string, file: PathLike, payload: FilePayload) {
  const { username, avatar_url } = payload;
  const form = new FormData();

  if (username) {
    form.append('username', username);
  }

  if (avatar_url) {
    form.append('avatar_url', avatar_url);
  }

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  form.append('file', fs.createReadStream(file));

  return new Promise<IncomingMessage>((resolve, reject) => {
    // eslint-disable-next-line promise/prefer-await-to-callbacks
    form.submit(hookUrl, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}
