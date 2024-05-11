<script setup lang="ts">
import AccountDropdown from '~/components/Dashboard/AccountDropdown.vue'

const links = [{
  label: 'Home',
  icon: 'i-heroicons-home',
  to: '/app/',
  exact: true

}, {
  label: 'Posts',
  icon: 'i-heroicons-inbox'
}, {
  label: 'Users',
  icon: 'i-heroicons-user-group'
}, {
  id: 'settings',
  label: 'Settings',
  to: '/settings',
  icon: 'i-heroicons-cog-8-tooth',
  children: [{
    label: 'General',
    to: '/app/settings',
    exact: true
  }, {
    label: 'Subscription',
    to: '/app/settings/subscription'
  }]
}]
</script>

<template>
  <UDashboardPanel
    collapsible
    :width="250"
  >
    <UDashboardNavbar>
      <template #left>
        <NuxtLink
          to="/app"
          class="text-2xl font-bold"
        >
          Logo
        </NuxtLink>
      </template>
      <template #right>
        <UColorModeButton />
      </template>
    </UDashboardNavbar>

    <UDashboardSidebar>
      <UDashboardSidebarLinks :links="links" />
      <template #footer>
        <AccountDropdown />
      </template>
    </UDashboardSidebar>
  </UDashboardPanel>
</template>
