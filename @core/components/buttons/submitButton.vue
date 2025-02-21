<script lang="ts" setup>
import { useRouter } from 'vue-router'

interface Props {
  content: string
  to?: string
}

const props = defineProps<Props>()
const router = useRouter()

const handleClick = () => {
  if (props.to) {
    router.push(props.to)
  }
}
</script>

<template>
  <button v-if="!props.to" class="button-48 mb-4 mainButton" role="button">
    <span class="text">{{ $t(props.content) }}</span>
  </button>
  <router-link
    :to="props.to"
    style="width: 100%; color: #fff !important"
    v-else
  >
    <button class="button-48 mb-4 mainButton" role="button">
      <span class="text">{{ $t(props.content) }} </span>
    </button>
  </router-link>
</template>

<style lang="scss" scoped>
/* CSS */
.button-48 {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  border-width: 0;
  margin: 0;
  appearance: none;
  background: linear-gradient(142.84deg, #157d99 0%, #70a1e5 100%);
  block-size: 48px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  inline-size: 100%;
  letter-spacing: 0;
  line-height: 1em;
  opacity: 1;
  outline: 0;
  padding-block: 14px;
  padding-inline: 42px;
  text-align: center;
  text-decoration: none;
  text-rendering: geometricprecision;
  touch-action: manipulation;
  transition: opacity 30000ms cubic-bezier(0.694, 0, 0.335, 1),
    background-color 100ms cubic-bezier(0.694, 0, 0.335, 1),
    color 100ms cubic-bezier(0.694, 0, 0.335, 1);
  user-select: none;
  vertical-align: baseline;
  white-space: nowrap;
}

.button-48::before {
  position: absolute;
  border-radius: 24px;
  animation: opacityFallbackOut 0.7s step-end forwards;
  backface-visibility: hidden;
  background-color: #ebebeb;
  block-size: 100%;
  clip-path: polygon(-1% 0, 0 0, -25% 100%, -1% 100%);
  color: #000 !important;
  content: '';
  inline-size: 100%;
  inset-block-start: 0;
  inset-inline-start: 0;
  transform: translateZ(0);
  transition: clip-path 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.button-48:hover::before {
  animation: opacityFallbackIn 0s step-start forwards;
  clip-path: polygon(0 0, 101% 0, 101% 101%, 0 101%);
}

.button-48::after {
  background-color: #fff;
}

.button-48 span {
  position: relative;
  z-index: 1;
}

.button-48:hover .text {
  color: #000 !important;
}

.button-48:hover {
  background: #fff !important;
}
</style>
