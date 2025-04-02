<template>
  <div class="weather">
    <div class="current-weather" v-loading="loading">
      <div class="location">{{ weatherInfo.city }}</div>
      <div class="tempetate">{{ weatherInfo.temp }}</div>
      <div class="windy">{{ weatherInfo.weather }}</div>
      <div class="time">
        <div>更新时间</div>
        {{ weatherInfo.last_update }}
      </div>
      <div class="btn">
        <div class="refresh" @click="getWeather">
          <el-icon><RefreshLeft /></el-icon>
        </div>
        <div class="rain" @click="paperSnow">
          <el-icon><Orange /></el-icon>
        </div>
        <div class="rain" @click="handleSnows">
          <el-icon><Drizzling /></el-icon>
        </div>
      </div>
    </div>
    <div class="weather-container">
      <!-- <div class="weather-day" v-for="(item, index) in days" :key="index">
        <div class="day">{{ item.day }}</div>
        <div class="date">{{ item.date }}</div>
        <div class="weather-icon">{{ item.weather }}</div>
        <div class="temperature">{{ item.temp }}</div>
        <div class="details">
          <span>{{ item.details[0] }}</span>
          <span>{{ item.details[1] }}</span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Snows from '@/utils/snow'
import axios from 'axios'
import confetti from 'canvas-confetti'
const loading = ref(false)
const weatherInfo = reactive({
  city: '-',
  temp: '-',
  weather: '-',
  last_update: '-',
})
const getWeather = () => {
  loading.value = true
  const key1 = 'S56UlQeUrXuEfB0AK' // 免费版
  // const key2 = 'St4My21wBlsREUIQR' // 试用版
  const location = 'Guangzhou'
  const url = `https://api.seniverse.com/v3/weather/now.json?key=${key1}&location=${location}&language=zh-Hans&unit=c`
  axios.get(url).then((res) => {
    // console.log('res', res)
    const result = res.data.results[0]
    if (result) {
      const {
        now: { text, temperature },
        location: { name },
        last_update,
      } = result
      weatherInfo.city = name
      weatherInfo.temp = `${temperature}°`
      weatherInfo.weather = text
      weatherInfo.last_update = new Date(last_update).toLocaleString().replaceAll('/', '-')
      loading.value = false
    } else {
      console.error('未找到天气数据')
    }
  })
}
const paperSnow = () => {
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
const handleSnows = () => {
  new Snows({
    isRain: false,
    num: 50,
    maxSpeed: 15
})
}
onMounted(() => {
  getWeather()
  paperSnow()
})
// const days = reactive([
//   { day: '星期一', date: '8号', weather: '晴', temp: '20°', details: ['湿度: 50%', '风力: 3级'] },
//   { day: '星期二', date: '9号', weather: '多云', temp: '18°', details: ['湿度: 60%', '风力: 2级'] },
//   { day: '星期三', date: '10号', weather: '阴', temp: '16°', details: ['湿度: 70%', '风力: 1级'] },
//   {
//     day: '星期四',
//     date: '11号',
//     weather: '小雨',
//     temp: '14°',
//     details: ['湿度: 80%', '风力: 0级'],
//   },
//   {
//     day: '星期五',
//     date: '12号',
//     weather: '多云',
//     temp: '12°',
//     details: ['湿度: 75%', '风力: 1级'],
//   },
//   { day: '星期六', date: '13号', weather: '晴', temp: '10°', details: ['湿度: 85%', '风力: 2级'] },
//   {
//     day: '星期日',
//     date: '14号',
//     weather: '多云',
//     temp: '12°',
//     details: ['湿度: 75%', '风力: 1级'],
//   },
// ])
</script>

<style lang="scss" scoped>
.weather {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 93vh;
  margin: 10px 0;
  background: url('@/assets/weather.jpg') no-repeat center center / cover;
  .current-weather {
    position: relative;
    width: 200px;
    height: 300px;
    background: rgba(255, 255, 255, 0.2); /* 半透明背景 */
    backdrop-filter: blur(10px); /* 毛玻璃模糊 */
    -webkit-backdrop-filter: blur(10px); /* 兼容 Safari */
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: lighter;
    .location {
      font-size: 30px;
    }
    .tempetate {
      font-size: 88px;
    }
    .windy {
      font-size: 20px;
    }
    .time {
      margin-top: 10px;
      font-size: 18px;
      display: flex;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      div{
        margin-bottom: 5px;
      }
    }
    .btn {
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      flex-direction: column;
      div {
        cursor: pointer;
      }
    }
  }
  .weather-container {
    display: flex;
    gap: 10px;
    .weather-day {
      background-color: #a3cffa;
      border-radius: 15px;
      width: 100px;
      height: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      .weather-day.yellow {
        background-color: #f7e08e;
      }

      .weather-day.dark {
        background-color: #4a6fa5;
        color: white;
      }

      .day {
        font-size: 14px;
        font-weight: bold;
      }

      .date {
        font-size: 12px;
      }

      .weather-icon {
        font-size: 40px;
        /* 模拟图标大小 */
        height: 50px;
      }

      .temperature {
        font-size: 24px;
        font-weight: bold;
      }

      .details {
        font-size: 12px;
        text-align: center;
      }

      .details span {
        display: block;
      }
    }
  }
}
</style>
