/* eslint-disable @typescript-eslint/naming-convention */

import { ActionRow } from './ActionRow.js';
import { MessageComponentType } from './enums.js';
import { MediaGallery } from './MediaGallery.js';
import { Section } from './Section.js';
import { Separator } from './Separator.js';
import { TextDisplay } from './TextDisplay.js';

export interface Container {
  type: (typeof MessageComponentType)['Container'];
  id?: number;
  components: (ActionRow | TextDisplay | Section | MediaGallery | Separator | File)[];
  ambient_color?: number;
  spoiler?: boolean;
}
