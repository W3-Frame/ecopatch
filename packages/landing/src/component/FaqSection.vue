<template>
  <section class="flex flex-col items-center gap-10 w-full py-16">
    <header class="flex flex-col items-center gap-6">
      <div class="inline-flex items-center justify-center px-5 py-3 bg-green-800/5 rounded-3xl border border-gray-200">
        <span class="font-normal text-green-800 text-sm leading-5 font-['Space_Grotesk']">
          FAQ
        </span>
      </div>

      <div class="flex flex-col items-center gap-3">
        <h2 class="font-medium text-gray-900 text-4xl leading-tight font-['Space_Grotesk']">
          Some Common FAQ's
        </h2>

        <p class="font-light text-gray-600 text-xl text-center leading-7 font-['General Sans']">
          Get answers to your questions and learn about our platform
        </p>
      </div>
    </header>

    <div class="w-full max-w-3xl">
      <div class="w-full space-y-4">
        <div
          v-for="faq in faqData"
          :key="faq.id"
          class="border border-gray-100 bg-gray-50 rounded-lg overflow-hidden"
        >
          <button
            @click="toggleAccordion(faq.id)"
            class="w-full px-6 py-6 text-gray-900 text-lg leading-7 text-left flex items-center justify-between hover:bg-gray-100 transition-colors font-['Space_Grotesk']"
          >
            {{ faq.question }}
            <svg 
              :class="`w-5 h-5 text-gray-500 transition-transform duration-200 ${openItems.includes(faq.id) ? 'rotate-180' : ''}`"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div
            v-if="faq.answer && openItems.includes(faq.id)"
            class="px-6 pb-6"
          >
            <p class="text-gray-500 text-base leading-7 font-['General Sans']">
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const openItems = ref(['item-1'])

const toggleAccordion = (itemId: string) => {
  const index = openItems.value.indexOf(itemId)
  if (index > -1) {
    openItems.value.splice(index, 1)
  } else {
    openItems.value.push(itemId)
  }
}

const faqData = [
  {
    id: "item-1",
    question: "What is an Ecopatch?",
    answer:
      "An Ecopatch is a digital certificate (NFT) that represents a real piece of forest restoration. Each patch contributes to reforestation, carbon offsetting, and biodiversity protection.",
  },
  {
    id: "item-2",
    question: "How do I know my impact is real?",
    answer: "We provide transparent tracking through blockchain technology and regular updates from our partner organizations on the ground.",
  },
  {
    id: "item-3",
    question: "Can I resell my Ecopatch?",
    answer: "Yes, your Ecopatch NFT can be traded on major Web3 marketplaces, maintaining its value and impact verification.",
  },
  {
    id: "item-4",
    question: "Do I need crypto to buy an Ecopatch?",
    answer: "While we accept cryptocurrency, we also offer traditional payment methods to make our platform accessible to everyone.",
  },
  {
    id: "item-5",
    question: "How often will I receive updates?",
    answer: "You'll receive monthly progress reports and can access real-time data through your dashboard at any time.",
  },
  {
    id: "item-6",
    question: "Why choose Ecopatch over other offset solutions?",
    answer: "Ecopatch offers unique NFT ownership, transparent blockchain tracking, community involvement, and direct impact on local communities.",
  },
]
</script>