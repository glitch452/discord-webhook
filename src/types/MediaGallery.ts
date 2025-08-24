/* eslint-disable @typescript-eslint/naming-convention */

import { BuildTuples } from './BuildTuples.js';
import { MessageComponentType } from './enums.js';
import { UnfurledMediaItem } from './UnfurledMediaItem.js';

export interface MediaGallery {
  type: (typeof MessageComponentType)['MediaGallery'];
  id?: number;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  items: BuildTuples<1, 10, MediaGalleryItem>;
}

export interface MediaGalleryItem {
  media: UnfurledMediaItem;
  description?: string;
  spoiler?: boolean;
}
