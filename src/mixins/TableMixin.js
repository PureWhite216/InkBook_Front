
import { RefreshActionMixin } from './ActionMixin.js'
const pageEvents = {
  setTotalSize(size) {
    this.pageModel.totalSize = size
  }
}

export const PageModelMixin = {
  mixins: [RefreshActionMixin],
  data() {
    return {
      pageModel: {
        currentPage: 1,
        pageSize: 10,
        totalSize: 0
      }
    }
  },
  methods: {
    pageSizeChanged(pageSize) {
      this.pageModel.pageSize = pageSize
      this.pageModel.currentPage = 1
      this.publishEvent('pageChanged', this.pageModel)
    },
    currentChanged(currentPage) {
      this.pageModel.currentPage = currentPage
      this.publishEvent('pageChanged', this.pageModel)
    },
    withPageInfoData(otherParams = {}) {
      return {
        ...otherParams,
        page: this.pageModel.currentPage,
        pageSize: this.pageModel.pageSize
      }
    }
  },
  created() {
    this.registeEvent(pageEvents)
  }
}

const tableEvents = {
  pageChanged() {
    this.doRefresh()
  }
}

export default {
  data() {
    return {
      dataList: [],
      tableConfig: {
        size: 'small',
        headerCellStyle: {
          backgroundColor: 'rgb(255, 255, 255)',
          'text-align': 'left',
          'font-weight': 'bold',
          'font-size': '18px',
          'font-family': '等线',
          color: '#151515'
        },
        cellStyle: {
          'text-align': 'left',
          'font-size': '18px',
          'font-family': '等线'
        },
        height: '100%'
      },
      tableLoading: false
    }
  },
  mounted() {
    this.$on('tableHeightChanged', _ => {
      this.tableConfig.height = this.$refs.tableBody ? this.$refs.tableBody.$el.offsetHeight - 10 - 2 : '100%'
      this.$refs.table && this.$refs.table.doLayout()
    })
  },
  methods: {
    handleSuccess({ data = [], totalSize = 10 }) {
      this.publishEvent('setTotalSize', totalSize)
      this.dataList = data
    }
  },
  created() {
    this.registeEvent(tableEvents)
  }
}
