<template>
  <div
    class="banner-swiper-wrapper flex f-jc-c"
    v-if="banner_list && banner_list.length > 0"
  >
    <div class="swiper-container">
      <div class="swiper-wrapper flex">
        <a
          class="swiper-slide f-fixed"
          :style="{ boxShadow: `0 13px 40px -15px ${item.poster_main_color}` }"
          v-for="item in banner_list"
          :key="item.id"
          :data-link="item.link_url"
        >
          <img class="poster" :src="item.poster_url" alt="" />
          <div class="name-wrapper">
            <div class="name">{{ item.name }}</div>
            <div class="score flex">
              <div class="star-wrapper">
                <rate-component :score="item.program_score"></rate-component>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import RateComponent from "@/components/Rate";
import Swiper from "swiper";
export default {
  name: "BannerSwiperComponent",
  components: {
    RateComponent
  },
  props: {
    banner_list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    this.shrink_scale = 0.93; // 两边缩放
    this.body_width = Math.floor(document.body.getBoundingClientRect().width);
    this.core_x = this.body_width / 2;
    return {
      touch_move_timer: null,
      k: 0,
      b: 1,
      sideSlide_x_abs: 0,
      realIndex: 0,
      swiper: null,
      slide_doms: []
    };
  },
  deactivated() {
    this.swiper.slideToLoop(this.realIndex, 0);
    this.swiper.autoplay.stop();
  },
  activated() {
    this.swiper.autoplay.start();
  },
  mounted() {
    // 初始化 swiper
    this.swiper = new Swiper(".swiper-container", {
      loop: true,
      direction: "horizontal",
      loopedSlides: 2,
      speed: 500,
      autoplay: {
        disableOnInteraction: false,
        delay: 4000
      },
      on: {
        slideChangeTransitionEnd: this.handleSlideEnd,
        touchMove: this.handleTouchMove
      }
    });
    // 保存所有 slide 的引用
    const allSlideDom = document.getElementsByClassName("swiper-slide");
    for (let dom of allSlideDom) {
      this.slide_doms.push(dom);
    }
    // 获取 两侧的 slide 的 x 值
    this.sideSlide_x_abs = this.getSideSlideX();
    // 计算 k
    this.k = (this.shrink_scale - this.b) / this.sideSlide_x_abs;
    // 根据 slide 位置决定其 缩放多少
    this.setAllSlidesScale();
  },
  methods: {
    handleTouchMove() {
      clearTimeout(this.touch_move_timer);
      this.touch_move_timer = setTimeout(() => {
        this.setAllSlidesScale();
      }, 10);
    },
    getScale(x) {
      // y = kx + b
      // b = 1 because f(0) = 1;
      // k = (this.shrink_scale - 1) / this.sideSlide_x_abs because f(this.sideSlide_x_abs) = this.shrink_scale
      return this.k * x + this.b;
    },
    getSideSlideX() {
      const core_x = this.core_x;
      for (let slide of this.slide_doms) {
        const { isInView, left, right } = this.slideIfInView(slide);
        if (isInView) {
          const slide_core_x = (left + right) / 2;
          const distance = Math.abs(slide_core_x - core_x);
          return distance;
        }
      }
    },
    slideIfInView(slide) {
      // slide 是否在视口
      let { left, right } = slide.getBoundingClientRect();
      left = Math.ceil(left);
      right = Math.ceil(right);
      // 避免多次 使用该接口，返回left, right
      return {
        isInView: !(right < 0 || left > this.body_width),
        left,
        right
      };
    },
    setAllSlidesScale() {
      // 获取 body 中心位置
      const core_x = this.core_x;
      this.slide_doms.forEach(slide => {
        this.slideIfInView(slide);
        const { isInView, left, right } = this.slideIfInView(slide);
        // 若在视口 才缩放
        if (isInView) {
          const slide_core_x = (left + right) / 2;
          const x = Math.abs(slide_core_x - core_x);
          const scale = this.getScale(x).toFixed(2);
          slide.style.transform = `scale(${scale}, ${scale})`;
        }
      });
    },
    handleSlideEnd() {
      if (!this.swiper) {
        // mounted 之前会调用一次
        return;
      }
      // 由于 会出现两次 realIndex = 0 所有判断一下
      if (this.realIndex !== this.swiper.realIndex) {
        this.realIndex = this.swiper.realIndex;
        clearTimeout(this.touch_move_timer);
        this.touch_move_timer = setTimeout(() => {
          this.setAllSlidesScale();
        }, 10);
        this.$emit("handleSlideEnd", this.realIndex);
      }
    }
  }
};
</script>

<style scoped lang="less">
.banner-swiper-wrapper {
  width: 375px;
  height: 100%;
  .swiper-container {
    width: 339px;
    height: 100%;
    .swiper-wrapper {
      .swiper-slide {
        position: relative;
        width: 339px;
        height: 150px;
        border-radius: 13px;
        overflow: hidden;
        transition: 0.2s;
        .name-wrapper {
          position: absolute;
          left: 0;
          bottom: 0;
          padding: 0 5%;
          width: 90%;
          height: 50px;
          .name {
            margin-top: 5px;
            width: 100%;
            height: 20px;
            color: whitesmoke;
            font-size: 15px;
            font-weight: bold;
          }
          .score {
            width: 50%;
            height: 30px;
            .star-wrapper {
              width: 100%;
              height: 100%;
            }
          }
        }
        .poster {
          width: 100%;
        }
      }
    }
  }
}
</style>
