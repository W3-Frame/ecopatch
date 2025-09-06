<template>
  <section class="relative w-full overflow-hidden bg-neutral-50 py-12 md:py-20 lg:py-24">
    <!-- Background gradients -->
    <div class="absolute inset-0 w-full h-full opacity-60 overflow-hidden">
      <div
        v-for="(element, index) in gradientElements"
        :key="`gradient-${index}`"
        class="absolute blur-lg"
        :class="element.mobileClass"
      />
    </div>

    <!-- Hero content -->
    <div class="container mx-auto px-4 relative z-10">
      <div class="flex flex-col items-center max-w-4xl mx-auto">
        <!-- Stats badge -->
        <div
          class="inline-flex items-center justify-center p-2 bg-white rounded-xl border border-solid border-black/20 shadow-sm"
        >
          <span class="font-medium text-gray-600 text-sm sm:text-sm text-center font-['General Sans']">
            Already 480.000+ carbon credits generated and redistributed
          </span>
        </div>

        <!-- Main heading -->
        <div class="flex flex-col gap-6 text-center items-center justify-center mt-5">
          <h1
            class="font-bold text-gray-900 text-3xl md:text-4xl lg:text-5xl text-center leading-tight font-['Space_Grotesk']"
          >
            Where investment meets ecology <br />
            and communities
          </h1>

          <!-- Subheading -->
          <p
            class="font-light text-gray-700 text-base md:text-lg lg:text-xl max-w-2xl font-['General Sans']"
          >
            A Web3 platform that regenerates the Earth, empowers local <br />
            communities, and redistributes carbon credits through NFTs.
          </p>
        </div>

        <!-- CTA Button -->
        <button
          class="mt-7 inline-flex items-center justify-center px-4 py-2 bg-green-900 text-white rounded-md hover:bg-green-800/90 transition-colors"
        >
          <span class="font-medium text-sm sm:text-lg font-['General Sans']"> Get Started Now </span>
        </button>

        <!-- Main image/visualization -->
        <div
          class="w-full shadow-xl mt-10 rounded-2xl backdrop-blur-md border border-white/20 overflow-hidden"
        >
          <img
            src="/hhh.png"
            alt="Home visualization"
            class="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Simplified gradient elements with responsive classes
const gradientElements = [
  {
    mobileClass: 'w-24 h-64 top-[20%] right-[5%] bg-gradient-to-b from-green-500/25 to-transparent',
  },
  {
    mobileClass:
      'w-16 h-72 top-[15%] right-[15%] bg-gradient-to-b from-green-500/30 to-transparent',
  },
  {
    mobileClass:
      'w-20 h-80 top-[10%] right-[25%] bg-gradient-to-b from-green-500/25 to-transparent',
  },
  {
    mobileClass:
      'w-32 h-96 top-[12%] left-[60%] bg-gradient-to-br from-green-500/15 to-transparent',
  },
  {
    mobileClass: 'w-20 h-96 top-0 left-[45%] bg-gradient-to-b from-green-500/25 to-transparent',
  },
  {
    mobileClass: 'w-8 h-72 top-[15%] left-[40%] bg-gradient-to-b from-green-500/10 to-transparent',
  },
  {
    mobileClass: 'w-12 h-72 top-[18%] left-[30%] bg-gradient-to-b from-green-500/20 to-transparent',
  },
  {
    mobileClass: 'w-12 h-72 top-[15%] left-[10%] bg-gradient-to-b from-green-500/20 to-transparent',
  },
  {
    mobileClass: 'w-12 h-72 top-[17%] left-[20%] bg-gradient-to-b from-green-500/18 to-transparent',
  },
]
</script>
