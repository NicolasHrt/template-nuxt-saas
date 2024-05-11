<script setup lang="ts">
const { isNotificationsSlideoverOpen } = useDashboard()
</script>

<template>
  <UDashboardPanel grow>
    <UDashboardNavbar title="Home">
      <template #right>
        <UTooltip
          text="Notifications"
          :shortcuts="['N']"
        >
          <UButton
            color="gray"
            variant="ghost"
            square

            @click="isNotificationsSlideoverOpen = true"
          >
            <UChip
              inset
            >
              <UIcon
                name="i-heroicons-bell"
                class="w-5 h-5"
              />
            </UChip>
          </UButton>
        </UTooltip>
      </template>
    </UDashboardNavbar>
    <UDashboardPanelContent>
      <p>
        Welcome to your dashboard!
      </p>
    </UDashboardPanelContent>
  </UDashboardPanel>
</template>

<style scoped>

</style>
