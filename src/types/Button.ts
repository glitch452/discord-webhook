/* eslint-disable @typescript-eslint/naming-convention */

import { ButtonStyle, MessageComponentType } from './enums.js';

export type Button =
  | PrimaryButtonMessageComponent
  | SecondaryButtonMessageComponent
  | SuccessButtonMessageComponent
  | DangerButtonMessageComponent
  | LinkButtonMessageComponent
  | PremiumButtonMessageComponent;

export interface BaseButtonMessageComponent {
  type: (typeof MessageComponentType)['Button'];
  id?: number;
  style: (typeof ButtonStyle)[keyof typeof ButtonStyle];
  disabled?: boolean;
}

export interface BaseNonPremiumButtonMessageComponent extends BaseButtonMessageComponent {
  type: (typeof MessageComponentType)['Button'];
  label?: string;
  emoji?: {
    name: string;
    id?: string;
    animated?: boolean;
  };
}

export interface PrimaryButtonMessageComponent extends BaseNonPremiumButtonMessageComponent {
  style: (typeof ButtonStyle)['Primary'];
  custom_id: string;
}

export interface SecondaryButtonMessageComponent extends BaseNonPremiumButtonMessageComponent {
  style: (typeof ButtonStyle)['Secondary'];
  custom_id: string;
}

export interface SuccessButtonMessageComponent extends BaseNonPremiumButtonMessageComponent {
  style: (typeof ButtonStyle)['Success'];
  custom_id: string;
}

export interface DangerButtonMessageComponent extends BaseNonPremiumButtonMessageComponent {
  style: (typeof ButtonStyle)['Danger'];
  custom_id: string;
}

export interface LinkButtonMessageComponent extends BaseNonPremiumButtonMessageComponent {
  style: (typeof ButtonStyle)['Link'];
  url: string;
}

export interface PremiumButtonMessageComponent extends BaseButtonMessageComponent {
  style: (typeof ButtonStyle)['Premium'];
  sku_id: string;
}
