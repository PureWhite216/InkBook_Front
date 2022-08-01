<template>
  <div class="main-container">
    <el-card :body-style="{padding: '0'}">
      <template #header>
        <el-link :underline="false">文章标题</el-link>
      </template>
      <el-input
        v-model="title"
        class="title-input"
        placeholder="请输入文章标题"
      />
    </el-card>
    <el-card
      :body-style="{padding: '0'}"
      class="margin-top-xs"
    >
      <template #header>
        <div class="flex">
          <el-link :underline="false">文章内容</el-link>
          <div class="flex-sub"></div>
        </div>
      </template>
      <!-- <el-dialog title="分享二维码" :visible.sync="dialogVisible_share">
        <div>
          <image
            :src="imgUrl"
          />
        </div>
      </el-dialog> -->
      <RichTextEditor
        ref="richTextEditor"
        v-model="editor"
        :height="600"
      />
    </el-card>
    <div
      v-if="htmlContent"
      class="margin-top padding priview-content"
      v-html="htmlContent"
    >
    </div>
    <div
      v-if="jsonContent"
      class="margin-top padding priview-content"
    >
      {{ jsonContent }}
    </div>
  </div>
</template>

<script>
import RichTextEditor from '@/components/common/RichTextEditor'
import qs from 'qs'
import store from '@/layouts/store'
// import QRCode from 'qrcode'
export default {
  name: 'RichTextShare',
  components: { RichTextEditor },
  data() {
    return {
      imgUrl: '',
      dialogVisible_share: false,
      form: {
        word_id: this.$route.query.word_id,
        word_name: this.$route.query.word_name,
        word_id_token: this.$route.query.word_id_token
      },
      isShow: true,
      invite_visible: false,
      comment_visible: false,
      title: this.$route.query.word_name,
      htmlContent: '',
      jsonContent: '',
      comment: '',
      ID: '',
      flag: 1,
      cooperatorList: [],
      commentList: [],
      loading: false,
      commentData: [{
        name: 'ABC',
        time: '2022-05-11',
        comment: 'Test'
      }]
      // opt: {
      //   errorCorrectionLevel: 'H',
      //   type: 'image/jpeg',
      //   quality: 0.3,
      //   margin: 1
      // }
    }
  },
  created() {
    localStorage.setItem('enable', 'false')
    localStorage.setItem('flag', 'user')
    this.getContent()
    location.wait(1000)
    if (localStorage.getItem('refresh') === '1') {
      location.reload()
      localStorage.setItem('refresh', '2')
    }
  },
  mounted() {
    store.changeDevice('mobile')
    store.toggleCollapse(true)
  },
  beforeDestroy() {
    this.exitEdit()
  },
  destroyed() {
    store.changeDevice('pc')
    store.toggleCollapse(false)
  },
  methods: {
    getContent() {
      this.$axios.post('/worddocx/look', qs.stringify(this.form))
      .then(res => {
        if (res.data.result === 2) {
          localStorage.setItem('user_word_content', res.data.word_content)
        }
      })
    },
    getHtmlContent() {
      this.htmlContent = this.$refs.richTextEditor.getHtmlContent()
    },
    getJsonContent() {
      console.log(localStorage.getItem('flag'))
      console.log(JSON.parse(localStorage.getItem('user_word_content')))
      this.jsonContent = this.$refs.richTextEditor.getJsonContent()
    }
  }
}
</script>

<style lang="scss" scoped>
.title-input {
  ::v-deep .el-input__inner {
    border: none !important;
  }
}
::v-deep .ql-container.ql-snow {
  border: none;
}
::v-deep .ql-toolbar.ql-snow {
  border: none;
  border-bottom: 1px solid #ccc;
}
::v-deep .ql-editor.ql-blank::before {
  color: #afb4bd;
  font-size: 14px;
  font-style: normal;
}
.theme-dark .priview-content {
  background: #5a5a5a;
  color: #fff;
}
.priview-content {
  background: #fff;
  color: #333;
}
</style>
