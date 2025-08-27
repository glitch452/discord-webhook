# Discord Webhook

[![NPM License](https://img.shields.io/npm/l/@glitch452/discord-webhook)](https://choosealicense.com/licenses/mit/)
[![NPM Version](https://img.shields.io/npm/v/@glitch452/discord-webhook)](https://www.npmjs.com/package/@glitch452/discord-webhook)
[![NPM Downloads](https://img.shields.io/npm/dw/@glitch452/discord-webhook?logo=npm)](https://www.npmjs.com/package/@glitch452/discord-webhook)

## Table of Contents

- [Discord Webhook](#discord-webhook)
  - [Table of Contents](#table-of-contents)
  - [What's New](#whats-new)
  - [Install](#install)
  - [Examples](#examples)
    - [Basic usage](#basic-usage)
    - [Using the MessageBuilder to set other message parameters](#using-the-messagebuilder-to-set-other-message-parameters)
    - [Adding a custom Embed to the message](#adding-a-custom-embed-to-the-message)
    - [Sending files](#sending-files)
    - [Preset messages](#preset-messages)
    - [Custom settings](#custom-settings)
  - [License](#license)

## What's New

Check out the [GitHub Releases](https://github.com/glitch452/discord-webhook/releases) page for the latest release
notes.

## Install

```sh
npm install @glitch452/discord-webhook
```

## Examples

### Basic usage

```ts
import { MessageBuilder, Webhook } from '@glitch452/discord-webhook';

const hook = new Webhook('<YOUR_WEBHOOK_URL>');

hook.send('Hello there!');
```

### Using the MessageBuilder to set other message parameters

```ts
import { MessageBuilder, Webhook } from '@glitch452/discord-webhook';

const message = new MessageBuilder('Hello there!')
  .setUsername('Bot Name')
  .setAvatarUrl('https://cdn.discordapp.com/embed/avatars/0.png');

const hook = new Webhook('<YOUR_WEBHOOK_URL>');

hook.send(message);
```

### Adding a custom Embed to the message

```ts
import { EmbedBuilder, MessageBuilder, Webhook } from '@glitch452/discord-webhook';

const hook = new Webhook('<YOUR_WEBHOOK_URL>');

const embed = new EmbedBuilder()
  .setTitle('My title here')
  .setAuthor('Author here', 'https://cdn.discordapp.com/embed/avatars/0.png', 'https://www.google.com')
  .setUrl('https://www.google.com')
  .addField('First field', 'this is inline', true)
  .addField('Second field', 'this is not inline')
  .setColor('#00b0f4')
  .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
  .setDescription('Oh look a description :)')
  .setImage('https://cdn.discordapp.com/embed/avatars/0.png')
  .setFooter('Hey its a footer', 'https://cdn.discordapp.com/embed/avatars/0.png')
  .setTimestamp();

const message = new MessageBuilder().addEmbed(embed);

hook.send(message);
```

Keep in mind that the custom embed method `setColor` takes in a decimal color or a hex color (pure black and white hex
colors will be inaccurate). You can convert hex colors to decimal using this website here:
<https://convertingcolors.com>

### Sending files

```js
import { MessageBuilder, Webhook } from '@glitch452/discord-webhook';

const hook = new Webhook('<YOUR_WEBHOOK_URL>');

const message = new MessageBuilder().addFile('../yourFileName.png');

hook.send(message);
```

### Preset messages

```js
import { Webhook } from '@glitch452/discord-webhook';

const hook = new Webhook('<YOUR_WEBHOOK_URL>');

// Sends an information message
hook.info('**Information hook**', 'Information field title here', 'Information field value here');

// Sends a success message
hook.success('**Success hook**', 'Success field title here', 'Success field value here');

// Sends an warning message
hook.warning('**Warning hook**', 'Warning field title here', 'Warning field value here');

// Sends an error message
hook.error('**Error hook**', 'Error field title here', 'Error field value here');
```

### Custom settings

```js
import { Webhook } from '@glitch452/discord-webhook';

const hook = new Webhook({
  url: '<YOUR_WEBHOOK_URL>',
  // If throwErrors is set to false, no errors will be thrown if there is an error sending
  throwErrors: false,
  // retryOnLimit gives you the option to not attempt to send the message again if rate limited
  retryOnLimit: false,
});
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE) as defined by the
[Open Source Initiative](https://opensource.org/license/mit).
