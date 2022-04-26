<template>
  <div class="q-pa-md q-gutter-md">
    <q-list separator>
      <SingleTweet
        v-for="t in props.tweets"
        :key="t.id"
        :user-name="t.userName"
        :handle="t.handle"
        :createdAt="t.createdAt"
        :content="t.content"
        :id="t.id"
        v-bind="$attrs"
      />
    </q-list>
  </div>
</template>

<script setup lang="ts">
import SingleTweet from './SingleTweet.vue';

const props = withDefaults(defineProps<{ tweets: any[] }>(), {
  tweets: () => [],
});
</script>
