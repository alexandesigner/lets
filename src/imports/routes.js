import isUser from './modules/is-user'

import Index from './ui/pages/Index/Index.vue'
import StaticPage from './ui/pages/StaticPage/StaticPage.vue'
import Documents from './ui/pages/Documents/Documents.vue'
import DocumentsDetails from './ui/pages/Documents/DocumentsDetails.vue'
import Terms from './ui/pages/Terms/Terms.vue'

import Auth from './ui/layout/Auth.vue'
import AuthLogin from './ui/pages/Auth/Login.vue'
import AuthRegister from './ui/pages/Auth/Register.vue'
import AuthForgotPassword from './ui/pages/Auth/ForgotPassword.vue'
import AuthResetPassword from './ui/pages/Auth/ResetPassword.vue'

import Admin from './ui/layout/Admin.vue'
import AdminDashboard from './ui/pages/Admin/Dashboard/Dashboard.vue'
import AdminDocuments from './ui/pages/Admin/Documents/Documents.vue'
import AdminDocumentsNew from './ui/pages/Admin/Documents/DocumentsNew.vue'
import AdminDocumentsEdit from './ui/pages/Admin/Documents/DocumentsEdit.vue'
import AdminUsers from './ui/pages/Admin/Users/Users.vue'
import AdminUsersEdit from './ui/pages/Admin/Users/UsersEdit.vue'

import NotFound from './ui/pages/NotFound/NotFound.vue'

export default [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/static-page',
    name: 'example-static',
    component: StaticPage
  },
  {
    path: '/documents',
    name: 'documents',
    component: Documents,
    beforeEnter: (to, from, next) => {
      isUser().then(response => {
        response
          ? next()
          : next({
              name: 'login'
            })
      })
    }
  },
  {
    path: '/documents/:documentId',
    name: 'documents-details',
    component: DocumentsDetails,
    beforeEnter: (to, from, next) => {
      isUser().then(response => {
        response
          ? next()
          : next({
              name: 'login'
            })
      })
    }
  },
  {
    path: '/terms',
    name: 'terms',
    component: Terms
  },
  {
    path: '/login',
    component: Auth,
    redirect: {
      name: 'login'
    },
    children: [
      {
        path: '/login',
        name: 'login',
        component: AuthLogin
      },
      {
        path: '/register',
        name: 'register',
        component: AuthRegister
      },
      {
        path: '/forgot-password',
        name: 'forgot-password',
        component: AuthForgotPassword
      },
      {
        path: '/reset-password/:token',
        name: 'reset-password',
        component: AuthResetPassword
      }
    ]
  },
  {
    path: '/admin',
    component: Admin,
    redirect: {
      name: 'admin-dashboard'
    },
    beforeEnter: (to, from, next) => {
      isUser().then(response => {
        response
          ? next()
          : next({
              name: 'login'
            })
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
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]
