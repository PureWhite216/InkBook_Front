<template>
  <div
    ref="richTextEditor"
    :style="{'height': height + 'px'}"
  >
  </div>
</template>

<script>

import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module'

// Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)
export default {
  name: 'RichTextEditor',
  props: {
    height: {
      type: [Number, String],
      default: 'auto'
    }
  },
  data() {
    return {
      quill: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const options = {
        modules: {
          // imageDrop: true, // 图片拖拽
          imageResize: {
            displayStyles: { // 放大缩小
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          },
          // clipboard: {
          //   matchers: [[Node.ELEMENT_NODE, this.handleCustomMatcher]]// 粘贴版，处理粘贴时候带图片
          // },
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 切换按钮
            ['blockquote', 'code-block'],

            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }], // 上标/下标
            [{ indent: '-1' }, { indent: '+1' }], // 减少缩进/缩进
            [{ direction: 'rtl' }], // 文本下划线

            [{ size: ['small', false, 'large', 'huge'] }], // 用户自定义下拉
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // 主题默认下拉，使用主题提供的值
            [{ align: [] }],

            ['link', 'image'],

            ['clean'] // 清除格式
          ]
        },
        placeholder: '请输入文章内容…',
        theme: 'snow'
      }
      this.quill = new Quill(this.$refs.richTextEditor, options)
      // JSON.parse(localStorage.getItem('word_content'))
      if (localStorage.getItem('flag') === 'in') { this.quill.setContents(JSON.parse(localStorage.getItem('in_word_content'))) } else { this.quill.setContents(JSON.parse(localStorage.getItem('doc_content'))) }
      if (localStorage.getItem('enable') === 'false') {
        this.quill.enable(false)
      }
    },
    getHtmlContent() {
      return this.$refs.richTextEditor.firstChild.innerHTML
    },
    getJsonContent() {
      return JSON.stringify(this.quill.getContents())
    }
  }
}

</script>

