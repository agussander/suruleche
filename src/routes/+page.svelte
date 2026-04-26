<script>
	import Hero from '$lib/components/sections/Hero.svelte';
	import Flavors from '$lib/components/sections/Flavors.svelte';
	import WhatIsAlfajor from '$lib/components/sections/WhatIsAlfajor.svelte';
	import BoxSection from '$lib/components/sections/BoxSection.svelte';
	import Locations from '$lib/components/sections/Locations.svelte';
	import AboutUs from '$lib/components/sections/AboutUs.svelte';
	import Ritual from '$lib/components/sections/Ritual.svelte';
</script>

<svelte:head>
	<title>Suruleche — Alfajores artesanos en Madrid y Valencia</title>
	<meta name="description" content="Alfajores 100% artesanales elaborados con dulce de leche argentino. Sin conservantes. Con materias primas de alta calidad. Disponibles en Madrid y Valencia." />
</svelte:head>

<Hero />
<Flavors />
<WhatIsAlfajor />
<BoxSection />
<Locations />
<AboutUs />
<Ritual />
