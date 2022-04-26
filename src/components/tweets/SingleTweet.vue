<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar>
        <img :src="props.avatar" />
      </q-avatar>
    </q-item-section>

    <q-item-section top>
      <q-item-label class="text-subtitle1">
        <strong>{{ props.userName }}</strong>
        <span class="text-grey-7">
          @{{ props.handle }}
          <br class="lt-md" />
          &bull; {{ relativeDate }} ago
        </span>
      </q-item-label>

      <q-item-label class="tweet-content text-body1">
        {{ props.content }}
      </q-item-label>

      <div class="row justify-between q-mt-sm tweet-icons">
        <q-btn flat round color="grey" icon="far fa-comment" />
        <q-btn flat round color="grey" icon="fas fa-retweet" />
        <q-btn
          flat
          round
          :color="props.liked ? 'pink' : 'grey'"
          :icon="props.liked ? 'fas fa-heart' : 'far fa-heart'"
          @click="hearted"
        />
        <q-btn flat round color="grey" icon="fas fa-trash" @click="deleted" />
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { formatDistance } from 'date-fns';
import { FirestoreTweet } from 'src/interfaces';
import { computed } from 'vue';

interface Props {
  id: string;
  userName: string;
  handle: string;
  content?: string;
  createdAt: string;
  avatar?: string;
  liked?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque
        corrupti quo exercitationem ipsam alias harum, vel facilis unde fuga.
        Exercitationem vel facere harum modi, non officia id ullam totam
        nostrum?`,
  avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
  liked: false,
});

const emit = defineEmits<{
  (e: 'deleted', tweetId: string): void;
  (e: 'hearted', tweet: FirestoreTweet): void;
}>();

const relativeDate = computed(() =>
  formatDistance(new Date(parseInt(props.createdAt)), new Date())
);

function deleted() {
  emit('deleted', props.id);
}
function hearted() {
  const { userName, liked, content, createdAt, id, handle } = props;
  emit('hearted', { userName, content, createdAt, id, handle, liked: !liked });
}
</script>

<style scoped lang="scss">
.tweet-content {
  white-space: pre-line; // this will show all new lines as is
}
.tweet-icons {
  margin-left: -5px;
}
</style>
