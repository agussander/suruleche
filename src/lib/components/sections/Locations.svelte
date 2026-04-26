<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { scrollLink } from '$lib/actions/scroll-link.js';

	const locations = [
		{ city: 'Madrid', mapUrl: '#', image: '/images/cafe-madrid.webp' },
		{ city: 'Valencia', mapUrl: '#', image: '/images/cafe-valencia.webp' }
	];
</script>

<section id="tiendas" class="locations">
	<div class="container locations-inner">
		<div class="locations-head stagger" use:reveal>
			<div style="--i: 0">
				<h2>Ven a probar nuestra<br />bollería artesanal</h2>
				<p class="locations-lede">
					La experiencia Suruleche te espera en Madrid y Valencia.
				</p>
			</div>
			<div class="locations-body" style="--i: 1">
				<p>
					Estamos muy orgullosos de anunciar la apertura de nuestros dos locales
					comerciales. Ahora puedes sentarte a degustar una merienda Suruleche completa.
				</p>
				<p>
					La filosofía no cambia: materias primas de calidad, atención al detalle y
					sabores irresistibles. Ahora en un lugar que vas a querer visitar cada tarde.
				</p>
				<p>
					Café de especialidad, producto fresco cada día y opción para llevar o
					consumir en el local.
				</p>
				<a href="/locales" class="locations-link">
					Nuestros locales
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<path
							d="M5 12h14M13 6l6 6-6 6"
							fill="none"
							stroke="currentColor"
							stroke-width="1.6"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</a>
			</div>
		</div>

		<div class="locations-cards stagger" use:reveal={{ threshold: 0.2 }}>
			{#each locations as loc, i}
				<article class="location-card" style="--i: {i}">
					<div class="location-img">
						<img src={loc.image} alt="" loading="lazy" decoding="async" />
						<span
							class="location-label"
							use:scrollLink={{ cssVar: '--label-y', range: [18, -18], unit: 'px' }}
						>{loc.city}</span>
					</div>
					<a href={loc.mapUrl} class="btn btn--outline-bordeaux" target="_blank" rel="noopener">
						Cómo llegar
					</a>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.locations {
		background-color: var(--color-off-white);
		padding-block: var(--section-pad-y);
	}

	.locations-inner {
		display: flex;
		flex-direction: column;
		gap: var(--space-3xl);
	}

	.locations-head {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-3xl);
		align-items: start;
	}

	h2 {
		font-size: clamp(1.75rem, 3.5vw, 2.75rem);
		color: var(--color-dark);
		letter-spacing: 0.01em;
	}

	.locations-lede {
		margin-top: var(--space-md);
		font-size: 1rem;
		color: rgba(38, 38, 38, 0.6);
		max-width: 32ch;
	}

	.locations-body {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.locations-body p {
		font-size: 0.9375rem;
		color: rgba(38, 38, 38, 0.7);
		line-height: 1.75;
	}

	.locations-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-sm);
		align-self: flex-start;
		margin-top: var(--space-sm);
		font-family: var(--font-body);
		font-size: 0.8125rem;
		font-weight: var(--fw-bold);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-bordeaux);
		transition: gap var(--transition-base), color var(--transition-fast);
	}

	.locations-link svg {
		width: 16px;
		height: 16px;
		transition: transform var(--transition-base);
	}

	.locations-link:hover {
		color: var(--color-bordeaux-dark);
		gap: var(--space-md);
	}

	.locations-link:hover svg {
		transform: translateX(2px);
	}

	.locations-cards {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-xl);
	}

	.location-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-lg);
	}

	.location-img {
		width: 100%;
		aspect-ratio: 16 / 10;
		background-color: var(--color-cream-deep);
		border-radius: var(--radius-lg);
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.location-img > img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 0;
		filter: brightness(0.78) saturate(1.05);
	}

	.location-img::before {
		content: "";
		position: absolute;
		inset: 0;
		z-index: 1;
		background:
			linear-gradient(
				180deg,
				rgba(0, 0, 0, 0.15) 0%,
				rgba(0, 0, 0, 0.45) 100%
			),
			linear-gradient(
				135deg,
				rgba(77, 14, 20, 0.35) 0%,
				rgba(77, 14, 20, 0) 65%
			);
	}

	.location-card:hover .location-img {
		transform: translateY(-4px);
	}

	.location-label {
		position: relative;
		z-index: 2;
		font-family: var(--font-display);
		font-weight: 800;
		font-size: clamp(2rem, 4vw, 3.25rem);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--color-off-white);
		text-shadow: 0 2px 18px rgba(0, 0, 0, 0.45);
		transform: translateY(var(--label-y, 0));
		will-change: transform;
	}

	@media (max-width: 768px) {
		.locations-head {
			grid-template-columns: 1fr;
			gap: var(--space-xl);
		}

		.locations-cards {
			grid-template-columns: 1fr;
			gap: var(--space-2xl);
		}
	}
</style>
