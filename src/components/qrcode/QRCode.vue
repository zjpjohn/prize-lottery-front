<template>
  <div style="display: flex;flex-direction: column;align-items: center;justify-content: center">
    <div ref="qr_content" class="qrcode" :style="{width:width+'px',height:height+'px'}">
      <div class="logo" :style="outerStyle" style="display: flex;align-items: center;justify-content: center"
           v-if="logo!=null&&logo.trim().length>0">
        <img :src="logoSrc" :style="imgStyle" crossorigin="anonymous" alt=""/>
      </div>
      <div ref="qrCodeUri" id="qrcode"></div>
    </div>
    <div style="margin-top: 24px">
      <el-button type="primary" style="width: 140px;text-align: center" @click="saveQrCode">下载保存二维码</el-button>
    </div>
  </div>
</template>

<script>

import QRCode from 'qrcodejs2';
import html2canvas from "html2canvas";

export default {
  name: "QrCode",
  props: {
    text: {
      type: String,
      default: '',
    },
    downloadName: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 70,
    },
    height: {
      type: Number,
      default: 70,
    },
    logo: {
      type: String,
      default: '',
    },
    logoSize: {
      type: Number,
      default: 30,
    },
    radius: {
      type: Number,
      default: 0,
    },
    margin: {
      type: Number,
      default: 5,
    },
    color: {
      type: String,
      default: '#000000'
    },
    background: {
      type: String,
      default: '#ffffff'
    },
  },
  data() {
    return {
      imgStyle: {
        width: this.logoSize + 'px',
        height: this.logoSize + 'px',
        borderRadius: this.radius + 'px',
      },
      outerStyle: {
        background: this.background,
        width: this.logoSize + this.margin * 2 + 'px',
        height: this.logoSize + this.margin * 2 + 'px',
        marginTop: '-' + (this.logoSize / 2 + this.margin) + 'px',
        marginLeft: '-' + (this.logoSize / 2 + this.margin) + 'px',
      },
    };
  },
  computed: {
    logoSrc() {
      return this.logo + '?timestamp=' + new Date().valueOf();
    },
  },
  methods: {
    createQrCode() {
      document.getElementById('qrcode').innerHTML = '';
      let qrcode                                  = new QRCode(this.$refs.qrCodeUri, {
        text: this.text,
        width: this.width,
        height: this.height,
        colorDark: this.color,
        colorLight: this.background,
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
    saveQrCode() {
      let width               = this.$refs.qr_content.style.width;
      let cloneDom            = this.$refs.qr_content.cloneNode(true);
      cloneDom.style.position = 'absolute';
      cloneDom.style.top      = '0px';
      cloneDom.style.zIndex   = '-1';
      cloneDom.style.width    = width;
      document.body.appendChild(cloneDom);
      let lastIndex = this.text.lastIndexOf("/");
      let name      = this.downloadName;
      if (name == null || name.trim().length === 0) {
        name = this.text.substring(lastIndex + 1, this.text.length);
      }
      html2canvas(cloneDom, {
        useCORS: true,
        allowTaint: true,
      }).then(canvas => {
        let imgUri    = canvas.toDataURL('image/png');
        let link      = document.createElement('a');
        link.href     = imgUri;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
      cloneDom.style.display = 'none';
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.createQrCode();
    });
  },
  watch: {
    url: {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.createQrCode();
        }
      }
    },
    logo: {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.createQrCode();
        }
      }
    }
  },
}
</script>

<style scoped>
.qrcode {
  display: inline-block;
  position: relative;
}

.logo {
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>