import { MessageComponentType } from './enums.js';

export interface TextDisplay {
  type: (typeof MessageComponentType)['TextDisplay'];
  id?: number;
  content: string;
}
