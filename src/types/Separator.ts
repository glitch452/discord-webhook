/* eslint-disable @typescript-eslint/naming-convention */

import { MessageComponentType, SeparatorSpacing } from './enums.js';

export interface Separator {
  type: (typeof MessageComponentType)['Separator'];
  id?: number;
  divider?: boolean;
  spacing?: (typeof SeparatorSpacing)[keyof typeof SeparatorSpacing];
}
