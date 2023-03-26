<script setup>
import { RouterLink } from 'vue-router'
import ChangeLocale from '@/components/ChangeLocale.vue'
</script>

<template>
    <nav>
		<RouterLink to="/" class="menu-link">{{ $t('page.Home') }}</RouterLink>
		<RouterLink to="/about" class="menu-link">{{ $t('page.About') }}</RouterLink>
        
        <ChangeLocale />
    </nav>
</template>