import isUser from '/imports/modules/is-user';

export default [
  {
    path: '/',
    name: 'index',
    component: '/imports/ui/pages/Index/Index.vue'
  },
  {
    path: '/documents',
    name: 'documents',
    component: '/imports/ui/pages/Documents/Documents.vue',
    beforeEnter: (to, from, next) => {
      isUser().then(response => {
        response ? next() : next({name: 'login'})
      })
    }
  },
  {
    path: '/documents/:id',
    name: 'documents-details',
    component: '/imports/ui/pages/Documents/DocumentsDetails.vue',
    beforeEnter: (to, from, next) => {
      isUser().then(response => {
        response ? next() : next({name: 'login'})
      })
    }
  },
  {
    path: '/terms',
    name: 'terms',
    component: '/imports/ui/pages/Terms/Terms.vue'
  },
  {
    path: '/login',
    component: '/imports/ui/layout/Auth.vue',
    redirect: { name: 'login' },
    children: [
      {
        path: '/login',
        name: 'login',
        component: '/imports/ui/pages/Auth/Login.vue'
      },
      {
        path: '/register',
        name: 'register',
        component: '/imports/ui/pages/Auth/Register.vue'
      },
      {
        path: '/forgot-password',
        name: 'forgot-password',
        component: '/imports/ui/pages/Auth/ForgotPassword.vue'
      },
      {
        path: '/new-password',
        name: 'new-password',
        component: '/imports/ui/pages/Auth/NewPassword.vue',
        beforeEnter: (to, from, next) => {
          isUser().then(response => {
            response ? next() : next({name: 'forgot-password'})
          })
        }
      }
    ]
  },
  {
    path: '/admin',
    component: '/imports/ui/layout/Admin.vue',
    redirect: { name: 'admin' },
    beforeEnter: (to, from, next) => {
      isUser().then(response => {
        response ? next() : next({name: 'login'})
      })
    },
    children: [
      {
        path: '/admin',
        name: 'admin',
        component: '/imports/ui/pages/Admin/Dashboard/Dashboard.vue'
      },
      {
        path: '/admin/documents',
        name: 'admin-documents',
        component: '/imports/ui/pages/Admin/Documents/Documents.vue'
      },
      {
        path: '/admin/documents/new',
        name: 'admin-documents-new',
        component: '/imports/ui/pages/Admin/Documents/DocumentsNew.vue'
      },
      {
        path: '/admin/documents/:id/edit',
        name: 'admin-documents-edit',
        component: '/imports/ui/pages/Admin/Documents/DocumentsEdit.vue'
      }
    ]
  }
];
