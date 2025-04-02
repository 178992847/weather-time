<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const btnList = reactive(['Time', 'ConfettiView', 'Weather'])
const handleClick = (item) => {
  const viewObj = reactive({
    Time: 'timeView',
    ConfettiView: 'confettiView',
    Weather: 'weatherView',
  })
  router.push(`/${viewObj[item]}`)
}
</script>

<template>
  <main class="main">
    <el-button
      type="primary"
      v-for="(item, index) in btnList"
      :key="index"
      @click="handleClick(item)"
    >
      {{ item }}
    </el-button>
  </main>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>
<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
