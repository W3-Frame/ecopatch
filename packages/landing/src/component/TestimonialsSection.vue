<template>
  <section class="flex flex-col w-full items-center p-20 relative bg-white">
    <header class="flex flex-col items-center gap-6">
      <div
        class="font-normal text-green-800 text-sm leading-5 px-5 py-3 bg-green-800/5 rounded-3xl border border-gray-200 font-['Space_Grotesk']"
      >
        Testimonials
      </div>

      <div class="flex flex-col items-center gap-3">
        <h2 class="font-medium text-gray-900 text-4xl leading-tight font-['Space_Grotesk']">
          What Our Community Says
        </h2>

        <p
          class="font-light font-['General Sans'] text-gray-500 text-xl text-center leading-7 max-w-2xl mb-8"
        >
          Real stories from people turning their investment into positive change.
        </p>
      </div>
    </header>

    <div class="flex items-center justify-center gap-6">
      <div
        v-for="(testimonial, index) in testimonials"
        :key="index"
        class="flex flex-col w-[400px] items-center justify-between p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
      >
        <div class="flex flex-col justify-between h-full w-full">
          <blockquote
            class="text-gray-900 text-base leading-6 font-['General Sans'] mb-6"
            v-html="testimonial.text"
          ></blockquote>

          <div class="flex flex-col w-full">
            <div class="w-full h-px bg-gray-200 my-4"></div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    :src="testimonial.avatar"
                    :alt="testimonial.name"
                    class="w-full h-full object-cover"
                  />
                </div>

                <div class="flex flex-col">
                  <div class="font-medium text-gray-900 text-lg">
                    {{ testimonial.name }}
                  </div>

                  <div class="text-gray-600 text-base mt-1">
                    {{ testimonial.location }}
                  </div>
                </div>
              </div>

              <time class="text-gray-500 text-sm transform translate-y-5">
                {{ testimonial.date }}
              </time>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center gap-3 mt-8">
      <div class="flex items-center">
        <div
          v-for="(user, index) in avatarUsers"
          :key="index"
          :class="`w-10 h-10 ${index > 0 ? '-ml-3' : ''} border-4 border-white rounded-full overflow-hidden`"
        >
          <img :src="user.avatar" :alt="`User ${index + 1}`" class="w-full h-full object-cover" />
        </div>
      </div>

      <div class="font-medium text-gray-900 text-2xl font-['Space_Grotesk']">
        Trust by 4360+ users
      </div>
    </div>

    <button
      class="mt-3 inline-flex items-center justify-center px-4 py-2 bg-green-900 text-white rounded-md hover:bg-green-800/90 transition-colors"
    >
      <span class="font-medium text-base sm:text-lg"> Get Started Now </span>
    </button>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    text: "I bought my first Ecopatch a few months ago, and <strong class='font-bold'>it's amazing to see the hectares restored and trees planted thanks to my contribution. My investment really makes a tangible impact on the planet!</strong>",
    name: 'Leo Martinez',
    location: 'Paris',
    date: 'Jun 9, 2025',
    avatar: '/avatar.png',
  },
  {
    text: "I bought my first Ecopatch a few months ago, and <strong class='font-bold'>it's amazing to see the hectares restored and trees planted thanks to my contribution. My investment really makes a tangible impact on the planet!</strong>",
    name: 'Sarah Johnson',
    location: 'London',
    date: 'May 15, 2025',
    avatar: '/avatar.png',
  },
  {
    text: "I bought my first Ecopatch a few months ago, and <strong class='font-bold'>it's amazing to see the hectares restored and trees planted thanks to my contribution. My investment really makes a tangible impact on the planet!</strong>",
    name: 'Miguel Sanchez',
    location: 'Madrid',
    date: 'Jul 2, 2025',
    avatar: '/avatar.png',
  },
]

const avatarUsers = [
  { avatar: '/avatar.png' },
  { avatar: '/avatar.png' },
  { avatar: '/avatar.png' },
]
</script>
