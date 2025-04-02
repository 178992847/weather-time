<template>
  <div class="content">
    <canvas ref="canvasRef" width="200" height="200" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const canvasRef = ref(null)
const drawClock = (ctx, radius) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  drawFace(ctx, radius)
  drawTicks(ctx, radius)
  drawNumbers(ctx, radius)
  drawTime(ctx, radius)
  drawDigitalTime(ctx, radius)
}
const drawDigitalTime = (ctx, radius) => {
  const now = new Date()
  let hour = now.getHours().toString().padStart(2, '0')
  let minute = now.getMinutes().toString().padStart(2, '0')
  let second = now.getSeconds().toString().padStart(2, '0')
  ctx.font = `${radius * 0.17}px Arial`
  ctx.fillStyle = 'black'
  ctx.textAlign = 'center'
  ctx.fillText(`${hour}:${minute}:${second}`, 0, -radius * 0.6)
}

const drawFace = (ctx, radius) => {
  ctx.beginPath()
  ctx.arc(0, 0, radius, 0, 2 * Math.PI)
  ctx.fillStyle = 'white'
  ctx.fill()
  ctx.lineWidth = 1
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(0, 0, 5, 0, 2 * Math.PI)
  ctx.fillStyle = 'black'
  ctx.fill()
}

const drawNumbers = (ctx, radius) => {
  ctx.font = `${radius * 0.19}px Arial`
  ctx.fillStyle = 'red'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  for (let num = 1; num <= 12; num++) {
    const ang = (num * Math.PI) / 6
    ctx.rotate(ang)
    ctx.translate(0, -radius * 0.85)
    ctx.rotate(-ang)
    ctx.fillText(num.toString(), 0, 0)
    ctx.rotate(ang)
    ctx.translate(0, radius * 0.85)
    ctx.rotate(-ang)
  }
}

const drawTicks = (ctx, radius) => {
  for (let i = 0; i < 60; i++) {
    const ang = (i * Math.PI) / 30
    ctx.rotate(ang)
    ctx.translate(0, -radius * 0.95)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, i % 5 === 0 ? 10 : 5)
    ctx.lineWidth = i % 5 === 0 ? 2 : 1
    ctx.stroke()
    ctx.translate(0, radius * 0.95)
    ctx.rotate(-ang)
  }
}

const drawTime = (ctx, radius) => {
  const now = new Date()
  let hour = now.getHours()
  let minute = now.getMinutes()
  let second = now.getSeconds()

  hour = hour % 12
  hour = (hour * Math.PI) / 6 + (minute * Math.PI) / 360
  drawHand(ctx, hour, radius * 0.5, 6)

  minute = (minute * Math.PI) / 30 + (second * Math.PI) / 1800
  drawHand(ctx, minute, radius * 0.7, 4)

  second = (second * Math.PI) / 30
  drawHand(ctx, second, radius * 0.9, 2, 'black')
}

const drawHand = (ctx, pos, length, width, color = 'black') => {
  ctx.beginPath()
  ctx.lineWidth = width
  ctx.lineCap = 'round'
  ctx.strokeStyle = color
  ctx.moveTo(0, 0)
  ctx.rotate(pos)
  ctx.lineTo(0, -length)
  ctx.stroke()
  ctx.rotate(-pos)
}
onMounted(() => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  const radius = canvas.height / 2
  ctx.translate(radius, radius)

  setInterval(() => drawClock(ctx, radius * 0.9), 1000)
})
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
