/* eslint-disable @typescript-eslint/naming-convention */

export const MessageComponentType = {
  ActionRow: 1,
  Button: 2,
  StringSelect: 3,
  TextInput: 4,
  UserSelect: 5,
  RoleSelect: 6,
  MentionableSelect: 7,
  ChannelSelect: 8,
  Section: 9,
  TextDisplay: 10,
  Thumbnail: 11,
  MediaGallery: 12,
  File: 13,
  Separator: 14,
  Container: 17,
} as const;

export const ButtonStyle = {
  Primary: 1,
  Secondary: 2,
  Success: 3,
  Danger: 4,
  Link: 5,
  Premium: 6,
} as const;

export const TextInputStyle = {
  Short: 1,
  Paragraph: 2,
} as const;

export const ChannelType = {
  GUILD_TEXT: 0,
  DM: 1,
  GUILD_VOICE: 2,
  GROUP_DM: 3,
  GUILD_CATEGORY: 4,
  GUILD_ANNOUNCEMENT: 5,
  ANNOUNCEMENT_THREAD: 10,
  PUBLIC_THREAD: 11,
  PRIVATE_THREAD: 12,
  GUILD_STAGE_VOICE: 13,
  GUILD_DIRECTORY: 14,
  GUILD_FORUM: 15,
  GUILD_MEDIA: 16,
} as const;

export const SeparatorSpacing = {
  Small: 1,
  Large: 2,
} as const;

export const AttachmentFlags = {
  IS_REMIX: 4,
} as const;

export const MessageFlags = {
  CROSSPOSTED: 1,
  IS_CROSSPOST: 2,
  SUPPRESS_EMBEDS: 4,
  SOURCE_MESSAGE_DELETED: 8,
  URGENT: 16,
  HAS_THREAD: 32,
  EPHEMERAL: 64,
  LOADING: 128,
  FAILED_TO_MENTION_SOME_ROLES_IN_THREAD: 256,
  SUPPRESS_NOTIFICATIONS: 4096,
  IS_VOICE_MESSAGE: 8192,
  HAS_SNAPSHOT: 16_384,
  IS_COMPONENTS_V2: 32_768,
} as const;

export const AllowedMentionType = {
  Roles: 'roles',
  Users: 'users',
  Everyone: 'everyone',
} as const;

export type AllowedMentionType = (typeof AllowedMentionType)[keyof typeof AllowedMentionType];

export const PollLayoutType = {
  DEFAULT: 1,
} as const;
