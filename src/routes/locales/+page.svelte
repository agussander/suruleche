<script>
	import LocalesHero from '$lib/components/sections/LocalesHero.svelte';
	import LocalesGrid from '$lib/components/sections/LocalesGrid.svelte';
	import LocalesCafe from '$lib/components/sections/LocalesCafe.svelte';
</script>

<svelte:head>
	<title>Locales — Suruleche · Madrid y Valencia</title>
	<meta
		name="description"
		content="Visítanos en Madrid y Valencia. Café de especialidad y alfajores artesanos recién hechos, en su mejor punto."
	/>
</svelte:head>

<LocalesHero />
<LocalesGrid />
<LocalesCafe />
