<template>
  <footer class="w-full bg-gray-50">
    <div class="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
      <div class="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
        <div class="flex flex-col gap-8">
          <div class="flex items-center gap-2">
            <div class="flex w-9 h-9 items-center justify-center p-1.5 bg-ecopatch/90 bg-[#184B44] rounded shadow-md">
              <img
                class="w-6 h-6"
                alt="Ecopatch Logo"
                src="/Frame1.png"
              />
            </div>
            <div class="font-bold text-gray-900 text-3xl tracking-tight leading-none font-['General Sans']">
              ECOPATCH
            </div>
          </div>

          <div class="max-w-sm text-gray-700/80">
            <div class="font-medium text-xl leading-7 mb-1 font-['Space_Grotesk']">
              Make an Impact, One Patch at a Time.
            </div>
            <div class="font-normal text-base leading-6 font-['General Sans']">
              Join our mission to restore forests, offset carbon, and create a
              tangible difference for the planet.
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-16">
          <div class="flex flex-col gap-6">
            <h3 class="font-medium text-gray-900 text-xl leading-7 font-['Space_Grotesk']">
              Quick links
            </h3>
            <nav class="flex flex-col gap-2">
              <a
                v-for="(link, index) in quickLinks"
                :key="index"
                href="#"
                class="text-gray-700 text-base leading-7 hover:text-ecopatch transition-colors font-['General Sans']"
              >
                {{ link }}
              </a>
            </nav>
          </div>

          <div class="flex flex-col gap-6">
            <h3 class="font-medium text-gray-900 text-xl leading-7 font-['Space_Grotesk']">
              Social Media
            </h3>
            <nav class="flex flex-col gap-2">
              <a
                v-for="(link, index) in socialMediaLinks"
                :key="index"
                href="#"
                class="text-gray-700 text-base leading-7 hover:text-ecopatch transition-colors font-['General_Sans']"
              >
                {{ link }}
              </a>
            </nav>
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-300 gap-3">
        <div class="text-gray-500 text-sm font-['General Sans']">
          © Copyright 2025, ECOPATCH All Rights Reserved
        </div>
        <div class="flex gap-6">
          <a
            href="#"
            class="text-gray-500 text-sm hover:text-ecopatch transition-colors font-['General Sans']"
          >
            Terms of Service
          </a>
          <a
            href="#"
            class="text-gray-500 text-sm hover:text-ecopatch transition-colors font-['General Sans']"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const quickLinks = ["Home", "Features", "How it works", "Testimonials", "FAQ"]
const socialMediaLinks = ["Facebook", "Instagram", "LinkedIn"]
</script>