<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { scrollLink } from '$lib/actions/scroll-link.js';

	const locations = [
		{
			city: 'Madrid',
			address: 'Avenida 1, 123',
			hours: 'Lun a Sáb · 09:00 — 21:00',
			mapQuery: 'Madrid, España',
			image: '/images/cafe-madrid.webp'
		},
		{
			city: 'Valencia',
			address: 'Avenida 1, 123',
			hours: 'Lun a Sáb · 09:00 — 21:00',
			mapQuery: 'Valencia, España',
			image: '/images/cafe-valencia.webp'
		}
	];

	let mapMounted = $state({ Madrid: false, Valencia: false });

	function mountMap(city) {
		if (!mapMounted[city]) mapMounted = { ...mapMounted, [city]: true };
	}

	function mapEmbed(query) {
		return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=14&output=embed`;
	}

	function mapLink(query) {
		return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
	}
</script>

<section class="locales-grid">
	<div class="container locales-grid-inner">
		<div
			class="locales-grid-cards stagger"
			use:reveal={{ threshold: 0.1 }}
		>
			{#each locations as loc, i (loc.city)}
				<article
					class="loc-card"
					style="--i: {i}"
					onmouseenter={() => mountMap(loc.city)}
					onfocusin={() => mountMap(loc.city)}
				>
					<div class="loc-img">
						<img src={loc.image} alt="" loading="lazy" decoding="async" />

						<div class="loc-overlay" aria-hidden="true"></div>

						<span
							class="loc-city"
							use:scrollLink={{ cssVar: '--label-y', range: [22, -22], unit: 'px' }}
						>
							{loc.city}
						</span>

						{#if mapMounted[loc.city]}
							<div class="loc-map">
								<iframe
									title={`Mapa ${loc.city}`}
									src={mapEmbed(loc.mapQuery)}
									loading="lazy"
									referrerpolicy="no-referrer-when-downgrade"
									allowfullscreen
								></iframe>
							</div>
						{/if}

						<a
							href={mapLink(loc.mapQuery)}
							class="loc-cta btn btn--cream"
							target="_blank"
							rel="noopener"
						>
							Cómo llegar
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

					<div class="loc-meta">
						<p class="loc-address">{loc.address}</p>
						<span class="loc-dot" aria-hidden="true">·</span>
						<p class="loc-hours">{loc.hours}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.locales-grid {
		background-color: var(--color-cream);
		padding-block: var(--space-2xl) var(--space-3xl);
	}

	.locales-grid-inner {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xl);
	}

	.locales-grid-cards {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-xl);
	}

	.loc-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.loc-img {
		position: relative;
		width: 100%;
		aspect-ratio: 4 / 3;
		background-color: var(--color-cream-deep);
		border-radius: var(--radius-lg);
		overflow: hidden;
		isolation: isolate;
		transition: box-shadow var(--transition-base);
	}

	.loc-img > img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: brightness(0.78) saturate(1.05);
		transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
		            filter 500ms ease,
		            opacity 350ms ease;
		z-index: 0;
	}

	.loc-overlay {
		position: absolute;
		inset: 0;
		z-index: 1;
		background:
			linear-gradient(
				180deg,
				rgba(0, 0, 0, 0.05) 0%,
				rgba(0, 0, 0, 0.45) 100%
			),
			linear-gradient(
				135deg,
				rgba(77, 14, 20, 0.4) 0%,
				rgba(77, 14, 20, 0) 60%
			);
		transition: opacity 350ms ease;
	}

	.loc-city {
		position: absolute;
		inset: 0;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-display);
		font-weight: 800;
		font-size: clamp(2.5rem, 6vw, 5rem);
		letter-spacing: 0.02em;
		text-transform: uppercase;
		color: var(--color-off-white);
		text-shadow: 0 4px 28px rgba(0, 0, 0, 0.45);
		pointer-events: none;
		transform: translateY(var(--label-y, 0));
		will-change: transform;
		transition: opacity 250ms ease;
	}

	.loc-map {
		position: absolute;
		inset: 0;
		z-index: 3;
		opacity: 0;
		pointer-events: none;
		transition: opacity 350ms ease;
	}

	.loc-map iframe {
		width: 100%;
		height: 100%;
		border: 0;
		display: block;
		filter: saturate(1.05) contrast(1.02);
	}

	.loc-card:hover .loc-img,
	.loc-card:focus-within .loc-img {
		box-shadow: 0 18px 50px rgba(77, 14, 20, 0.18);
	}

	.loc-card:hover .loc-overlay,
	.loc-card:focus-within .loc-overlay,
	.loc-card:hover .loc-city,
	.loc-card:focus-within .loc-city {
		opacity: 0;
	}

	.loc-card:hover .loc-img > img,
	.loc-card:focus-within .loc-img > img {
		opacity: 0;
	}

	.loc-card:hover .loc-map,
	.loc-card:focus-within .loc-map {
		opacity: 1;
		pointer-events: auto;
	}

	.loc-cta {
		position: absolute;
		bottom: var(--space-md);
		left: 50%;
		transform: translate(-50%, 12px);
		z-index: 4;
		opacity: 0;
		transition: opacity 250ms ease, transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
		pointer-events: none;
		padding: 0.7rem 1.5rem;
		font-size: 0.75rem;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
	}

	.loc-cta svg {
		width: 14px;
		height: 14px;
	}

	.loc-card:hover .loc-cta,
	.loc-card:focus-within .loc-cta {
		opacity: 1;
		transform: translate(-50%, 0);
		pointer-events: auto;
	}

	.loc-meta {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
		flex-wrap: wrap;
	}

	.loc-address,
	.loc-hours {
		font-family: var(--font-body);
		font-size: 0.875rem;
		font-weight: var(--fw-medium);
		color: rgba(38, 38, 38, 0.7);
		letter-spacing: 0.02em;
	}

	.loc-address {
		color: var(--color-bordeaux);
		font-weight: var(--fw-bold);
	}

	.loc-dot {
		color: rgba(38, 38, 38, 0.3);
	}

	@media (max-width: 768px) {
		.locales-grid-cards {
			grid-template-columns: 1fr;
			gap: var(--space-2xl);
		}

		.loc-cta {
			opacity: 1;
			transform: translate(-50%, 0);
			pointer-events: auto;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.loc-img > img,
		.loc-cta,
		.loc-img,
		.loc-overlay,
		.loc-city,
		.loc-map {
			transition: none;
		}
	}
</style>
