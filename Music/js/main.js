new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Jósean Log X Amoshito :3",
          artist: "ChaChaChaaa :3",
          cover:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/img/%231.jpg",
          source:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/audio/Cha-Cha-Cha.mp3",
          url: "https://instagram.com/mrs4nty",
          favorited: false
        },
        {
          name: "Yatra X Amoshito :3",
          artist: "Como Mirarte <3",
          cover:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/img/%232.jpg",
          source:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/audio/Como-Mirarte.mp3",
          url: "https://instagram.com/mrs4nty",
          favorited: false
        },
        {
          name: "Prince Royce X Amoshito :3",
          artist: "Darte Un Beso :3",
          cover:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/img/%233.jpg",
          source:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/audio/Darte-Un-Beso.mp3",
          url: "https://instagram.com/mrs4nty",
          favorited: false
        },
        {
          name: "Lalo Ebrat X Amoshito :3",
          artist: "Mocca ᵃ",
          cover:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/img/%234.jpg",
          source:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/audio/Mocca.mp3",
          url: "https://instagram.com/mrs4nty",
          favorited: false
        },
        {
          name: "Aitana X Amoshito :3",
          artist: "Mon Amour <3",
          cover:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/img/%235.png",
          source:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/audio/Mon-Amour.mp3",
          url: "https://instagram.com/mrs4nty",
          favorited: false
        },
        {
          name: "Zarcort X Amoshito :3",
          artist: "Nunca Jamas <33",
          cover:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/img/%236.png",
          source:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/audio/Nunca-Jamas.mp3",
          url: "https://instagram.com/mrs4nty",
          favorited: false
        },
        {
          name: "Ed Sheeran X Amoshito :3",
          artist: "Perfect <3",
          cover:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/img/%237.jpg",
          source:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/audio/Perfect.mp3",
          url: "https://instagram.com/mrs4nty",
          favorited: false
        },
        {
          name: "Doja Cat X Amoshito :3",
          artist: "Say So <3",
          cover:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/img/Picture.jpg",
          source:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/audio/Say-So.mp3",
          url: "https://instagram.com/mrs4nty",
          favorited: false
        },
        {
          name: "Sia X Amoshito :3",
          artist: "My Snowman <3",
          cover:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/img/%238.png",
          source:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/audio/Snowman.mp3",
          url: "https://instagram.com/mrs4nty",
          favorited: false
        },
        {
          name: "Carly Rae X Amoshito :3",
          artist: "So Call Me Maybe <3",
          cover:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/img/%239.png",
          source:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/audio/So-Call-Me-Maybe.mp3",
          url: "https://instagram.com/mrs4nty",
          favorited: false
        },
        {
          name: "Yatra X Amoshito :3",
          artist: "Tacones Rojos <3",
          cover:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/img/%2310.png",
          source:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/audio/Tacones-Rojos.mp3",
          url: "https://instagram.com/mrs4nty",
          favorited: false
        },
        {
          name: "Ed Sheeran X Amoshito :3",
          artist: "Thinking Out Loud <3",
          cover:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/img/%2311.png",
          source:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/audio/Thinking-Out-Loud.mp3",
          url: "https://instagram.com/mrs4nty",
          favorited: false
        },
        {
          name: "Reik X Amoshito :3",
          artist: "Un Añoooo <3",
          cover:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/img/%2313.png",
          source:
            "https://raw.githubusercontent.com/MrS4nty/Gift/gh-pages/Music/audio/Un-Año.mp3",
          url: "https://instagram.com/mrs4nty",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if (this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function () {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function () {
      vm.generateTime();
    };
    this.audio.onended = function () {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };
  }
});

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function viewsongs() {
  document.getElementById("player").style.display = "none";
  document.getElementById("songsxd").style.display = "block";
}

function hidesongs() {
  document.getElementById("player").style.display = "block";
  document.getElementById("songsxd").style.display = "none";
}

function startview() {
  sleep(500);
  viewsongs();
}

function starthide() {
  sleep(500);
  hidesongs();
}
