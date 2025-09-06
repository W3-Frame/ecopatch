<template>
  <nav class="flex w-full h-auto bg-neutral-50 items-center justify-between px-4 md:px-8 py-4 backdrop-blur-sm z-10">
    <!-- Logo -->
    <div class="flex items-center gap-1">
      <div class="flex w-6 h-6 sm:w-7 sm:h-7 items-center justify-center p-1 bg-[#184B44] rounded shadow">
        <img
          class="w-full h-full object-contain"
          alt="Ecopatch Logo"
          src="/Frame1.png"
        />
      </div>
      <div class="font-bold text-gray-950 text-lg sm:text-2xl font-['General Sans']">
        ECOPATCH
      </div>
    </div>

    <!-- Navigation Links - Hidden on mobile, visible on medium screens and up -->
    <div class="hidden md:flex items-center justify-center space-x-6 lg:space-x-10 font-['General_Sans']">
      <a
        v-for="(item, index) in navigationItems"
        :key="index"
        :href="item.href"
        class="font-medium text-gray-950 text-base hover:opacity-60 transition-opacity font-['General_Sans']"
      >
        {{ item.label }}
      </a>
    </div>

    <!-- Mobile Menu Button - Only visible on small screens -->
    <button class="md:hidden text-gray-900">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <!-- Sign in Button -->
    <button class="hidden md:flex items-center justify-center px-4 py-2 bg-green-700/20 text-green-700 rounded-md hover:bg-green-700/30 transition-colors">
      <span class="font-medium text-sm font-['General_Sans']">
        Sign in
      </span>
    </button>
  </nav>

  <!-- Mobile Navigation Menu - Only appears when menu button is clicked -->
  <!-- Implement with v-if or v-show based on state management -->
</template>

<script setup lang="ts">
const navigationItems = [
  { label: "Home", href: "#" },
  { label: "How it works", href: "#" },
  { label: "Features", href: "#" },
  { label: "FAQ", href: "#" },
]
</script>