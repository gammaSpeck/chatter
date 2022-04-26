<template>
  <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
    <q-input
      class="q-ma-md"
      rounded
      standout
      v-model="searchText"
      label="Search"
      dense
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
      <template v-slot:append>
        <q-icon name="close" @click="searchText = ''" class="cursor-pointer" />
      </template>

      <template v-slot:hint> Field hint </template>
    </q-input>

    <q-list padding separator>
      <q-item v-for="i of 3" :key="i" class="q-pa-md">
        <q-item-section>
          <q-item-label overline class="text-grey">Education</q-item-label>
          <q-item-label class="text-weight-bold">
            Something amazing happened
          </q-item-label>
          <q-item-label caption> Lorem ipsum dolor sit amet. </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const rightDrawerOpen = ref(false);

const searchText = ref('');
</script>
