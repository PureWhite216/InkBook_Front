import TableMixin, { PageModelMixin } from '@/mixins/TableMixin';
import {
GetDataMixin,
AddItemMixin,
DeleteItemsMixin,
UpdateItemMixin,
RefreshActionMixin
} from '@/mixins/ActionMixin';
import qs from 'qs';
import { getters } from '@/store/modules/user.js';
import { state } from '@/store/modules/user.js';
import store from '@/layouts/store';

export default (await import('vue')).defineComponent({
name: 'TableGroup',
// eslint-disable-next-line vue/no-unused-components
components: { SingleUpload, BaseForm },
directives: { draggable },
mixins: [
TableMixin,
PageModelMixin,
GetDataMixin,
AddItemMixin,
DeleteItemsMixin,
UpdateItemMixin,
RefreshActionMixin
],
data() {
return {
visible_applyTeam: false,
form: {
token: getters.getToken(state),
username: getters.getUserName(state),
user_id: getters.getUserId(state)
},
form1: {
token: getters.getToken(state),
username: getters.getUserName(state),
user_id: getters.getUserId(state),
team_id: null,
member_id: null
},
form_applyTeam: {
token: getters.getToken(state),
username: getters.getUserName(state),
user_id: getters.getUserId(state),
team_id: null
},
groupList: [],
tableLoading: false,
dialogFormVisible: false,
dialogVisible: false,
form2: {
token: getters.getToken(state),
username: getters.getUserName(state),
user_id: getters.getUserId(state),
team_name: ''
},
form_disbandTeam: {
token: getters.getToken(state),
username: getters.getUserName(state),
user_id: getters.getUserId(state),
team_id: 0
},
form_quitTeam: {
token: getters.getToken(state),
username: getters.getUserName(state),
user_id: getters.getUserId(state),
team_id: 0
},
disbandTeamList: [],
formLabelWidth: '120px'
};
},
created() {
this.Refresh();
},
methods: {
quitTeam(item) {
this.form_quitTeam.team_id = item.id;
this.$axios.post('/team/quit_team', qs.stringify(this.form_quitTeam))
.then((res) => {
if (res.data.result === 5) {
this.$message.success(res.data.message);
} else {
this.$message.error(res.data.message);
}
this.Refresh();
});
},
applyTeam() {
this.$axios.post('/team/apply_team', qs.stringify(this.form_applyTeam))
.then((res) => {
if (res.data.result === 4) {
this.$message.success(res.data.message);
} else {
this.$message.error(res.data.message);
}
});
},
Leader_change(item) {
this.form1.team_id = item.id;
console.log(item.id);
this.$axios.post('/team/move_team_leader_perm', qs.stringify(this.form1))
.then((res) => {
if (res.data.result === 6) {
this.$message.success(res.data.message);
} else {
this.$message.error(res.data.message);
}
this.Refresh();
});
},
toGroupFile(item) {
localStorage.setItem('team_id', item.id.toString());
store.toGroupFile && store.toGroupFile();
},
addTeam() {
this.$axios.post('/team/create_team', qs.stringify(this.form2))
.then((res) => {
if (res.data.result === 2) {
this.$message.success(res.data.message);
} else {
this.$message.error(res.data.message);
}
this.Refresh();
this.dialogFormVisible = false;
this.form2.team_name = null;
});
},
handleSelectionChange(items) {
this.disbandTeamList = items;
},
deleteItem(item) {
if (item.power === '创建者') {
this.$confirm('此操作将永久解散该团队, 是否继续?', '提示', {
confirmButtonText: '确定',
cancelButtonText: '取消',
type: 'warning'
}).then(() => {
this.disbandTeam(item);
// console.log(item.id)
// this.$message({
//   type: 'success',
//   message: '解散成功!'
// })
}).catch(() => {
this.$message({
type: 'info',
message: item.power === '创建者' ? '已取消解散' : '已取消解散'
});
});
} else {
this.$confirm('此操作将退出该团队, 是否继续?', '提示', {
confirmButtonText: '确定',
cancelButtonText: '取消',
type: 'warning'
}).then(() => {
this.quitTeam(item);
// console.log(item.id)
// this.$message({
//   type: 'success',
//   message: '解散成功!'
// })
}).catch(() => {
this.$message({
type: 'info',
message: '已取消退出'
});
});
}
},
deleteMultiItem() {
this.$confirm('此操作将永久解散/退出您选中的所有团队, 是否继续?', '提示', {
confirmButtonText: '确定',
cancelButtonText: '取消',
type: 'warning'
}).then(() => {
for (let i = 0; i < this.disbandTeamList.length; i++) {
if (this.disbandTeamList[i].power === '创建者') {
this.disbandTeam(this.disbandTeamList[i]);
} else {
this.quitTeam(this.disbandTeamList[i]);
}
}
this.Refresh();
}).catch(() => {
this.$message({
type: 'info',
message: '已取消解散/退出'
});
});
},
disbandTeam(item) {
this.form_disbandTeam.team_id = item.id;
this.$axios.post('/team/disband_team', qs.stringify(this.form_disbandTeam))
.then((res) => {
// console.log(5)
if (res.data.result === 4) {
this.$message.success(res.data.message);
} else {
this.$message.error(res.data.message);
}
this.Refresh();
});
},
Refresh() {
this.tableLoading = true;
this.groupList = [];
this.$axios.post('/team/get_team_list', qs.stringify(this.form))
.then((res) => {
if (res.data.result === 3) {
for (let i = 0; i < res.data.team_list.length; i++) {
const teams = {
name: '',
time: '',
member_num: 0,
word_num: 0,
power: '',
id: 0,
dialogVisible: false
};
teams.name = res.data.team_list[i].team_name;
teams.time = res.data.team_list[i].create_time;
teams.member_num = res.data.team_list[i].member_cnt;
teams.word_num = res.data.team_list[i].word_cnt;
teams.id = res.data.team_list[i].team_id;
if (res.data.team_list[i].power === 1) {
teams.power = '创建者';
} else if (res.data.team_list[i].power === 2) {
teams.power = '管理员';
} else if (res.data.team_list[i].power === 3) {
teams.power = '游客';
}
let flag = 0;
for (let i = 0; i < this.groupList.length; i++) {
if (this.groupList[i].id === teams.id) {
flag = 1;
break;
}
}
if (!flag) { this.groupList.push(teams); }
}
} else {
this.$message.error(res.data.message);
}
this.tableLoading = false;
});
},
onSingleSuccess({ res }) {
if (res.status !== 200) {
this.$errorMsg(res.msg);
} else {
this.userModel = res.obj;
}
},
beforeUpload(file) {
const size = file.size;
if (size / 1024 > 500) {
this.$errorMsg('上传文件最大不能超过500K');
return false;
}
}
}
});
