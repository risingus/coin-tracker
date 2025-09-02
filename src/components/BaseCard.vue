<script setup lang="ts">
import type { CardProps } from 'ant-design-vue';

interface BaseCardProps extends Omit<CardProps, 'size'> {
  size?: 'small' | 'default' | 'large';
  title?: string;
  extra?: string;
  loading?: boolean;
}

const props = withDefaults(defineProps<BaseCardProps>(), {
  size: 'small',
  hoverable: false,
  bordered: true,
  loading: false,
  extra: '',
  title: ''
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
    body-style="padding: 8px;"
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
