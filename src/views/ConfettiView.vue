<template>
  <div class="about">
    <!-- <el-button type="primary" @click="basicCannon">Basic Cannon</el-button>
    <el-button type="primary" @click="randomDirection">Random Direction</el-button>
    <el-button type="primary" @click="realisticLook">Realistic Look</el-button>
    <el-button type="primary" @click="fireworks">Fireworks</el-button>
    <el-button type="primary" @click="stars">Stars</el-button>
    <el-button type="primary" @click="snow">Snow</el-button>
    <el-button type="primary" @click="router.go(-1)">back</el-button> -->
    <el-row :gutter="200">
      <el-col :span="2"><el-button type="primary" @click="basicCannon">Basic Cannon</el-button></el-col>
      <el-col :span="2"><el-button type="primary" @click="randomDirection">Random Direction</el-button></el-col>
      <el-col :span="2"><el-button type="primary" @click="realisticLook">Realistic Look</el-button></el-col>
      <el-col :span="2"><el-button type="primary" @click="fireworks">Fireworks</el-button></el-col>
      <el-col :span="2"><el-button type="primary" @click="stars">Stars</el-button></el-col>
      <el-col :span="2"><el-button type="primary" @click="snow">Snow</el-button></el-col>
      <el-col :span="2"><el-button type="primary" @click="router.go(-1)">back</el-button></el-col>
  </el-row>
  </div>
</template>

<script setup>
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import confetti from 'canvas-confetti'
const router = useRouter()
const basicCannon = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.5 },
  })
}
const randomDirection = () => {
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min
  }

  confetti({
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 70),
    particleCount: randomInRange(50, 100),
    origin: { y: 0.6 },
  })
}
const realisticLook = () => {
  var count = 200
  var defaults = {
    origin: { y: 0.7 },
  }

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    })
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  })
  fire(0.2, {
    spread: 60,
  })
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  })
}
const fireworks = () => {
  var duration = 1500 * 1000
  var animationEnd = Date.now() + duration
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min
  }

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    var particleCount = 50 * (timeLeft / duration)
    // since particles fall down, start a bit higher than random
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  }, 250)
}
const stars = () => {
  var defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
  }

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ['star'],
    })

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ['circle'],
    })
  }

  setTimeout(shoot, 0)
  setTimeout(shoot, 100)
  setTimeout(shoot, 200)
}
const snow = () => {
  console.log('snow')
  document.body.style.background = 'black'
  var duration = 1500 * 1000
  var animationEnd = Date.now() + duration
  var skew = 1

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min
  }

  ;(function frame() {
    var timeLeft = animationEnd - Date.now()
    var ticks = Math.max(200, 500 * (timeLeft / duration))
    skew = Math.max(0.8, skew - 0.001)

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: Math.random() * skew - 0.2,
      },
      colors: ['#ffffff'],
      shapes: ['circle'],
      gravity: randomInRange(0.4, 0.6),
      scalar: randomInRange(0.4, 1),
      drift: randomInRange(-0.4, 0.4),
    })

    if (timeLeft > 0) {
      requestAnimationFrame(frame)
    }
  })()
}
onBeforeRouteLeave((to, from, next) => {
  document.body.style.background = 'white'
  next()
})
</script>

<style lang="scss" scoped>
.about {
  padding: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-col {
    padding-bottom: 10px;
  }
}
</style>
