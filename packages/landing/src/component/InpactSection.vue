<template>
  <section class="flex flex-col items-center gap-16 w-full py-12 md:py-16 lg:py-20 px-4">
    <header class="flex flex-col items-center gap-6 max-w-4xl mx-auto">
      <div class="inline-flex items-center justify-center px-5 py-3 bg-green-800/5 rounded-3xl border border-gray-200 backdrop-blur-lg">
        <div class="font-normal text-green-800 text-sm leading-5 font-['Space_Grotesk']">
          How it works
        </div>
      </div>

      <div class="flex flex-col items-center gap-3">
        <h2 class="font-medium text-gray-900 text-2xl md:text-3xl lg:text-4xl leading-tight font-['Space_Grotesk']">
          Your Path to Impact
        </h2>

        <p class="font-light text-gray-700 text-base md:text-lg lg:text-xl text-center max-w-2xl font-['General Sans']">
          From purchase to impact, a simple journey toward restoring nature.
        </p>
      </div>
    </header>

    <div class="w-full max-w-6xl mx-auto space-y-6">
      <div
        v-for="(step, index) in stepsData"
        :key="index"
        class="w-full bg-white rounded-xl p-8 shadow-sm border border-gray-100"
      >
        <div class="flex justify-between items-start">
          <div class="flex-1 pr-8">
            <h3 class="text-3xl font-semibold text-[#4ECCBB] mb-4 ">
              {{ step.stepNumber }}
            </h3>

            <div class="space-y-2">
              <h4 class="text-xl font-medium text-gray-900 font-['Space_Grotesk'] ">
                {{ step.title }}
              </h4>

              <p class="text-lg font-light text-gray-500 leading-6 font-['General Sans']">
                <template v-for="(line, lineIndex) in step.description.split('\n')" :key="lineIndex">
                  {{ line }}
                  <br v-if="lineIndex < step.description.split('\n').length - 1" />
                </template>
              </p>
            </div>
          </div>

          <div class="">
            <img 
              class="w-12 h-12  "
              :src="step.src"
              :alt="`${step.stepNumber} illustration`"
              @error="handleImageError"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const stepsData = ref([
  {
    stepNumber: "Step 1",
    title: "Own a Land Patch as an NFT",
    description:
      "Explore the marketplace and choose your project patch.\nEach patch is minted as a unique NFT, your certificate of ecological ownership and your gateway to real-world impact.",
    src: "/Image1.png"
  },
  {
    stepNumber: "Step 2",
    title: "Receive Your Impact NFT",
    description:
      "Once the purchase is completed, you receive a unique NFT representing your patch. This digital certificate ensures transparency and traceability on the blockchain.",
    src: "/Image2.png"
  },
  {
    stepNumber: "Step 3",
    title: "Track Restoration and Your Carbon Contributions",
    description:
      "From your dashboard, monitor the progress of your patch: CO₂ offset and profit generated. Your investment turns into a measurable and tangible impact.",
    src: "/Image3.png"
  },
  {
    stepNumber: "Step 4",
    title: "Trade Your NFT on a Marketplace",
    description:
      "You can trade your NFTs on major Web3 marketplaces. Your investment retains its value and may even attract other contributors looking to extend the impact.",
    src: "/Image4.png"
  },
]);

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  console.error(`Failed to load image: ${target.src}`);
  // Fallback image if the original fails to load
  target.src = '/avatar.png'; 
}
</script>