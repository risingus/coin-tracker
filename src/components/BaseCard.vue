<script setup lang="ts">
import type { CardProps } from 'ant-design-vue';

interface BaseCardProps extends Omit<CardProps, 'size'> {
  size?: 'small' | 'default' | 'large';
  title?: string;
  extra?: string;
  loading?: boolean;
}

const props = withDefaults(defineProps<BaseCardProps>(), {
  size: 'default',
  hoverable: false,
  bordered: true,
  loading: false,
});
</script>

<template>
  <a-card
    :hoverable="props.hoverable"
    :bordered="props.bordered"
    :size="props.size"
    :title="props.title"
    :extra="props.extra"
    :loading="props.loading"
    class='bg-base'
  >
    <slot />

    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    
    <template v-if="$slots.extra" #extra>
      <slot name="extra" />
    </template>

  </a-card>
</template>
