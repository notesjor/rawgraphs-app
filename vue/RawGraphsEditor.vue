<template>
  <rawgraphs-editor ref="editor"></rawgraphs-editor>
</template>

<script>
export default {
  name: 'RawGraphsEditor',
  props: {
    data: {
      type: [String, Array, Object],
      required: true,
    },
    separator: {
      type: String,
      default: undefined,
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
    hideFooter: {
      type: Boolean,
      default: false,
    },
    hideCookieConsent: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.updateElement()
  },
  watch: {
    data() {
      this.updateElement()
    },
    separator() {
      this.updateElement()
    },
    hideHeader() {
      this.updateElement()
    },
    hideFooter() {
      this.updateElement()
    },
    hideCookieConsent() {
      this.updateElement()
    },
  },
  methods: {
    updateElement() {
      const element = this.$refs.editor
      if (!element) {
        return
      }
      element.data = this.data
      if (this.separator) {
        element.setAttribute('separator', this.separator)
      } else {
        element.removeAttribute('separator')
      }
      this.setBooleanAttribute('hide-header', this.hideHeader)
      this.setBooleanAttribute('hide-footer', this.hideFooter)
      this.setBooleanAttribute('hide-cookie-consent', this.hideCookieConsent)
    },
    setBooleanAttribute(name, enabled) {
      const element = this.$refs.editor
      if (enabled) {
        element.setAttribute(name, '')
      } else {
        element.removeAttribute(name)
      }
    },
  },
};
</script>
