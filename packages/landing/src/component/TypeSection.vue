<template>
  <div class="flex flex-col w-full items-center gap-16 p-8 md:p-12 lg:p-20 relative bg-gray-50">
    <!-- Header -->
    <header class="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
      <div
        class="inline-flex items-center justify-center px-5 py-3 bg-green-800/5 rounded-3xl border border-gray-200 backdrop-blur-lg mb-6"
      >
        <div class="font-light text-green-800 text-sm leading-5 font-['Space_Grotesk']">Types of Projects</div>
      </div>

      <div class="flex flex-col items-center gap-3">
        <h2 class="font-medium text-[#171717] text-2xl md:text-3xl lg:text-4xl leading-tight font-['Space_Grotesk']">
          Features That Empower You
        </h2>

        <p
          class="font-light text-[#666666] text-base md:text-lg lg:text-xl text-center max-w-2xl leading-7 font-['General Sans']"
        >
          Everything you need to make your ecological contribution transparent, valuable, and
          impactful.
        </p>
      </div>
    </header>

    <!-- Carousel -->
    <div class="relative max-w-6xl mx-auto w-full">
      <div class="overflow-hidden">
        <div
          class="flex transition-transform duration-500 ease-in-out gap-8"
          :style="{ transform: `translateX(-${currentIndex * slideWidth}%)` }"
        >
          <div v-for="(slide, index) in slides" :key="index" class="flex-none w-1/3">
            <div class="rounded-xl overflow-hidden flex flex-col h-full bg-white p-4">
              <!-- Section grise en haut -->
              <div class="w-full h-64 bg-gray-200 rounded-lg"></div>

              <!-- Contenu texte en bas -->
              <div class="flex flex-col flex-1 pt-4">
                <h3 class="font-medium text-[#171717] text-lg leading-7 mb-4">{{ slide.title }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation buttons -->
      <button
        @click="previousSlide"
        class="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg text-green-800"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <button
        @click="nextSlide"
        class="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg text-green-800"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <!-- Indicators -->
      <div class="flex justify-center gap-3 mt-8">
        <button
          v-for="(slide, index) in indicatorCount"
          :key="index"
          @click="goToSlide(index)"
          class="w-3 h-3 rounded-full"
          :class="
            Math.floor(currentIndex / slidesToShow) === index ? 'bg-green-800' : 'bg-gray-200'
          "
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Slide {
  title: string
  description: string
}

const slides = ref<Slide[]>([
  {
    title: 'Reforestation & Forest Conservation',
    description: 'Reforestation & Forest Conservation.',
  },
  {
    title: 'Carbon Footprint Tracking',
    description: 'Carbon Footprint Tracking.',
  },
  {
    title: 'Renewable Energy Solutions',
    description: 'Renewable Energy Solutions.',
  },
  {
    title: 'Sustainable Living Guide',
    description: 'Sustainable Living Guide.',
  },
  {
    title: 'Ocean Conservation',
    description: 'Ocean Conservation.',
  },
  {
    title: 'Wildlife Protection',
    description: 'Wildlife Protection.',
  },
])

const currentIndex = ref(0)
const slidesToShow = ref(3)
const slideWidth = computed(() => 100 / slidesToShow.value)
const maxIndex = computed(() => slides.value.length - slidesToShow.value)
const indicatorCount = computed(() => Math.ceil(slides.value.length / slidesToShow.value))

let autoplayInterval: number | null = null

const nextSlide = () => {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value++
  } else {
    // Boucle: retour au début
    currentIndex.value = 0
  }
}

const previousSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    // Boucle: aller à la fin
    currentIndex.value = maxIndex.value
  }
}

const goToSlide = (index: number) => {
  currentIndex.value = index * slidesToShow.value
}

const updateSlidesToShow = () => {
  // Always show 3 cards, regardless of screen size
  slidesToShow.value = 3
}

const startAutoplay = () => {
  // Removed autoplay to prevent animation
}

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
    autoplayInterval = null
  }
}

onMounted(() => {
  updateSlidesToShow()
  window.addEventListener('resize', updateSlidesToShow)
  // No autoplay
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSlidesToShow)
  stopAutoplay()
})
</script>
