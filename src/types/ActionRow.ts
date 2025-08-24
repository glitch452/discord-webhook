import { BuildTuples } from './BuildTuples.js';
import { Button } from './Button.js';
import { MessageComponentType } from './enums.js';
import { Select } from './Select.js';
import { TextInput } from './TextInput.js';

export interface ActionRow {
  type: (typeof MessageComponentType)['ActionRow'];
  id?: number;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  components: BuildTuples<1, 5, Button> | [TextInput] | [Select];
}
