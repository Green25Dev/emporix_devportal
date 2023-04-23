<template>
  <nav class="portal-navigation">
    <PortalNavigationItem to="/">
      <HomeIcon color="black" class="navigation-icon" />
      <label>{{ $t('navigation.overview') }}</label>
    </PortalNavigationItem>
    <PortalNavigationItem to="/team-settings">
      <TeamsIcon class="navigation-icon" />
      <label>{{ $t('navigation.team') }}</label>
    </PortalNavigationItem>
    <PortalNavigationItem to="/applications/list">
      <ApplicationsIcon class="navigation-icon" />
      <label>{{ $t('navigation.apps') }}</label>
    </PortalNavigationItem>
    <PortalNavigationItem to="/settings">
      <SettingsIcon class="navigation-icon" />
      <label>{{ $t('navigation.settings') }}</label>
    </PortalNavigationItem>
  </nav>
</template>

<script>
import PortalNavigationItem from '~/components/portal/PortalNavigationItem'
import HomeIcon from '~/components/icons/HomeIcon'
import TeamsIcon from '~/components/icons/TeamsIcon'
import SettingsIcon from '~/components/icons/SettingsIcon'
import ApplicationsIcon from '~/components/icons/ApplicationsIcon'

export default {
  name: 'PortalNavigation',
  components: {
    ApplicationsIcon,
    SettingsIcon,
    TeamsIcon,
    HomeIcon,
    PortalNavigationItem
  }
}

</script>

<style lang="scss" scoped>
.portal-navigation {
  display: flex;
  flex-direction: column;

  > * {
    margin-bottom: 3px;
    color: $purple
  }
}
</style>
