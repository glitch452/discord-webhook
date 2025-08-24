import { ActionRow } from './ActionRow.js';
import { Button } from './Button.js';
import { Container } from './Container.js';
import { MediaGallery } from './MediaGallery.js';
import { Section } from './Section.js';
import { ChannelSelect, MentionableSelect, RoleSelect, StringSelect, UserSelect } from './Select.js';
import { Separator } from './Separator.js';
import { TextDisplay } from './TextDisplay.js';
import { TextInput } from './TextInput.js';
import { Thumbnail } from './Thumbnail.js';

export type MessageComponent =
  | ActionRow
  | Button
  | StringSelect
  | TextInput
  | UserSelect
  | RoleSelect
  | MentionableSelect
  | ChannelSelect
  | Section
  | TextDisplay
  | Thumbnail
  | MediaGallery
  | File
  | Separator
  | Container;
