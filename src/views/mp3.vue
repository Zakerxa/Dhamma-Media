<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-7 pt-4 p-1 pb-3">
        <h6 class="p-3 bg-warning" style="border-radius: 15px">
          {{ mp3.title }}
        </h6>
      </div>

      <div class="col-12 text-center col-md-7 col-lg-7">
        <img :src="img" class="w-50" alt="" />
      </div>

      <div class="col-12 col-md-8 col-lg-6 text-center pt-4 pb-4 p-0">
        <!-- <audio controls autoplay style="width:100%;">
               <source :src="mp3.url" :type="'audio/'+mp3.type" data-track-number="1">
               Your browser does not support the audio tag.
             </audio> -->

        <div class="audio-player m-0">
          <div class="timeline">
             <input id="seekslider" class="w-100 progress col-12 p-0 m-0" type="range" min="1" max="100" value="0" style="opacity: 0.8;">
          </div>

          <div class="controls">
             <audio id="audio" autoplay style="width:100%;">
               <source :src="mp3.url" :type="'audio/'+mp3.type" data-track-number="1">
               Your browser does not support the audio tag.
            </audio>

            <div class="play-container">
              <div @click="playbtn()" class="toggle-play fas" :class="{'fa-pause': play,'fa-play' : pause }"></div>
            </div>

            <div class="time">
              <div class="current">0:00</div>
              <div class="divider">/</div>
              <div class="length"></div>
            </div>

            <div class="name w-50" style="z-index:0;">
                <marquee direction="left" truespeed="10" > {{mp3.title}}</marquee>
            </div>

             <div class="volume-container">
               <div @click="volume()" class="fas volume-button" :class="{'fa-volume-up': up,'fa-volume-mute' : mute }"></div>
             </div>

          </div>

        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
export default {
  name: "mp3",
  data() {
    return {
      mp3: [],
      img: "",
      playlist: [],
      audioPlayer: "",
      audio:"",
      up : true,
      mute : false,
      play : true,
      pause: false
    };
  },
  methods:{
    playbtn(){
       if (this.audio.paused) {
          this.audio.play();
          this.play = true;
          this.pause = false;
        } else {
          this.audio.pause();
          this.play = false;
          this.pause = true;
        }
    },
    volume(){
       const volumeEl = this.audioPlayer.querySelector(".volume-container .volume");
        this.audio.muted = !this.audio.muted;
        if (this.audio.muted) {
           this.up = false;
           this.mute = true;
        } else {
          this.up = true;
           this.mute = false;
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
    const id = this.$route.query.id;
    const titleid = this.$route.query.title;
    const mp3 = this.$route.query.mp3;

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

    this.audio = document.getElementById("audio")

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

    .time {
      display: flex;

      > * {
        padding: 2px;
      }
    }
    .volume-container {
      cursor: pointer;
      .volume-button {
        height: 46px;
        font-size: 17px;
        display: flex;
        align-items: center;
      }
      position: relative;
      z-index: 2;

    }
  }
}

</style>
