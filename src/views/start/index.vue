<template>
  <div>
    <iframe src="static/index.html" style="height: 740px; width: 100%"></iframe>
  </div>
</template>

<script scoped>
import router from '@/router'

export default {
  components: {},
  mounted() {
    this.init()
  },
  methods: {
    enter() {
      router.push('/login')
    },
    init() {
      const background = document.querySelector('.background')
      document.addEventListener('scroll', () => {
        const scrollY = window.scrollY
        if (scrollY !== 0) {
          background.style.backgroundPosition = `calc(50% + ${scrollY}px) calc(50% + ${scrollY}px)`
        } else {
          background.style.backgroundPosition = ''
        }
      })
    }
  }
}

</script>

<style scoped>
.big-body {
  margin: 0;
  padding: 0;
  height: 200vh;
  overflow-x: hidden;
}

.background {
  background-image: url("../../assets/mountainrange.jpg");
  background-size: cover;
  background-position: 50% 50%;
  height: 200vh;
  font: 1000 32rem '';
  line-height: 35vh;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  text-align: center;
  overflow: hidden;
}

.background::before {
  content: '';
  background-size: cover;
  background-image: inherit;
  background-position: 50% 50%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -99;
}
.enterbutton{
  background: rgba(225, 143, 143, 0);
  color: white;
  font: 400 6rem '';
  border: 0;
}
.enterbutton:hover{
  background: rgba(46, 48, 59, 0.1);
  color: rgba(227, 227, 227, 0.8);
}

.style1 {
  position: absolute;
  text-align: center;
  width: 100%;
  font: 600 9rem '';
  letter-spacing: 10px;
  color: #fff;
}

.style2 {
  position: absolute;
  letter-spacing: 2px;
  text-align: center;
  top: 130vh;
  width: 80%;
  color: #fff;
  left: 50%;
  transform: translateX(-50%);
  font: 400 2rem '';
  padding: 30px;
  background-color: rgba(0, 0, 0, 0);
}
.style3 {
  position: absolute;
  letter-spacing: 2px;
  top: 140vh;
  width: 80%;
  color: #fff;
  left: 50%;
  transform: translateX(-50%);
  font: 400 2rem '';
  padding: 30px;
  background-color: rgba(0, 0, 0, .3);
}
</style>
