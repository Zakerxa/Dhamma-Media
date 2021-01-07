<template>
  <div class="container">
    <div class="row justify-content-center pt-2">
      <div class="col-9 text-center pr-0">
        <b-form-input
          @keydown="search()"
          v-model="title"
          size="sm"
          class="my-2"
          style="height: 40px"
          placeholder="တရားနာမည် ဖြင့်ရှာမည်"
        ></b-form-input>
      </div>
      <div class="col-2 text-center pl-2 pr-0">
        <b-button
          size="sm"
          class="my-2 pl-4 pr-4 bg-info"
          style="height: 40px"
          @click="search()"
          ><i class="fa fa-search"></i
        ></b-button>
      </div>
      <div class="col-1"></div>
    </div>

    <div class="row justify-content-center pb-5 p-2">
      <div class="col-12 pt-4 pb-3">
        <h5 class="font-weigh-bold mb-0">{{ path.title }}</h5>
      </div>

      <div class="col-12 text-center pt-2">
        <h5>
          ( စုစုပေါင်း အရေအတွက်
          <span class="badge badge-success">{{ playlist.length }}</span> )
        </h5>
      </div>

      <div
        @click="player(index)"
        class="col-12 col-md-5 offset-md-1 col-lg-3 card bg  mt-3 shadow pt-2 pb-2"
        style="border-radius: 15px; text-decoration: none"
        v-for="(item, index) in playlist"
        :key="index"
      >
        <div
          class="row d-flex align-items-center justify-content-center"
          style="min-height: 10vh"
        >
          <div class="text-center col-2 col-md-3 d-flex align-items-center">
            <img src="../assets/symbol.png" class="w-100 pt-2" alt="" />
          </div>
          <div class="col-10 col-md-9">
            <p class="m-0">{{ item.title }}</p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-show="playpopup"
      class="audio-player row m-0 position-fixed w-100"
      style="z-index: 9999; bottom: -2px; left: 0"
    >
      <div
        class="name col-12 w-100 pl-2 mt-1 pt-2 position-relative"
        style="z-index: 0"
      >
        <marquee direction="left" truespeed="10"> {{ mp3.title }}</marquee>
      </div>

      <div class="timeline mt-4 pt-2">
        <input
          id="seekslider"
          class="w-100 progress col-12 p-0 m-0"
          type="range"
          min="1"
          max="100"
          value="0"
          style="opacity: 0.8; height: 4px"
        />
      </div>

      <div class="controls pb-2">
        <audio id="audio" autoplay style="width: 100%">
          <source
            v-for="(item, index) in playlist"
            :key="index"
            :src="mp3.url"
            :type="'audio/' + mp3.type"
            :data-track-number="index + 1"
          />
          Your browser does not support the audio tag.
        </audio>

        <div class="time pt-1" style="font-size: 14px">
          <div class="current">0:00</div>
          <div class="divider">/</div>
          <div class="length"></div>
        </div>

        <div class="play-container position-absolute w-100 pr-4 pt-1 mt-2">
          <div class="mr-4 pt-1">
            <i @click="backward()" class="fas fa-backward"></i>
          </div>

          <div @click="playbtn()">
            <i
              class="fas pt-2"
              :class="{ 'fa-pause': play, 'fa-play': pause }"
            ></i>
          </div>

          <div class="ml-4 pt-1">
            <i @click="forward()" class="fas fa-forward"></i>
          </div>
        </div>

        <div class="volume-container pt-1 pr-3">
          <div
            @click="volume()"
            class="fas volume-button"
            :class="{ 'fa-volume-up': up, 'fa-volume-mute': mute }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var isChrome =
  /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
export default {
  name: "path",
  data() {
    return {
      path: [],
      id: null,
      titleid: null,
      title: "",
      main: [],
      playlist: [],
      mp3: [],
      audioPlayer: "",
      audio: "",
      up: true,
      mute: false,
      play: true,
      pause: false,
      playpopup: false,
      yit: "",
    };
  },
  methods: {
    search() {
      const api = require("../api/api.json");
      const path = this.path;
      this.playlist = path.source.filter((res) => {
        return res.title.includes(this.title);
      });
    },
    player(index) {
      this.audio = document.getElementById("audio");
      this.playpopup = true;
      this.mp3 = this.path.source[index];
      this.audio.load();
      this.yit = index;
    },
    playbtn() {
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
    backward() {
      if (this.yit > 0) {
        this.player(this.yit - 1);
      } else {
        console.log("Can't Back");
      }
    },
    forward() {
      if (this.yit < this.playlist.length - 1) {
        this.player(this.yit + 1);
      } else {
        console.log("Can't Next");
      }
    },
    volume() {
      const volumeEl = this.audioPlayer.querySelector(
        ".volume-container .volume"
      );
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
    },
  },
  mounted() {
    const api = require("../api/api.json");
    this.id = this.$route.query.id;
    this.titleid = this.$route.query.title;
    // console.log(this.$route.query.title);

    const main = api.mp3.find((res) => {
      return res.id == this.id;
    });

    this.path = main.dhamma.find((res) => {
      return res.id == this.titleid;
    });

    this.playlist = this.path.source;

    // Listen MP3

    // this.audioPlayer = this.$el.querySelectorAll("audio")[0];

    this.audio = document.getElementById("audio");

    this.audioPlayer = document.querySelector(".audio-player");
    this.seekslider = document.getElementById("seekslider");
    this.seekslider.addEventListener("change", this.audioSeek, false);
    this.audio.addEventListener("timeupdate", this.audiotime, false);

    // console.dir(this.audio);

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
};
</script>

<style lang="scss">
.audio-player {
  background-image: linear-gradient(
    to right,
    #2b5876 0%,
    #4e4376 51%,
    #2b5876 100%
  );
}
.audio-player {
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  display: block;
}
.audio-player:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}

.audio-player {
  height: 99px;
  width: 100%;

  box-shadow: 0 0 20px 0 #000a;

  font-family: arial;
  color: white;
  font-size: 0.75em;
  overflow: hidden;
  display: grid;
  grid-template-rows: 6px auto;

  .progress {
    cursor: pointer;
    width: 0%;
    height: 100%;
    transition: width 0.25s, transform 0.25s;
  }

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    padding: 0 15px;

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
    .play-container {
      font-size: 17px;
      margin-right: 20px;
    }
  }
}
input[type="range"] {
  overflow: hidden;
  -webkit-appearance: none;
  background-color: rgba(235, 235, 235, 0.466);
  border-radius: 7px;
  transition: all 0.25s;
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 4px;
  -webkit-appearance: none;
  color: #55d;
  margin-top: -1px;
  cursor: pointer;
  transition: all 0.25s;
}

input[type="range"]::-webkit-slider-thumb {
  width: 5px;
  -webkit-appearance: none;
  height: 10px;
  cursor: pointer;
  background: #0df;
  box-shadow: -1200px 0 0 1200px #04f;
  transition: all 0.25s;
}
</style>
