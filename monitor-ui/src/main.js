import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/local.bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'font-awesome/css/font-awesome.css'
import './plugins/iview.js'
import httpRequestEntrance from '@/assets/js/httpRequestEntrance.js'
import jquery from 'jquery'
import {tableUtil} from '@/assets/js/tableUtil.js'
import {validate} from '@/assets/js/validate.js'
import VeeValidate from '@/assets/veeValidate/VeeValidate'
import apiCenter from '@/assets/config/api-center.json'

Vue.prototype.$httpRequestEntrance = httpRequestEntrance
Vue.prototype.JQ = jquery
Vue.prototype.$validate = validate
Vue.prototype.$tableUtil = tableUtil
Vue.prototype.apiCenter = apiCenter

import Title from '@/components/components/Title'
import PageTable from '@/components/components/table-page/page'
import ModalComponent from '@/components/components/modal'
Vue.component('Title', Title)
Vue.component('PageTable', PageTable)
Vue.component('ModalComponent', ModalComponent)
Vue.use(VeeValidate)

Vue.config.productionTip = false

Vue.component('tdSlot', {
  render(createElement) {
    function deepClone(vnodes, createElement) {

      function cloneVNode (vnode) {
        const clonedChildren = vnode.children && vnode.children.map(vnode => cloneVNode(vnode))
        const cloned = createElement(vnode.tag, vnode.data, clonedChildren)
        cloned.text = vnode.text
        cloned.isComment = vnode.isComment
        cloned.componentOptions = vnode.componentOptions
        cloned.elm = vnode.elm
        cloned.context = vnode.context
        cloned.ns = vnode.ns
        cloned.isStatic = vnode.isStatic
        cloned.key = vnode.key

        return cloned
      }
      const clonedVNodes = vnodes.map(vnode => cloneVNode(vnode))
      return clonedVNodes
    }
    var slots = this.$parent.$slots.default
    var slot = null
    for(let i=0;i<slots.length;i++){
      if(slots[i].data && this.name === slots[i].data.slot){
        slot = slots[i]
        break
      }
    }
    return createElement('div',{class:'tdslot'},deepClone([slot], createElement))
  },
  props:{
    name:{
      type:String,
      default:''
    }
  }
})

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')