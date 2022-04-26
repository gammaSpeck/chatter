<template>
  <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
    <div class="col">
      <q-input
        bottom-slots
        v-model="newTweet"
        placeholder="Whats happening?"
        counter
        maxlength="280"
        autogrow
        class="new-tweet"
      >
        <template v-slot:before>
          <q-avatar size="xl">
            <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
          </q-avatar>
        </template>
      </q-input>
    </div>
    <div class="col col-shrink">
      <q-btn
        unelevated
        rounded
        color="primary"
        label="Chatter"
        no-caps
        :disable="!newTweet"
        class="q-mb-lg"
        @click="tweeted"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const newTweet = ref('');

const emit = defineEmits<{
  (e: 'tweeted', tweet: string): void;
}>();

function tweeted() {
  emit('tweeted', newTweet.value);
  newTweet.value = '';
}
</script>

<style lang="scss" scoped>
.new-tweet {
  textarea {
    font-size: 19px;
    line-height: 1.4 !important;
  }
}
</style>
