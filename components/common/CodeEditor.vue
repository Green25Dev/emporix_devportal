<template>
  <div class="code-container p-4">
    <prism-editor v-model="code" class="my-editor" :highlight="highlighter" line-numbers read-only />
  </div>
</template>

<script>
// import Prism Editor
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css' // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css'

export default {
  components: {
    PrismEditor
  },
  props: {
    codeInput: {
      type: String,
      default: 'console.log("Hello World")'
    }
  },
  computed: {
    code () {
      return this.codeInput
    }
  },
  watch: {
    codeInput (code) {
      this.code = code
    }
  },
  methods: {
    highlighter (code) {
      return highlight(code, languages.js) // returns html
    }
  }
}
</script>

<style lang="scss">
.my-editor {
  background: $brand-navy-800;
  color: #4677B3FF;
  font-family: Lekton, Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

.prism-editor__textarea:focus {
  outline: none;
}

.prism-editor-wrapper .prism-editor__line-number {
  color: #4677B3FF
}
</style>
