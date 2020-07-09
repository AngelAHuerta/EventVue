import Vue from 'vue'
import VueRouter from 'vue-router'
import EventCreate from '@/views/EventCreate'
import EventList from '@/views/EventList'
import EventShow from '@/views/EventShow'
import NProgress from 'nprogress'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
    props: true
  },
  {
    path: '/event/show/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    beforeEnter(to, from, next) {
      store.dispatch('event/fetchEvent', to.params.id).then(event => {
        to.params.event = event
        next()
      })
    }
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
