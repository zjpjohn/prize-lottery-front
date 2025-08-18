<template>
  <div style="margin: 48px 32px 0 32px;display: flex;justify-content: center">
    <div v-if="detail" style="width: 1100px">
      <div>
        <h1>{{ detail.title }}</h1>
      </div>
      <div>
        <div v-for="(item,index) in detail.content.paragraphs" :key="'skill_content_'+index">
          <img :src="item.content" alt="" v-if="item.type===2">
          <p v-if="item.type===1">{{ item.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {skillDetail} from "../../api/lotto-service";

export default {
  name: "LottoSkillDetailView",
  data() {
    return {
      detail: null,
    };
  },
  methods: {
    lottoSkillDetail() {
      skillDetail(this.$route.params.seq).then(data => this.detail = data);
    }
  },
  mounted() {
    this.lottoSkillDetail();
  }
}
</script>

<style scoped>

</style>
