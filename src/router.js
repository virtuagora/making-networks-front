import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
// import http from './http';
import Home from './views/Home.vue';
import Map from './views/Map.vue';
import Auth from './views/auth/Auth.vue';
import Login from './views/auth/Login.vue';
import SignUp from './views/auth/SignUp.vue';
import SignUpComplete from './views/auth/SignUpComplete.vue';
import RecoverPassword from './views/auth/RecoverPassword.vue';
import RecoverPasswordRequest from './views/auth/RecoverPasswordRequest.vue';
import NewInitiative from './views/initiatives/NewInitiative.vue';


Vue.use(Router);

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        withNavbar: true,
        withFooter: true,
      },
    },
    {
      path: '/map',
      name: 'map',
      component: Map,
      meta: {
        withNavbar: true,
        withFooter: false,
      },
    },
    {
      path: '/newInitiative',
      name: 'newInitiative',
      component: NewInitiative,
      meta: {
        withNavbar: true,
        withFooter: false,
        requiresAuth: true,
      },
    },
    {
      path: '/auth',
      component: Auth,
      redirect: {
        name: 'home',
      },
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login,
          meta: {
            withNavbar: false,
            withFooter: false,
            requiresAnon: true,
          },
        },
        {
          path: 'signup',
          name: 'signup',
          component: SignUp,
          meta: {
            withNavbar: false,
            withFooter: false,
            requiresAnon: true,
          },
        },
        {
          path: 'complete-signup/:token',
          name: 'completeSignUp',
          component: SignUpComplete,
          props: true,
          meta: {
            withNavbar: false,
            withFooter: false,
            requiresAnon: true,
          },
        },
        {
          path: 'recover/request',
          name: 'recoverRequest',
          component: RecoverPasswordRequest,
          meta: {
            withNavbar: false,
            withFooter: false,
            requiresAnon: true,
          },
        },
        {
          path: 'recover/:token',
          name: 'recoverPassword',
          component: RecoverPassword,
          props: true,
          meta: {
            withNavbar: false,
            withFooter: false,
            requiresAnon: true,
          },
        },
      ],
    },
  ],
  // eslint-disable-next-line
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },

});

const isEmpty = obj => !obj || Object.keys(obj).length === 0;

router.beforeEach(async (to, from, next) => {
  // next();
  // if (to.meta.withNavbar) document.documentElement.classList.add('has-navbar-fixed-top');
  // else document.documentElement.classList.remove('has-navbar-fixed-top');
  const requiresAnon = to.matched.find(record => Object.prototype.hasOwnProperty.call(record.meta, 'requiresAnon'));
  const requiresAuth = to.matched.find(record => Object.prototype.hasOwnProperty.call(record.meta, 'requiresAuth'));
  const requiresAdmin = to.matched.find(record => Object.prototype.hasOwnProperty.call(record.meta, 'requiresAdmin'));
  console.log('requiresAnon', requiresAnon);
  console.log('requiresAuth', requiresAuth);
  console.log('requiresAdmin', requiresAdmin);
  if (requiresAnon) {
    console.log('- Requires anon');
    // Is anonymous
    const isAnon = isEmpty(store.getters.user);
    if (isAnon) {
      console.log('-- is anon, go on');
      next();
    } else {
      console.log('-- NOT ANON, kick to home');
      next({
        name: 'home',
      });
    }
  } else if (requiresAuth) {
    console.log('- Requires auth');
    const isAuth = store.state.isAuthenticated;
    if (!isAuth) {
      console.log('-/ Not logged in.. FORBIDDEN');
      next({
        name: 'forbidden',
      });
    }
    if (requiresAdmin) {
      console.log('-- Requires admin role');
      const isAdmin = store.state.user.isAdmin || false;
      if (isAdmin) {
        console.log('--- is Admin! Go on');
        next();
      } else {
        console.log('--- NO ADMIN, GET OUT OF HERE');
        next({
          name: 'forbidden',
        });
      }
    }
    console.log('-- is logged, go on');
    next();
  } else {
    console.log('- All good, go on');
    next();
  }

  // if (requiresAnon) {
  //   console.log('- Requires anon');
  //   // Is anonymous
  //   const isAnon = isEmpty(store.state.user);
  //   if (isAnon) {
  //     console.log('-- is anon, go on');
  //     next();
  //   } else {
  //     console.log('-- NOT ANON, kick to home');
  //     next({
  //       name: 'home',
  //     });
  //   }
  // } else if (requiresAuth) {
  //   console.log('- Requires auth');
  //   const isAuth = store.state.isAuthenticated;
  //   if (!isAuth) {
  //     console.log('-/ Not logged in.. getting user info');
  //     try {
  //       await getUser();
  //       console.log('-// Got user');
  //     } catch {
  //       console.log('-// Not logged, FORBIDDEN');
  //       next({
  //         name: 'forbidden',
  //       });
  //     }
  //   }
  //   if (requiresAdmin) {
  //     console.log('-- Requires admin role');
  //     const isAdmin = store.state.user.isAdmin || false;
  //     if (isAdmin) {
  //       console.log('--- is Admin! Go on');
  //       next();
  //     } else {
  //       console.log('--- NO ADMIN, GET OUT OF HERE');
  //       next({
  //         name: 'forbidden',
  //       });
  //     }
  //   }
  //   console.log('-- is logged, go on');
  //   next();
  // } else {
  //   console.log('- All good, go on');
  //   next();
  // }

  // if (to.matched.some(record => record.meta.requiresAdmin)) {
  //   // console.log('requiresAdmin');
  //   // console.log(store.state.isAuthenticated);
  //   // this route requires auth, check if logged in
  //   // if not, redirect to login page.
  //   if (!store.getters.isAdmin && !store.state.isAuthenticated) {
  //     // console.log('to-login');
  //     next({
  //       path: '/forbidden',
  //       // query: { redirect: to.fullPath }
  //     });
  //   } else {
  //     next();
  //   }
  // }
  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   // console.log('requiresAuth');
  //   // console.log(store.state.isAuthenticated);
  //   // this route requires auth, check if logged in
  //   // if not, redirect to login page.
  //   if (!store.state.isAuthenticated) {
  //     // console.log('to-login');
  //     next({
  //       path: '/login',
  //       // query: { redirect: to.fullPath }
  //     });
  //   } else {
  //     next();
  //   }
  // }
  // if (to.matched.some(record => record.meta.requiresAnon)) {
  //   // this route requires auth, check if logged in
  //   console.log('requiresAnon');
  //   console.log(store.state.isAuthenticated);
  //   // if not, redirect to login page.
  //   if (store.state.isAuthenticated) {
  //     // console.log('to-home');
  //     next({
  //       path: '/',
  //     });
  //   } else {
  //     next();
  //   }
  // }
  // next();
});

export default router;
