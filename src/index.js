import { LiveNodeList, LiveElement } from 'live-node-list'

const TYPES = ['info', 'success', 'error', 'warning']
const TRANSITION_DURATION = 500

class MessagingService {
  /**
   * @type {LiveElement}
   */
  container = new LiveElement('#messages')

  /**
   * @type {LiveNodeList}
   */
  messages = new LiveNodeList('.message')

  /**
   * @type {LiveNodeList}
   */
  closeButtons = new LiveNodeList('.message .message__close')

  /**
   *
   */
  constructor () {
    this.registerListeners()

    this.messages.forEach(item => {
      if (item.dataset.timeout) {
        const timeout = parseInt(item.dataset.timeout)
        this.closeAfterTime(item, timeout)
      }
    })
  }

  /**
   *
   */
  registerListeners () {
    this.closeButtons.addEventListener('click', event => {
      const button = event.currentTarget || event.target
      const message = button.closest('.message')

      this.close(message)
    })
  }

  /**
   * @param {string} text
   * @param {number} timeout
   */
  error (text, timeout = 0) {
    this.createMessage('error', text, timeout)
  }

  /**
   * @param {string} text
   * @param {number} timeout
   */
  success (text, timeout = 0) {
    this.createMessage('success', text, timeout)
  }

  /**
   * @param {string} text
   * @param {number} timeout
   */
  info (text, timeout = 0) {
    this.createMessage('info', text, timeout)
  }

  /**
   * @param {string} text
   * @param {number} timeout
   */
  warning (text, timeout = 0) {
    this.createMessage('warning', text, timeout)
  }

  /**
   * @param {boolean} immediate
   */
  closeAll (immediate = false) {
    this.messages.forEach(message => {
      this.close(message, immediate)
    })
  }

  /**
   * @param {Element} message
   * @param {boolean}     immediate
   */
  close (message, immediate = false) {
    message.classList.add('message--closed')

    setTimeout(t => { // DevSkim: reviewed DS172411 on 2019-09-27 by @molovo
      message.remove()
    }, immediate ? 0 : TRANSITION_DURATION)
  }

  /**
   * @param {Element} message
   * @param {number} time
   */
  closeAfterTime (message, time = 0) {
    if (time > 0) {
      setTimeout(t => { // DevSkim: reviewed DS172411 on 2019-09-27 by @molovo
        this.close(message)
      }, time)
    }
  }

  /**
   * @param {string} type
   * @param {string} text
   * @param {number} timeout
   */
  createMessage (type, text, timeout = 0) {
    if (!TYPES.includes(type)) {
      console.error(`${type} is not a valid message type`)
      console.error(`Type must be one of ${TYPES.join(', ')}`)

      return
    }

    const container = document.createElement('div')
    container.innerHTML = `
      <li class="message message--${type}">
        <span class="message__text">
          ${text}
        </span>

        <button class="message__close">
          <span class="screenreader-text">Close message</span>
        </button>
      </li>
    `

    const message = container.firstElementChild

    this.container.item.append(message)

    this.closeAfterTime(message, timeout)
  }
}

const messagingService = new MessagingService()
export default messagingService
