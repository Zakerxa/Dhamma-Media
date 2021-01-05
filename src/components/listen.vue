<template>
  <div class="">
    {{ path }}
     <div class="audio-player m-0">

          <div class="timeline">
             <input id="seekslider" class="w-100 progress col-12 p-0 m-0" type="range" min="1" max="100" value="0" style="opacity: 0.8;">
          </div>
          <div class="controls">
            <div class="play-container">
              <div @click="playbtn()" class="toggle-play play"></div>
            </div>
            <div class="time">
              <div class="current">0:00</div>
              <div class="divider">/</div>
              <div class="length"></div>
            </div>
            <div class="name">Music Song</div>
            <!--     credit for icon to https://saeedalipoor.github.io/icono/ -->

              <div class="">
                <div @click="volume()" class="fas fa-volume-up"></div>
              </div>

          </div>
        </div>
  </div>
</template>

<script>
export default {
  name: "listen",
  data() {
    return {
      mp3: [],
      img: "",
      playlist: [],
      audioPlayer: "",
      audio:""
    };
  },
  methods:{
    playbtn(){
       if (this.audio.paused) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
    },
    volume(){
       const volumeEl = this.audioPlayer.querySelector(".volume-container .volume");
        this.audio.muted = !this.audio.muted;
        if (this.audio.muted) {

        } else {

        }
    },
     audioSeek() {
            var seekto = this.audio.duration * (this.seekslider.value / 100);
            this.audio.currentTime = seekto;
       },
      audiotime() {
          const nt = this.audio.currentTime * (100 / this.audio.duration);
          this.seekslider.value = nt;
      }
  },
  mounted() {
    const api = require("../api/api.json");
    const id = this.id;
    const titleid = this.title;
    const mp3 = this.mp3;

    const main = api.mp3.find((res) => {
      return res.id == id;
    });

    this.img = main.photo;

    const final = main.dhamma.find((res) => {
      return res.id == titleid;
    });

    this.playlist = final.source;
    this.mp3 = final.source[mp3];
     console.log(final.source[mp3])
    // this.audioPlayer = this.$el.querySelectorAll("audio")[0];

    this.audio = new Audio(final.source[mp3].url);

    this.audioPlayer = document.querySelector(".audio-player");
    this.seekslider = document.getElementById("seekslider");
    this.seekslider.addEventListener("change", this.audioSeek, false);
    this.audio.addEventListener("timeupdate", this.audiotime, false);
    //credit for song: Adrian kreativaweb@gmail.com

    console.dir(this.audio);

    this.audio.addEventListener(
      "loadeddata",
      () => {
        this.audioPlayer.querySelector(
          ".time .length"
        ).textContent = getTimeCodeFromNum(this.audio.duration);
      },
      false
    );

    //check audio percentage and update time accordingly
    setInterval(() => {
      const progressBar = this.audioPlayer.querySelector(".progress");
      progressBar.style.width =
        (this.audio.currentTime / this.audio.duration) * 100 + "%";
      this.audioPlayer.querySelector(
        ".time .current"
      ).textContent = getTimeCodeFromNum(this.audio.currentTime);
    }, 500);

    //toggle between playing and pausing on button click


    //turn 128 seconds into 2:08
    function getTimeCodeFromNum(num) {
      let seconds = parseInt(num);
      let minutes = parseInt(seconds / 60);
      seconds -= minutes * 60;
      const hours = parseInt(minutes / 60);
      minutes -= hours * 60;

      if (hours === 0)
        return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
      return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
      ).padStart(2, 0)}`;
    }
  },
  components: {},
  props:{
    id : String,
    title:String,
    mp3:String

  }
};
</script>
<style lang="scss">




.audio-player {
  height: 70px;
  width: 100%;
  background: #444;
  box-shadow: 0 0 20px 0 #000a;

  font-family: arial;
  color: white;
  font-size: 0.75em;
  overflow: hidden;

  display: grid;
  grid-template-rows: 6px auto;
  .timeline {
    background: white;
    width: 100%;
    position: relative;
    cursor: pointer;
    box-shadow: 0 2px 10px 0 #0008;
    .progress {
      background: coral;
      width: 0%;
      height: 100%;
      transition: 0.25s;
    }
  }
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    padding: 0 20px;

    > * {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .toggle-play {
      &.play {
        cursor: pointer;
        position: relative;
        left: 0;
        height: 0;
        width: 0;
        border: 7px solid #0000;
        border-left: 13px solid white;
        &:hover {
          transform: scale(1.1);
        }
      }
      &.pause {
        height: 15px;
        width: 20px;
        cursor: pointer;
        position: relative;
        &:before {
          position: absolute;
          top: 0;
          left: 0px;
          background: white;
          content: "";
          height: 15px;
          width: 3px;
        }
        &:after {
          position: absolute;
          top: 0;
          right: 8px;
          background: white;
          content: "";
          height: 15px;
          width: 3px;
        }
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    .time {
      display: flex;

      > * {
        padding: 2px;
      }
    }
    .volume-container {
      cursor: pointer;
      .volume-button {
        height: 26px;
        display: flex;
        align-items: center;
        .volume {
          transform: scale(0.7);
        }
      }

      position: relative;
      z-index: 2;
      .volume-slider {
        position: absolute;
        left: -3px; top: 15px;
        z-index: -1;
        width: 0;
        height: 15px;
        background: white;
        box-shadow: 0 0 20px #000a;
        transition: .25s;
        .volume-percentage {
          background: coral;
          height: 100%;
          width: 75%;
        }
      }
      &:hover {
        .volume-slider {
          left: -123px;
          width: 120px;
        }
      }
    }
  }
}

</style>
