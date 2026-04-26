<script>
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal.js';
	import { scrollLink } from '$lib/actions/scroll-link.js';

	const layers = [
		{ label: 'Masa de galleta' },
		{ label: 'Relleno cremoso' },
		{ label: 'Masa de galleta' }
	];

	let bodyEl;
	let activeLayer = $state(0);

	onMount(() => {
		if (typeof window === 'undefined') return;

		const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
		if (prefersReduced) {
			activeLayer = 1;
			return;
		}

		let rafId = null;

		function update() {
			rafId = null;
			if (!bodyEl) return;
			const rect = bodyEl.getBoundingClientRect();
			const vh = window.innerHeight;
			const raw = (vh - rect.top) / (vh + rect.height);
			const p = raw < 0 ? 0 : raw > 1 ? 1 : raw;
			// Tighter window: switching points fall at progress 0.4 (0->1)
			// and 0.6 (1->2). Layer 1 stays selected through the central
			// 20% of scroll, with the section well centered in the viewport.
			const mapped = -1.5 + p * 5;
			const idx = Math.max(0, Math.min(layers.length - 1, Math.round(mapped)));
			if (idx !== activeLayer) activeLayer = idx;
		}

		function schedule() {
			if (rafId !== null) return;
			rafId = requestAnimationFrame(update);
		}

		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule, { passive: true });
		schedule();

		return () => {
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			if (rafId) cancelAnimationFrame(rafId);
		};
	});
</script>

<section id="que-es" class="what-is" use:scrollLink={{ cssVar: '--bg-scale', range: [0.85, 1.15] }}>
	<div class="container what-is-inner">
		<h2 data-anim="up" use:reveal>¿Qué es un alfajor?</h2>

		<div class="what-is-body" bind:this={bodyEl}>
			<div class="what-is-image" data-anim="scale" use:reveal>
				<div
					class="exploded-img"
					role="img"
					aria-label="Ilustración de las capas de un alfajor"
					use:scrollLink={{ cssVar: '--img-pan', range: [-50, 150], unit: '%' }}
				></div>
			</div>

			<ul class="layers-list stagger" use:reveal={{ threshold: 0.3 }}>
				{#each layers as layer, i (i)}
					<li style="--i: {i}" class:is-active={i === activeLayer}>
						<span class="layer-dot"></span>
						<span class="layer-label">{layer.label}</span>
					</li>
				{/each}
			</ul>
		</div>

		<p class="what-is-description" data-anim="up" use:reveal>
			En Suruleche trabajamos cada alfajor a mano, en pequeños lotes y sin añadir
			conservantes ni ingredientes innecesarios.
		</p>
	</div>
</section>

<style>
	/* Typed custom property so CSS transitions can interpolate it.
	   Driving every visual via calc(var(--activeness) ...) gives us
	   a single, fixed-duration animation per state change — the
	   layer can never get "stuck" mid-transition. */
	@property --activeness {
		syntax: '<number>';
		initial-value: 0;
		inherits: true;
	}

	.what-is {
		background-color: var(--color-off-white);
		padding-block: var(--section-pad-y);
		position: relative;
		overflow: hidden;
		isolation: isolate;
	}

	.what-is::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: min(900px, 90vw);
		aspect-ratio: 1 / 1;
		background: radial-gradient(
			circle at center,
			var(--color-cream) 0%,
			var(--color-cream) 30%,
			transparent 70%
		);
		transform: translate(-50%, -50%) scale(var(--bg-scale, 1));
		transform-origin: center center;
		z-index: -1;
		pointer-events: none;
		opacity: 0.8;
	}

	.what-is-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-2xl);
		text-align: center;
	}

	h2 {
		color: var(--color-dark);
		font-size: clamp(1.75rem, 3.5vw, 2.5rem);
	}

	.what-is-body {
		display: grid;
		grid-template-columns: auto auto;
		gap: var(--space-4xl);
		align-items: center;
		justify-content: center;
		margin-block: var(--space-lg);
	}

	.what-is-image {
		display: flex;
		justify-content: center;
	}

	.exploded-img {
		width: 300px;
		height: 400px;
		background-color: var(--color-cream);
		background-image: url('/images/que%20es.png');
		background-size: auto 175%;
		background-position: center var(--img-pan, 50%);
		background-repeat: no-repeat;
		border-radius: var(--radius-md);
		position: relative;
		box-shadow: 0 14px 44px rgba(137, 26, 36, 0.1);
		overflow: hidden;
		will-change: background-position;
	}

	.layers-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		text-align: left;
	}

	.layers-list li {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		--activeness: 0;
		/* Single source of truth for the transition: every dependent
		   property follows because they're all calc(... var(--activeness) ...). */
		transition: --activeness 320ms cubic-bezier(0.65, 0, 0.35, 1);
	}

	.layers-list li.is-active {
		--activeness: 1;
	}

	.layer-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: color-mix(
			in oklab,
			var(--color-dark),
			var(--color-bordeaux) calc(var(--activeness) * 100%)
		);
		opacity: calc(0.3 + 0.7 * var(--activeness));
		box-shadow: 0 0 0 calc(var(--activeness) * 4px) rgba(137, 26, 36, 0.12);
		transform: scale(calc(1 + 0.2 * var(--activeness)));
		flex-shrink: 0;
	}

	.layer-label {
		font-family: var(--font-body);
		font-size: 0.9375rem;
		color: var(--color-dark);
		letter-spacing: 0.01em;
		opacity: calc(0.55 + 0.45 * var(--activeness));
		transform: translateX(calc(var(--activeness) * 4px));
	}

	.what-is-description {
		max-width: 48ch;
		font-size: 0.9375rem;
		color: rgba(38, 38, 38, 0.65);
		line-height: 1.75;
	}

	@media (max-width: 600px) {
		.what-is-body {
			grid-template-columns: auto 1fr;
			gap: var(--space-lg);
			justify-content: start;
			text-align: left;
		}

		.exploded-img {
			width: 170px;
			height: 230px;
			background-size: auto 180%;
		}

		.layers-list {
			gap: var(--space-md);
		}

		.layer-label {
			font-size: 0.8125rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.exploded-img {
			background-position: center 50%;
		}

		.layers-list li {
			transition: none;
		}
	}
</style>
