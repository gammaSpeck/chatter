<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <NewTweet @tweeted="addNewTweet" />
      <q-separator size="10px" color="grey-2" class="divider" />
      <!-- <TweetList :tweets="tweets" /> -->
      <div class="q-pa-md q-gutter-md">
        <q-list separator>
          <transition-group
            appear
            enter-active-class="animated fadeIn slow"
            leave-active-class="animated fadeOut slow"
          >
            <SingleTweet
              v-for="t in tweets"
              :key="t.id"
              :user-name="t.userName"
              :handle="t.handle"
              :createdAt="t.createdAt"
              :content="t.content"
              :id="t.id"
              :liked="t.liked"
              @deleted="deleteTweet"
              @hearted="updateTweetLikeStatus"
            />
          </transition-group>
        </q-list>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script setup lang="ts">
import {
  query,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

import { onMounted, ref } from 'vue';
import NewTweet from 'components/tweets/NewTweet.vue';
import SingleTweet from 'components/tweets/SingleTweet.vue';
import { TweetsCollection, db } from 'boot/firebase';

import { FirestoreTweet } from 'src/interfaces';

const tweets = ref<FirestoreTweet[]>([]);

onMounted(async () => {
  const q = query(TweetsCollection);
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      const { type, doc } = change;

      if (type === 'added') {
        const newTweet = { id: doc.id, ...doc.data() } as FirestoreTweet;
        tweets.value.unshift(newTweet);
      }

      if (type === 'modified') {
        const index = tweets.value.findIndex((t) => t.id === doc.id);
        const modifiedTweet = { id: doc.id, ...doc.data() } as FirestoreTweet;
        Object.assign(tweets.value[index], modifiedTweet);
      }

      if (type === 'removed') {
        const tweetId = doc.id;
        tweets.value = tweets.value.filter((t) => t.id !== tweetId);
      }
    });
  });
});

async function addNewTweet(newTweet: string) {
  await addDoc(TweetsCollection, {
    content: newTweet,
    userName: 'Madhu KM',
    handle: 'gammaparticle',
    createdAt: Date.now().toString(),
    liked: false,
  });
}

async function deleteTweet(tweetId: string) {
  await deleteDoc(doc(db, 'tweets', tweetId));
}

async function updateTweetLikeStatus(tweet: FirestoreTweet) {
  const { id, ...rest } = tweet;
  const tweetDocRef = doc(db, 'tweets', id);
  await updateDoc(tweetDocRef, { ...rest });
}
</script>

<style lang="scss" scoped>
.divider {
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: $grey-4;
}
</style>
