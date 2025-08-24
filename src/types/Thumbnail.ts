/* eslint-disable @typescript-eslint/naming-convention */

import { MessageComponentType } from './enums.js';
import { UnfurledMediaItem } from './UnfurledMediaItem.js';

export interface Thumbnail {
  type: (typeof MessageComponentType)['Thumbnail'];
  id?: number;
  media: UnfurledMediaItem;
  description?: string;
  spoiler?: boolean;
}
