<template>
    <UModal
        :model-value="show"
        @update:model-value="$emit('update:show', $event)"
        prevent-close
        :ui="{
            overlay: {
                background: 'dark:bg-custom-gray-dashboard/75 bg-gray-200/75',
            },
            background: 'dark:bg-custom-gray bg-white',
        }"
    >
        <div class="p-6 dark:bg-custom-gray bg-white rounded-lg">
            <div class="flex flex-row justify-between">
                <p class="dark:text-white text-gray-800">Are you sure you want to remove this location?</p>
                <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-x-mark-20-solid"
                    class="-my-1 dark:text-white text-gray-800"
                    @click="$emit('update:show', false)"
                />
            </div>
            <div class="mt-6 flex flex-col space-y-2">
                <UButton block color="gray" variant="solid" @click="$emit('update:show', false)">Cancel</UButton>
                <UButton block color="red" variant="solid" @click="$emit('confirm')">Delete</UButton>
            </div>
        </div>
    </UModal>
</template>

<script setup>
defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    location: {
        type: Object,
        default: null,
    },
});

defineEmits(['update:show', 'confirm']);
</script>
