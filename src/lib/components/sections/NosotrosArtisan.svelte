<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { scrollLink } from '$lib/actions/scroll-link.js';
</script>

<section class="artisan">
	<div class="container artisan-inner">
		<div
			class="artisan-image"
			data-anim="scale"
			use:reveal={{ threshold: 0.15 }}
			use:scrollLink={{ cssVar: '--img-y', range: [24, -24], unit: 'px' }}
		>
			<div class="artisan-image-frame">
				<img src="/images/haciendo-alfajores.png" alt="" loading="lazy" decoding="async" />
				<div class="artisan-image-tint" aria-hidden="true"></div>
			</div>
			<span class="artisan-image-tag" aria-hidden="true">A mano · pequeños lotes</span>
		</div>

		<div class="artisan-text stagger" use:reveal={{ threshold: 0.2 }}>
			<p class="section-eyebrow" style="--i: 0">Cómo lo hacemos</p>

			<p class="artisan-body" style="--i: 1">
				Empezamos elaborando alfajores de forma artesanal, probando recetas y
				ajustando detalles hasta dar con el equilibrio que buscábamos.
			</p>

			<p class="artisan-emphasis" style="--i: 2">
				Sin producción en masa <span class="dot-sep">·</span> sin prisas.
			</p>
		</div>
	</div>
</section>

<style>
	.artisan {
		background-color: var(--color-off-white);
		padding-block: var(--space-3xl);
	}

	.artisan-inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(var(--space-xl), 5vw, var(--space-4xl));
		align-items: center;
	}

	.artisan-image {
		position: relative;
		width: 100%;
		max-width: 460px;
	}

	.artisan-image-frame {
		position: relative;
		width: 100%;
		aspect-ratio: 1 / 1;
		border-radius: var(--radius-lg);
		overflow: hidden;
		background-color: var(--color-cream-deep);
		box-shadow: 0 24px 60px -22px rgba(38, 38, 38, 0.22);
		transform: translateY(var(--img-y, 0));
		will-change: transform;
	}

	.artisan-image-frame img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.artisan-image-tint {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			rgba(137, 26, 36, 0.15) 0%,
			rgba(137, 26, 36, 0) 60%
		);
		pointer-events: none;
	}

	.artisan-image-tag {
		position: absolute;
		bottom: var(--space-md);
		left: var(--space-md);
		padding: 0.4rem 0.85rem;
		background-color: var(--color-cream);
		border-radius: var(--radius-full);
		font-family: var(--font-body);
		font-size: 0.6875rem;
		font-weight: var(--fw-bold);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-bordeaux);
		box-shadow: 0 4px 14px rgba(38, 38, 38, 0.1);
		z-index: 2;
	}

	.artisan-text {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		max-width: 38ch;
	}

	.artisan-body {
		font-size: 1rem;
		color: rgba(38, 38, 38, 0.75);
		line-height: 1.75;
	}

	.artisan-emphasis {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(1.25rem, 2.2vw, 1.625rem);
		color: var(--color-dark);
		line-height: 1.3;
		letter-spacing: 0.01em;
		margin-top: var(--space-sm);
	}

	.dot-sep {
		color: var(--color-bordeaux);
		margin-inline: 0.25em;
	}

	@media (max-width: 768px) {
		.artisan-inner {
			grid-template-columns: 1fr;
			gap: var(--space-xl);
			justify-items: center;
			text-align: center;
		}

		.artisan-text {
			align-items: center;
		}
	}
</style>
