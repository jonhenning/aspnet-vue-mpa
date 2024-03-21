<template>
  <div v-bind="$attrs">
    <div class="myapp-callout">
      This is a normal vue component using the <a href="https://vuejs.org/api/sfc-script-setup.html">Composition API with setup script.</a>
    </div>
    
    Count: {{ count }}
    <a class="myapp-button" @click="count++">Add</a>
    <a class="myapp-button" @click="count--">Subtract</a>
  </div>
</template>

<script setup>
  //composition API using setup script
  const { ref } = Vue;
  const count = ref(1);
</script>
