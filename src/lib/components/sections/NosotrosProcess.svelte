<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { scrollLink } from '$lib/actions/scroll-link.js';

	const steps = [
		{ image: '/images/haciendo-alfajores.png' },
		{ image: '/images/haciendo-alfajores.png' },
		{ image: '/images/haciendo-alfajores.png' }
	];
</script>

<section class="process flip-container">
	<div class="container process-inner">
		<h2 class="process-title" use:reveal>
			<span class="line-mask">
				<span class="word-rise" style="--i: 0">Cómo</span>
				<span class="word-rise" style="--i: 1">empezó</span>
				<span class="word-rise" style="--i: 2">todo</span>
			</span>
		</h2>

		<div class="process-grid stagger" use:reveal={{ threshold: 0.15 }}>
			{#each steps as step, i (i)}
				<article
					class="process-card"
					style="--i: {i}"
					use:scrollLink={{ cssVar: '--card-y', range: [16, -16], unit: 'px' }}
				>
					<div class="process-img">
						<img src={step.image} alt="" loading="lazy" decoding="async" />
						<div class="process-img-overlay" aria-hidden="true"></div>
						<span class="process-step" aria-hidden="true">0{i + 1}</span>
					</div>
				</article>
			{/each}
		</div>

		<div class="process-closing stagger" use:reveal={{ threshold: 0.3 }}>
			<p class="process-text" style="--i: 0">
				Seguimos produciendo en pequeños lotes, de forma manual y sin añadir conservantes.
				Priorizamos el sabor, la textura y la frescura por encima de la cantidad.
			</p>

			<div class="process-quote" style="--i: 1">
				<p>No buscamos reinventar el alfajor.</p>
				<p>Buscamos hacerlo perfecto.</p>
			</div>
		</div>
	</div>
</section>

<style>
	.process {
		background-color: var(--color-off-white);
		padding-block: var(--space-3xl);
		position: relative;
		overflow: hidden;
	}

	.process-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-2xl);
		text-align: center;
	}

	.process-title {
		font-size: clamp(2.25rem, 5vw, 3.75rem);
		color: var(--color-dark);
		letter-spacing: 0.01em;
	}

	.process-title :global(.word-rise) {
		margin-inline: 0.06em;
	}

	.process-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-xl);
		width: 100%;
	}

	.process-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		transform: translateY(var(--card-y, 0));
		will-change: transform;
	}

	.process-img {
		position: relative;
		width: 100%;
		aspect-ratio: 1 / 1;
		border-radius: var(--radius-lg);
		overflow: hidden;
		background-color: var(--color-cream-deep);
		isolation: isolate;
		transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1),
		            box-shadow 400ms ease;
	}

	.process-img img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
		            filter 500ms ease;
		filter: saturate(0.95);
	}

	.process-img-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0) 50%,
			rgba(38, 38, 38, 0.45) 100%
		);
		z-index: 1;
	}

	.process-step {
		position: absolute;
		top: var(--space-md);
		left: var(--space-md);
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 1rem;
		letter-spacing: 0.08em;
		color: var(--color-cream);
		z-index: 2;
		opacity: 0.9;
	}

	.process-card:hover .process-img {
		box-shadow: 0 18px 50px rgba(38, 38, 38, 0.18);
	}

	.process-card:hover .process-img img {
		transform: scale(1.06);
		filter: saturate(1.1);
	}

	.process-closing {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-lg);
		max-width: 60ch;
		margin-top: var(--space-md);
	}

	.process-text {
		font-size: 0.9375rem;
		color: rgba(38, 38, 38, 0.7);
		line-height: 1.75;
	}

	.process-quote {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.process-quote p {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(1rem, 1.6vw, 1.25rem);
		letter-spacing: 0.01em;
		color: var(--color-bordeaux);
		line-height: 1.4;
	}

	@media (max-width: 768px) {
		.process-grid {
			grid-template-columns: 1fr 1fr;
			gap: var(--space-md);
		}

		.process-card:nth-child(3) {
			grid-column: 1 / -1;
			max-width: calc(50% - var(--space-md) / 2);
			justify-self: center;
		}
	}

	@media (max-width: 480px) {
		.process-grid {
			grid-template-columns: 1fr;
			gap: var(--space-lg);
			max-width: 320px;
			margin-inline: auto;
		}

		.process-card:nth-child(3) {
			grid-column: auto;
			max-width: none;
		}
	}
</style>
