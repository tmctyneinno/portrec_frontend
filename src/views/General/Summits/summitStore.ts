import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { SummitInterface } from '@/stores/interfaces';

export const useSummitStore = defineStore('summitStore', () => {

  // const summitSampleObj: SummitInterface = {
  //   id: '1',
  //   title: 'Portrec Global Innovation Summit 2024',
  //   theme: 'The Future of Digital Governance',
  //   summit_date: '2024-05-05',
  //   venue: 'Virtual (YouTube Live)',
  //   speakers: [
  //     { name: 'John Doe', title: 'CEO, TechCorp' },
  //     { name: 'Jane Smith', title: 'AI Expert, FutureTech' },
  //   ]
  // }

  const recentSummits = ref([])
  const olderSummits = ref([])

  // const recentSummits = computed(() => {
  //   return Array.from({ length: 5 }, () => ({ ...summitSampleObj }))
  // })

  // const olderSummits = computed(() => {
  //   return Array.from({ length: 8 }, () => ({ ...summitSampleObj }))
  // })

  return { recentSummits, olderSummits }
})
