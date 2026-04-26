<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { scrollLink } from '$lib/actions/scroll-link.js';
</script>

<section class="origin flip-container">
	<div class="origin-bg" aria-hidden="true">
		<div
			class="origin-blob origin-blob--1"
			use:scrollLink={{ cssVar: '--blob-y', range: [40, -40], unit: 'px' }}
		></div>
		<div
			class="origin-blob origin-blob--2"
			use:scrollLink={{ cssVar: '--blob-y2', range: [-30, 30], unit: 'px' }}
		></div>
	</div>

	<div class="container origin-inner">
		<h1 class="origin-title" use:reveal>
			<span class="line-mask">
				<span class="word-rise" style="--i: 0">Cómo</span>
				<span class="word-rise" style="--i: 1">empezó</span>
				<span class="word-rise" style="--i: 2">todo</span>
			</span>
		</h1>

		<div class="origin-text stagger" use:reveal={{ threshold: 0.2 }}>
			<p style="--i: 0">
				<span class="brand-highlight">SURULECHE</span> nace en una sobremesa familiar,
				cuando una niña intentó decir <em>"dulce de leche"</em> y pronunció otra cosa.
			</p>

			<p class="origin-emphasis" style="--i: 1">Ese nombre se quedó.</p>

			<p style="--i: 2">
				Y con el tiempo, también la idea de hacer un producto alrededor de él.
			</p>
		</div>
	</div>
</section>

<style>
	.origin {
		position: relative;
		background-color: var(--color-off-white);
		padding-block: clamp(5rem, 10vw, 8rem) clamp(3rem, 6vw, 5rem);
		overflow: hidden;
		isolation: isolate;
	}

	.origin-bg {
		position: absolute;
		inset: 0;
		z-index: -1;
		pointer-events: none;
	}

	.origin-blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.55;
		will-change: transform;
	}

	.origin-blob--1 {
		top: -10%;
		left: -8%;
		width: 460px;
		height: 460px;
		background-color: rgba(249, 242, 228, 0.9);
		transform: translateY(var(--blob-y, 0));
	}

	.origin-blob--2 {
		bottom: -16%;
		right: -10%;
		width: 380px;
		height: 380px;
		background-color: rgba(168, 213, 229, 0.35);
		transform: translateY(var(--blob-y2, 0));
	}

	.origin-inner {
		display: grid;
		grid-template-columns: 1.05fr 1fr;
		gap: clamp(var(--space-2xl), 6vw, var(--space-4xl));
		align-items: center;
	}

	.origin-title {
		font-size: clamp(2.5rem, 7vw, 5.25rem);
		font-weight: 800;
		line-height: 0.95;
		letter-spacing: -0.01em;
		color: var(--color-dark);
		max-width: 12ch;
	}

	.origin-title :global(.word-rise) {
		display: inline-block;
		margin-inline: 0.06em;
	}

	.origin-text {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.origin-text p {
		font-size: 1rem;
		line-height: 1.75;
		color: rgba(38, 38, 38, 0.78);
	}

	.brand-highlight {
		font-family: var(--font-display);
		font-weight: 700;
		letter-spacing: 0.04em;
		color: var(--color-bordeaux);
		text-transform: uppercase;
	}

	.origin-emphasis {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(1.125rem, 1.8vw, 1.375rem) !important;
		color: var(--color-dark) !important;
		letter-spacing: 0.01em;
		text-transform: none;
	}

	.origin-text em {
		font-style: italic;
		color: var(--color-bordeaux);
	}

	@media (max-width: 768px) {
		.origin-inner {
			grid-template-columns: 1fr;
			gap: var(--space-xl);
			text-align: center;
		}

		.origin-title {
			max-width: none;
		}

		.origin-text {
			align-items: center;
		}

		.origin-text p {
			max-width: 36ch;
		}
	}
</style>
