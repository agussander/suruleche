<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { scrollLink } from '$lib/actions/scroll-link.js';
</script>

<section id="nosotros" class="about">
	<div
		class="about-bg"
		aria-hidden="true"
		use:scrollLink={{ cssVar: '--bg-progress' }}
	></div>

	<svg class="about-wave about-wave--top" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
		<path d="M0,80 C360,0 1080,0 1440,80 L1440,0 L0,0 Z" />
	</svg>

	<div class="container about-inner">
		<div class="about-content stagger" use:reveal>
			<h2 style="--i: 0">Sobre nosotros</h2>

			<div class="about-text" style="--i: 1">
				<p>
					Somos Karen y Jesús. Una argentina y un español que decidieron
					apostarlo todo por su pasión dulce.
				</p>
				<p>
					Descubre más sobre nuestra historia y cómo creamos Suru.
				</p>
			</div>

			<a href="/nosotros" class="btn btn--cream" style="--i: 2">Ver más</a>
		</div>

		<div class="about-portraits stagger" use:reveal={{ threshold: 0.25 }}>
			<div
				class="portrait"
				style="--i: 0"
				use:scrollLink={{ cssVar: '--pt-scale', range: [0.85, 1.1] }}
			></div>
			<div
				class="portrait portrait--offset"
				style="--i: 1"
				use:scrollLink={{ cssVar: '--pt-scale', range: [0.85, 1.1] }}
			></div>
		</div>
	</div>

	<svg class="about-wave about-wave--bottom" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
		<path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" />
	</svg>
</section>

<style>
	.about {
		background-color: var(--color-off-white);
		color: var(--color-off-white);
		position: relative;
		padding-block: var(--space-3xl);
		overflow: hidden;
	}

	.about-bg {
		position: absolute;
		inset: 0;
		background-color: var(--color-dark);
		/*
		 * Two-segment curve over scroll progress (0 → 1):
		 *   p = 0    → scaleY = 1.00  (entra al viewport)
		 *   p = 0.5  → scaleY = 1.20  (centrada en el viewport)
		 *   p = 1    → scaleY = 0.90  (a punto de salir)
		 *
		 * Subida: 1 + 0.4·p          → en p=0.5 vale 1.2
		 * Bajada: 1.5 − 0.6·p        → en p=0.5 vale 1.2, en p=1 vale 0.9
		 * El min() escoge el tramo activo en cada momento.
		 */
		transform: scaleY(
			min(
				calc(1 + 0.4 * var(--bg-progress, 0)),
				calc(1.5 - 0.6 * var(--bg-progress, 0))
			)
		);
		transform-origin: center center;
		will-change: transform;
		z-index: 0;
	}

	.about-wave {
		position: absolute;
		left: 0;
		right: 0;
		width: 100%;
		height: 60px;
		display: block;
		z-index: 1;
	}

	.about-wave path {
		fill: var(--color-off-white);
	}

	.about-wave--top {
		top: 0;
	}

	.about-wave--bottom {
		bottom: 0;
	}

	.about-wave--bottom path {
		fill: var(--color-off-white);
	}

	.about-inner {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: var(--space-3xl);
		align-items: center;
		padding-block: var(--space-2xl);
		position: relative;
		z-index: 2;
	}

	.about-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		align-items: flex-start;
	}

	h2 {
		font-size: clamp(2rem, 4.5vw, 3.25rem);
		color: var(--color-off-white);
		letter-spacing: 0.04em;
	}

	.about-text {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.about-text p {
		font-size: 0.9375rem;
		color: rgba(253, 251, 247, 0.7);
		line-height: 1.75;
		max-width: 52ch;
	}

	.about-portraits {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-lg);
		padding-inline: var(--space-xl);
	}

	.portrait {
		width: 160px;
		height: 160px;
		border-radius: 50%;
		background-color: var(--color-cream);
		position: relative;
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
		transform: scale(var(--pt-scale, 1));
		transform-origin: center center;
		will-change: transform;
	}

	.portrait::before {
		content: "";
		position: absolute;
		inset: 18%;
		border-radius: 50%;
		background-color: rgba(137, 26, 36, 0.12);
	}

	.portrait--offset {
		margin-left: var(--space-3xl);
	}

	@media (max-width: 768px) {
		.about-inner {
			grid-template-columns: 1fr;
			gap: var(--space-2xl);
			text-align: center;
		}

		.about-content {
			align-items: center;
		}

		.about-portraits {
			flex-direction: row;
			justify-content: center;
			padding-inline: 0;
		}

		.portrait {
			width: 130px;
			height: 130px;
		}

		.portrait--offset {
			margin-left: 0;
			margin-top: var(--space-xl);
		}
	}
</style>
