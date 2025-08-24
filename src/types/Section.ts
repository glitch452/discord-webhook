/* eslint-disable @typescript-eslint/no-magic-numbers */

import { BuildTuples } from './BuildTuples.js';
import { Button } from './Button.js';
import { MessageComponentType } from './enums.js';
import { TextDisplay } from './TextDisplay.js';
import { Thumbnail } from './Thumbnail.js';

export interface Section {
  type: (typeof MessageComponentType)['Section'];
  id?: number;
  components: BuildTuples<1, 3, TextDisplay>;
  accessory: Thumbnail | Button;
}
