import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

export function mountRawGraphsEditor(element, props = {}) {
  if (!element) {
    throw new Error('A DOM element is required')
  }

  const root = createRoot(element)
  root.render(
    <React.StrictMode>
      <App {...props} />
    </React.StrictMode>
  )

  return {
    unmount: () => root.unmount(),
  }
}

export class RawGraphsEditor extends HTMLElement {
  static get observedAttributes() {
    return [
      'data',
      'separator',
      'hide-header',
      'hide-footer',
      'hide-cookie-consent',
    ]
  }

  constructor() {
    super()
    this._data = undefined
    this._root = null
  }

  connectedCallback() {
    if (!this._root) {
      this._root = createRoot(this)
    }
    this.render()
  }

  disconnectedCallback() {
    if (this._root) {
      this._root.unmount()
      this._root = null
    }
  }

  get data() {
    return this._data
  }

  set data(value) {
    this._data = value
    if (this._root) {
      this.render()
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }
    if (name === 'data') {
      if (newValue === null) {
        this._data = undefined
      } else {
        try {
          this._data = JSON.parse(newValue)
        } catch {
          this._data = newValue
        }
      }
    }
    if (this._root) {
      this.render()
    }
  }

  render() {
    this._root.render(
      <React.StrictMode>
        <App
          data={this._data}
          separator={this.getAttribute('separator') || undefined}
          hideHeader={this.hasAttribute('hide-header')}
          hideFooter={this.hasAttribute('hide-footer')}
          hideCookieConsent={this.hasAttribute('hide-cookie-consent')}
        />
      </React.StrictMode>
    )
  }
}

if (
  typeof window !== 'undefined' &&
  typeof window.customElements !== 'undefined' &&
  !window.customElements.get('rawgraphs-editor')
) {
  window.customElements.define('rawgraphs-editor', RawGraphsEditor)
}
