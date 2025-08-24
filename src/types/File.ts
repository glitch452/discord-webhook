/* eslint-disable @typescript-eslint/naming-convention */

import { MessageComponentType } from './enums.js';
import { UnfurledMediaItem } from './UnfurledMediaItem.js';

export interface File {
  type: (typeof MessageComponentType)['File'];
  id?: number;
  files: UnfurledMediaItem;
  spoiler?: boolean;
  name: string;
  size: number;
}
