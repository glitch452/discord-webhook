/* eslint-disable @typescript-eslint/naming-convention */

export interface Attachment {
  id: string;
  filename: string;
  title?: string;
  description?: string;
  content_type?: string;
  size: number;
  url: string;
  proxy_url: string;
  height?: number;
  width?: number;
  ephemeral?: boolean;
  duration_secs?: number;
  waveform?: string;
  // attachment flags combined as a bitfield
  flags?: number;
}
