<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { AppBar, ThemeInit, ThemeSelect } from 'svelte-ux';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ThemeInit />

<div class="absolute top-0 left-0 z-10 w-full px-2 py-1 text-right">
	<ThemeSelect />
</div>

{@render children?.()}
