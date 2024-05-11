<script setup lang="ts">
import Sidebar from '~/components/Dashboard/Sidebar.vue'

const { isNotificationsSlideoverOpen } = useDashboard()
</script>

<template>
  <UDashboardLayout>
    <Sidebar />
    <UDashboardPage>
      <slot />
    </UDashboardPage>
    <UDashboardSlideover
      v-model="isNotificationsSlideoverOpen"
      title="Notifications"
    />
  </UDashboardLayout>
</template>

<style scoped>

</style>
