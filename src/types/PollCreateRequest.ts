/* eslint-disable @typescript-eslint/naming-convention */

import { Emoji } from './Emoji.js';
import { PollLayoutType } from './enums.js';

export interface PollCreateRequest {
  question: PollMedia;
  answers: PollAnswer[];
  // hours
  duration: string;
  allow_multiselect: boolean;
  layout_type: (typeof PollLayoutType)[keyof typeof PollLayoutType];
}

export interface PollMedia {
  text?: string;
  emoji?: Emoji['id' | 'name'];
}

export interface PollAnswer {
  answer_id?: number;
  poll_media: PollMedia;
}
