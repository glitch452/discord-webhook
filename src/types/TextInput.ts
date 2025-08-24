/* eslint-disable @typescript-eslint/naming-convention */

import { MessageComponentType, TextInputStyle } from './enums.js';

export interface TextInput {
  type: (typeof MessageComponentType)['TextInput'];
  id?: number;
  custom_id: string;
  style: (typeof TextInputStyle)[keyof typeof TextInputStyle];
  label: string;
  min_length?: number;
  max_length?: number;
  required?: boolean;
  value?: string;
  placeholder?: string;
}
