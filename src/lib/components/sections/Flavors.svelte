<script>
	import { reveal } from '$lib/actions/reveal.js';

	const flavors = [
		{ name: 'Bariloche', image: '/sabores/bariloche.jpg' },
		{ name: 'Porteño', image: '/sabores/porteno.jpg' },
		{ name: 'Mar del Plata', image: '/sabores/mardelplata.jpg' },
		{ name: 'Bahía', image: '/sabores/bahia.jpg' }
	];
</script>

<section id="sabores" class="flavors">
	<div class="container flavors-inner">
		<p class="flavors-count" data-anim="up" use:reveal>4 sabores</p>

		<div class="flavors-grid stagger" use:reveal={{ threshold: 0.25 }}>
			{#each flavors as flavor, i}
				<article class="flavor-card" style="--i: {i}">
					<div class="flavor-img">
						<img src={flavor.image} alt="" loading="lazy" decoding="async" />
					</div>
					<p class="flavor-name">{flavor.name}</p>
				</article>
			{/each}
		</div>

		<a
			href="#caja"
			class="btn btn--cream"
			data-anim="up"
			style="transition-delay: 120ms"
			use:reveal
		>Quiero probar</a>
	</div>
</section>

<div class="drip-transition" aria-hidden="true">
	<img
		class="drip"
		src="/images/chorreado-svg.svg"
		alt=""
		aria-hidden="true"
		draggable="false"
	/>
</div>

<style>
	.flavors {
		background-color: var(--color-bordeaux);
		color: var(--color-off-white);
		padding-top: var(--space-2xl);
		position: relative;
	}

	.flavors-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-2xl);
		padding-bottom: var(--space-3xl);
	}

	.flavors-count {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(1.5rem, 3vw, 2rem);
		letter-spacing: 0.01em;
		color: var(--color-cream);
		text-transform: lowercase;
	}

	.flavors-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-xl);
		width: 100%;
		max-width: 960px;
	}

	.flavor-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-md);
	}

	.flavor-img {
		width: 100%;
		aspect-ratio: 1 / 1;
		background-color: var(--color-cream);
		border-radius: var(--radius-md);
		position: relative;
		overflow: hidden;
		transition: transform var(--transition-base);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
	}

	.flavor-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.flavor-card:hover .flavor-img {
		transform: translateY(-4px);
	}

	.flavor-name {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1rem;
		letter-spacing: 0.04em;
		color: var(--color-off-white);
		text-transform: uppercase;
	}

	/* Chorreado transition: bordeaux drip over next section's bg */
	.drip-transition {
		background-color: var(--color-off-white);
		line-height: 0;
	}

	.drip {
		display: block;
		width: 100%;
		height: auto;
		user-select: none;
		-webkit-user-drag: none;
	}

	@media (max-width: 768px) {
		.flavors-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: var(--space-lg);
			max-width: 480px;
		}
	}

	@media (max-width: 420px) {
		.flavors-grid {
			gap: var(--space-md);
		}
		.flavor-name {
			font-size: 0.875rem;
		}
	}
</style>
