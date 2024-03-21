<template>
  <div class="progressbar-container">
    <div class="progressbar" v-bind="$attrs"></div>
  </div>
</template>

<style>

.progressbar-container {
  position: relative;
  width: 100%;
  background: var(--bg-highlight);
  border-radius: 0.25rem;
}

.progressbar {
  width: 100%;
  background: var(--bg-highlight);
  position: absolute;
  top: 0;
  height: 3px;
  overflow: hidden;
}
.progressbar::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgba(233, 233, 233, 1) 0,
    rgba(233, 233, 233, 0.9) 50%,
    rgba(233, 233, 233, 0.8) 100%
  );
  animation: shimmer 3s ease-out infinite;
  content: "";
}

@keyframes shimmer {
  100% {
    transform: translateX(0%);
    opacity: 0;
  }
}
</style>

<script>
//options API
export default {
  data() {
    return {
    };
  },
  mounted() {
      console.log('mounted');
  }
};
</script>
