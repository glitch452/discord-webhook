/* eslint-disable @typescript-eslint/naming-convention */

import { ChannelType, MessageComponentType } from './enums.js';

export type Select = StringSelect | UserSelect | RoleSelect | MentionableSelect | ChannelSelect;

export interface SelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: {
    name: string;
    id?: string;
    animated?: boolean;
  };
  default?: boolean;
}

export interface DefaultSelectValues {
  id: string;
  type: 'user' | 'role' | 'channel';
}

export interface BaseSelect {
  id?: number;
  custom_id: string;
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
}

export interface StringSelect extends BaseSelect {
  type: (typeof MessageComponentType)['StringSelect'];
  options: SelectOption[];
}

export interface UserSelect extends BaseSelect {
  type: (typeof MessageComponentType)['UserSelect'];
  default_values?: DefaultSelectValues[];
}

export interface RoleSelect extends BaseSelect {
  type: (typeof MessageComponentType)['RoleSelect'];
  default_values?: DefaultSelectValues[];
}

export interface MentionableSelect extends BaseSelect {
  type: (typeof MessageComponentType)['MentionableSelect'];
  default_values?: DefaultSelectValues[];
}

export interface ChannelSelect extends BaseSelect {
  type: (typeof MessageComponentType)['ChannelSelect'];
  channel_types?: (typeof ChannelType)[keyof typeof ChannelType][];
  default_values?: DefaultSelectValues[];
}
