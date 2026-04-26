<script>
	import { reveal } from '$lib/actions/reveal.js';
</script>

<section class="locales-hero flip-container">
	<div class="locales-hero-bg" aria-hidden="true">
		<div class="bg-grain"></div>
	</div>

	<div class="container locales-hero-inner">
		<p class="section-eyebrow" data-anim="up" use:reveal>Visítanos</p>

		<h1 class="locales-hero-title" use:reveal>
			<span class="line-mask">
				<span class="word-rise" style="--i: 0">Experiencia</span>
				<span class="word-rise" style="--i: 1">Suru</span>
			</span>
		</h1>

		<p class="locales-hero-subtitle" data-anim="up" style="transition-delay: 360ms" use:reveal>
			Abrimos espacios en Madrid y Valencia para ofrecer
			<br class="br-desktop" />
			algo más que producto para llevar.
		</p>

		<p class="locales-hero-desc" data-anim="up" style="transition-delay: 480ms" use:reveal>
			En ambos puedes sentarte, pedir un café y comer los alfajores en el momento,
			recién preparados y en su mejor punto.
		</p>
	</div>
</section>

<style>
	.locales-hero {
		position: relative;
		background-color: var(--color-cream);
		padding-block: clamp(5rem, 10vw, 8rem) clamp(3rem, 6vw, 5rem);
		overflow: hidden;
		isolation: isolate;
	}

	.locales-hero-bg {
		position: absolute;
		inset: 0;
		z-index: -1;
		pointer-events: none;
	}

	.locales-hero-bg::before {
		content: "";
		position: absolute;
		top: -25%;
		left: 50%;
		width: min(900px, 90vw);
		aspect-ratio: 1 / 1;
		background: radial-gradient(
			circle at center,
			rgba(137, 26, 36, 0.08) 0%,
			rgba(137, 26, 36, 0.02) 45%,
			transparent 70%
		);
		transform: translateX(-50%);
	}

	.locales-hero-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--space-md);
	}

	.locales-hero-title {
		font-size: clamp(2.75rem, 8vw, 6rem);
		font-weight: 800;
		line-height: 1;
		letter-spacing: -0.01em;
		color: var(--color-bordeaux);
		max-width: 14ch;
		margin-top: var(--space-sm);
	}

	.locales-hero-title :global(.word-rise) {
		margin-inline: 0.06em;
	}

	.locales-hero-subtitle {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(1.1rem, 1.8vw, 1.4rem);
		line-height: 1.35;
		color: var(--color-dark);
		max-width: 36ch;
		margin-top: var(--space-md);
		letter-spacing: 0.005em;
	}

	.locales-hero-desc {
		font-size: 0.9375rem;
		color: rgba(38, 38, 38, 0.6);
		line-height: 1.7;
		max-width: 52ch;
	}

	@media (max-width: 640px) {
		.br-desktop {
			display: none;
		}
		.locales-hero-subtitle {
			font-size: 1rem;
		}
	}
</style>
