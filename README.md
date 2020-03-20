# Kunstmaan Addons Messaging Service

A simple service to allow notification-style messaging on the front end of Kunstmaan CMS websites.

## Installation

```sh
yarn add @superrb/kunstmaan-addons-messaging-service
```

## Usage

Add the HTML container somewhere on the page. This will pull messages from Symfony's session flashbag

```html
<ul id="messages" class="messages" data-turbolinks-permanent>
  {% for type, messages in flash %}
    {% for message in messages %}
      <li class="message message--{{ type }}" {% if type != 'error' %}data-timeout="5000"{% endif %}>
        <span class="message__text">
          {{ message | trans }}
        </span>

        <button class="message__close">
          <span class="screenreader-text">Close message</span>
        </button>
      </li>
    {% endfor %}
  {% endfor %}
</ul>
```

The `data-timeout` attribute sets a time in ms after which the message will disappear.

### Creating messages

```js
import messagingService from '@superrb/kunstmaan-addons-messaging-service'

// Persistent messages
messagingService.info('This a message')
messagingService.error('This is an error message')
messagingService.warning('This is a warning message')
messagingService.success('This is a success message')

// Auto-hide message after 5 seconds
messagingService.info('This message will hide after 5 seconds', 5000)

// Close all visible messages (handy to call on `turbolinks:visit`)
messagingService.closeAll()
```

## Authors

- James Dinsdale ([@molovo](https://github.com/molovo))

## License

- Details on the license [can be found here](LICENSE.md)
