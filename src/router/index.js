import Vue from 'vue'
import Router from 'vue-router'
import AnalysisDoc from "@/components/AnalysisDoc";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AnalysisDoc',
      component: AnalysisDoc
    }
  ]
})
