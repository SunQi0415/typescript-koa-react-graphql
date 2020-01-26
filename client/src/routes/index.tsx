// import Home from '../pages/Home';
// import Login from '../pages/Login';

// import WorkTable from '../pages/WorkTable';
// import AuthManage from '../pages/AuthManage';
// import LoggerManage from '../pages/LoggerManage';
// // import ProjectManage from '../pages/ProjectManage';
// import WorkOrder from '../pages/ProjectManage/WorkOrder';
// import TaskGantt from '../pages/ProjectManage/TaskGantt';

// export const siderMenus = [ // 左侧菜单相关路由
//   { path: "/work_table", icon: 'rocket', name: 'WorkTable', component: WorkTable },
//   { path: "/manage/auth", icon: 'team', name: 'AuthManage', component: AuthManage },
//   { path: "/manage/logger", icon: 'file-sync', name: 'LoggerManage', component: LoggerManage },
//   { path: "/manage/project", icon: 'project', name: 'ProjectManage', routes: [
//       { path: "/manage/project/work_order", icon: 'ordered-list', name: 'WorkOrder', component: WorkOrder },
//       { path: "/manage/project/task_gantt", icon: 'schedule', name: 'TaskGantt', component: TaskGantt }
//     ]
//   }
// ]

// export const main = [
//   { path: '/login', exact: true, name: 'Login', component: Login },
//   { path: '/', exact: true,  name: 'Home', Redirect: '/home'},
//   { path: '/home', name: 'Home', component: Home,  // 这里exact!=true， 因为需要模糊匹配， 然后下一级才能匹配到这个路由，才能继续往下寻找组件
//       routes: siderMenus
//   }
// ]

