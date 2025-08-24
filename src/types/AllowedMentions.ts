/* eslint-disable @typescript-eslint/naming-convention */

import { AllowedMentionType } from './enums.js';

export interface AllowedMentions {
  parse?: AllowedMentionType[];
  roles?: string[];
  users?: string[];
  replied_user?: boolean;
}
