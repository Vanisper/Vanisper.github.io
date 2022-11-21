new Vue({
  el: "#app",
  data() {
    return {
      scrolled: false,
      showToc: false,
      showMenu: false,
      snippets: [],
    };
  },
  async created() {
    this.snippets = await this.getDatas();
  },
  computed: {
    text() {
      return encodeURIComponent(document.title);
    },
    url() {
      return encodeURIComponent(window.location.href);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.navOnScroll);
  },
  methods: {
    showCode(e) {
      const details = JSON.parse(e.target.dataset.details);
      const index = JSON.parse(e.target.dataset.index);
      // console.log(details);
      const dialog = document.getElementById("dialog-snippet_" + index);
      dialog.open = true;
    },
    getDatas() {
      const url = "https://apis.whisper.ink/assets/json/snippets.json";
      return new Promise((resolve, reject) => {
        fetch(url, {
          method: "GET",
          mode: "cors",
          headers: {
            // "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            XyMessage.success("获取到了代码数据");
            resolve(data);
          })
          .catch((e) => {
            XyMessage.error(e);
            reject(e);
          });
      });
    },
    oepnUrl(url) {
      window.open(url, "_blank");
    },
    navOnScroll() {
      if (window.scrollY > 20) {
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
    },
    backToUp() {
      window.scrollTo(0, 0);
    },
    shareToTwitter() {
      window.open(
        `https://twitter.com/share?text=${this.text}&url=${this.url}`,
        "_blank",
        "width=615,height=505"
      );
    },
    shareToWeibo() {
      window.open(
        `https://service.weibo.com/share/share.php?title=${this.text}&url=${this.url}`,
        "_blank",
        "width=615,height=505"
      );
    },
    shareToTelegram() {
      window.open(
        `https://telegram.me/share/url?text=${this.text}&url=${this.url}`,
        "_blank",
        "width=615,height=505"
      );
    },
  },
});
