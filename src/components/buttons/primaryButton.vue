<script lang="ts" setup>
defineProps({
    className: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    btnMainClass: { type: String, default: 'btn-primary' },
    btnType: {
        type: String as () => 'button' | 'submit' | 'reset' | undefined,
        default: 'button'
    }
});
</script>

<template>
    <button class="btn" :class="`${btnMainClass} ${className}`" :type="btnType" :disabled="disabled">
        <slot></slot>
    </button>
</template>
