import isUser from './modules/is-user'

import NotFound from './ui/pages/NotFound/NotFound.vue'
import Documents from './ui/pages/Documents/Documents.vue'
import DocumentDetails from './ui/pages/Documents/DocumentsDetails.vue'
import Index from './ui/pages/Index/Index.vue'
import Auth from './ui/layout/Auth.vue'
import Login from './ui/pages/Auth/Login.vue'
import Register from './ui/pages/Auth/Register.vue'
import ForgotPassword from './ui/pages/Auth/ForgotPassword.vue'
import ResetPassword from './ui/pages/Auth/ResetPassword.vue'

import Admin from './ui/layout/Admin.vue'
import AdminDashboard from './ui/pages/Admin/Dashboard/Dashboard.vue'
import AdminDocuments from './ui/pages/Admin/Documents/Documents.vue'
import AdminDocumentsNew from './ui/pages/Admin/Documents/DocumentsNew.vue'
import AdminDocumentsEdit from './ui/pages/Admin/Documents/DocumentsEdit.vue'
import AdminUsers from './ui/pages/Admin/Users/Users.vue'
import AdminUsersEdit from './ui/pages/Admin/Users/UsersEdit.vue'

export default [
  { 
    path: '*', 
    name: 'not-found', 
    component: NotFound 
  },
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/documents',
    name: 'documents',
    component: Documents,
    beforeEnter: (to, from, next) => {
      isUser().then(response => {
        response ? next() : next({name: 'login'})
      })
    }
  },
  {
    path: '/documents/:documentId',
    name: 'documents-details',
    component: DocumentDetails,
    beforeEnter: (to, from, next) => {
      isUser().then(response => {
        response ? next() : next({name: 'login'})
      })
    }
  },
  {
    path: '/login',
    component: Auth,
    redirect: { name: 'login' },
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: Register
      },
      {
        path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPassword
      },
      {
        path: '/reset-password/:token',
        name: 'reset-password',
        component: ResetPassword
      }
    ]
  },
  {
    path: '/admin',
    component: Admin,
    redirect: { name: 'admin-dashboard' },
    beforeEnter: (to, from, next) => {
      isUser().then(response => {
        response ? next() : next({name: 'login'})
      })
    },
    children: [
      {
        path: '/admin',
        name: 'admin-dashboard',
        component: AdminDashboard
      },
      {
        path: '/admin/documents',
        name: 'admin-documents',
        component: AdminDocuments
      },
      {
        path: '/admin/documents/new',
        name: 'admin-documents-new',
        component: AdminDocumentsNew
      },
      {
        path: '/admin/documents/:documentId/edit',
        name: 'admin-documents-edit',
        component: AdminDocumentsEdit
      },
      {
        path: '/admin/users',
        name: 'admin-users',
        component: AdminUsers
      },
      {
        path: '/admin/users/:userId/edit',
        name: 'admin-users-edit',
        component: AdminUsersEdit
      }
    ]
  }
]
