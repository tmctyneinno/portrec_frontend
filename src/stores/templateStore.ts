import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useTemplateStore = defineStore('template', () => {

  const activateToolTip = ref<number>(1)

  const navBarMenus: any[] = [
    // {
    //   title: 'Find Jobs',
    //   routePath: '/find-jobs'
    // },

    {
      title: 'For Talents',
      routePath: '/for-talent'
    },
    {
      title: 'Summits',
      routePath: '/summits'
    },
    {
      title: 'Services',
      routePath: '/our-services'
    },
    {
      title: 'About Us',
      routePath: '/about-us'
    },
    {
      title: 'Contact',
      routePath: '/contact'
    }
  ]

  const themeColors = reactive({
    color1: '#873A70',
    color2: '#1AB2B5',
    color1_soft: '#873A7007',
    color2_soft: '#1AB2B507',
  })


  const applicationStatusColor = (statusText: string) => {
    let color;
    if (statusText == 'IN_REVIEW' || statusText == 'In_Review') color = '#3734a7'
    else if (statusText == 'INTERVIEWING' || statusText == 'Interviewing') color = '#a0ab19'
    else if (statusText == 'SHORTLISTED' || statusText == 'Shortlisted') color = '#8e19ab'
    else if (statusText == 'OFFERED' || statusText == 'Offered') color = '#34a749'
    else if (statusText == 'REJECTED' || statusText == 'Rejected') color = '#a73434'
    else color = '#111'
    return color
  }


  return { navBarMenus, themeColors, applicationStatusColor, activateToolTip }
})
