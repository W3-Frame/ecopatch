<template>
  <section class="flex flex-col w-full items-center gap-16 p-8 md:p-12 lg:p-20 relative bg-gray-50">
    <header class="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
      <div
        class="inline-flex items-center justify-center px-5 py-3 bg-green-800/5 rounded-3xl border border-gray-200 backdrop-blur-lg"
      >
        <div class="font-light text-green-800 text-sm leading-5 font-['Space_Grotesk']">
          Features
        </div>
      </div>

      <div class="flex flex-col items-center gap-5">
        <h2
          class="font-medium text-[#171717] text-2xl md:text-3xl lg:text-4xl leading-tight font-['Space_Grotesk']"
        >
          Features That Empower You
        </h2>

        <p
          class="font-light text-[#666666] text-base md:text-lg lg:text-xl text-center max-w-2xl leading-7 font-['Inter']"
        >
          Everything you need to make your ecological contribution transparent, valuable, and
          impactful.
        </p>
      </div>
    </header>

    <div class="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
      <div
        class="flex flex-col w-full md:w-3/5 lg:w-2/3 h-auto md:h-[484px] items-center gap-3 p-4 bg-white rounded-2xl overflow-hidden border border-slate-100"
      >
        <div class="my-9">
          <img src="/img.png" alt="" />

          <div class="flex items-center gap-5 w-full overflow-hidden relative"></div>
        </div>

        <div class="flex flex-col items-start gap-3 w-full">
          <h3 class="font-medium text-[#171717] text-lg leading-7 font-['Space_Grotesk']">
            Ecological Tokenization
          </h3>
          <p class="font-light text-[#666666] text-base leading-7 font-['Inter']">
            Natural areas become unique digital patches, secured as Land NFTs on the Ethereum
            blockchain for full transparency and traceability.
          </p>
        </div>
      </div>

      <div
        class="flex flex-col w-full md:w-2/5 lg:w-1/3 h-auto md:h-[484px] items-center justify-between p-4 bg-white rounded-2xl"
      >
        <div class="w-full bg-white rounded-xl relative">
          <img src="/img2.png" alt="" />
        </div>

        <div class="flex flex-col items-start gap-3 w-full">
          <h3 class="font-medium text-[#171717] text-lg leading-7 font-['Space_Grotesk']">
            Collective Financing
          </h3>
          <p class="font-light text-[#666666] text-base leading-7 font-['Inter']">
            Smart contracts enable decentralized funding via NFTs or liquidity pools.
          </p>
        </div>
      </div>
    </div>

    <div class="flex flex-row md:flex-row items-start justify-between gap-6 w-full">
      <div
        class="flex flex-col w-full md:w-2/5 lg:w-1/3 items-center justify-between p-4 bg-white rounded-3xl"
      >
        <div class="w-full">
          <img
            src="/globe.png"
            alt="Profit Redistribution"
            class="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div class="flex flex-col items-start gap-1 w-full">
          <h3 class="font-medium text-[#171717] text-lg leading-7 font-['Space_Grotesk']">
            Social Impact
          </h3>
          <p class="font-light text-[#666666] text-base leading-7 font-['Inter']">
            They join ecological restoration and benefit from revenue sharing via carbon rewards and
            green investment.
          </p>
        </div>
      </div>

      <div
        class="flex flex-col w-full md:w-2/5 lg:w-2/3 items-center justify-between p-4 bg-white rounded-3xl"
      >
        <div class="w-full">
          <img
            src="/img1.png"
            alt="Profit Redistribution"
            class="w-full object-cover rounded-lg mb-2"
          />
        </div>
        <div class="flex flex-col items-start gap-1 w-full">
          <h3 class="font-medium text-[#171717] text-lg leading-7 font-['Space_Grotesk']">
            Profit Redistribution
          </h3>
          <p class="font-light text-[#666666] text-base leading-7 font-['Inter']">
            Projects generate sustainable revenues, automatically shared with Land NFT holders via
            blockchain.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const mockupCards = [
  {
    greenBar: 'w-6 h-2',
    grayBar: 'w-24 h-3',
    mainImage: 'w-32 h-24',
    dots: ['w-6 h-1.5', 'w-6 h-1.5', 'w-6 h-1.5', 'w-6 h-1.5'],
    textLines: ['w-full h-2', 'w-full h-1.5', 'w-6 h-2'],
    bottomImage: 'w-20 h-16',
    bottomTextLines: ['w-8 h-2', 'w-6 h-1.5'],
  },
  {
    greenBar: 'w-6 h-2',
    grayBar: 'w-24 h-3',
    mainImage: 'w-32 h-24',
    dots: ['w-6 h-1.5', 'w-6 h-1.5', 'w-6 h-1.5', 'w-6 h-1.5'],
    textLines: ['w-full h-2', 'w-full h-1.5', 'w-6 h-2'],
    bottomImage: 'w-20 h-16',
    bottomTextLines: ['w-8 h-2', 'w-6 h-1.5'],
  },
  {
    greenBar: 'w-6 h-2',
    grayBar: 'w-24 h-3',
    mainImage: 'w-32 h-24',
    dots: ['w-6 h-1.5', 'w-6 h-1.5', 'w-6 h-1.5', 'w-6 h-1.5'],
    textLines: ['w-full h-2', 'w-full h-1.5', 'w-6 h-2'],
    bottomImage: 'w-20 h-16',
    bottomTextLines: ['w-8 h-2', 'w-6 h-1.5'],
  },
]
</script>
