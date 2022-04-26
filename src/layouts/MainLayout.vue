<template>
  <q-layout view="lhr lpr fFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bold">
          <span class="gt-sm">{{ $route.name }}</span>
          <q-icon
            name="fa-solid fa-dove"
            size="sm"
            color="primary"
            class="lt-md q-pa-md absolute-center"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :width="283"
    >
      <q-icon
        name="fa-solid fa-dove"
        size="lg"
        color="primary"
        class="q-pa-md"
      />

      <q-list>
        <q-item clickable to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">Home</q-item-section>
        </q-item>

        <q-item clickable to="/about" exact>
          <q-item-section avatar>
            <q-icon name="help" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">
            About
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <RightDrawer />

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import RightDrawer from 'layouts/RightDrawer.vue';

import { ref } from 'vue';
const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
