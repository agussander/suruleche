<script>
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal.js';
	import { scrollLink } from '$lib/actions/scroll-link.js';

	const steps = [
		{
			title: 'Abre la caja',
			description: 'Sin prisa.\nForma parte del momento.'
		},
		{
			title: 'Elige el que más te apetezca',
			description: 'Da igual si ya lo tenías claro o dudas un poco.\nLos dos casos funcionan.'
		},
		{
			title: 'Da el primer mordisco',
			description: 'Aquí es donde todo encaja:\nla galleta, el dulce de leche y la cobertura.'
		},
		{
			title: 'Tómate tu tiempo',
			description: 'No es algo para comer rápido.\nSi te gusta, lo normal es que quieras otro.'
		}
	];

	let current = $state(0);
	let videoEl;
	let prevStep = 0;

	function prev() {
		current = (current - 1 + steps.length) % steps.length;
	}

	function next() {
		current = (current + 1) % steps.length;
	}

	function goTo(i) {
		current = i;
	}

	$effect(() => {
		const step = current;
		if (!videoEl) {
			prevStep = step;
			return;
		}

		if (step === 0) {
			videoEl.pause();
			videoEl.currentTime = 0;
		} else if (step === 1 && prevStep === 0) {
			videoEl.currentTime = 0;
			videoEl.playbackRate = 2;
			videoEl.play().catch(() => {});
		} else {
			videoEl.pause();
			if (Number.isFinite(videoEl.duration)) {
				videoEl.currentTime = videoEl.duration;
			}
		}

		prevStep = step;
	});

	// Mobile browsers (especially iOS Safari) don't always paint a video's
	// first frame until it's been played at least once. Without this, the
	// step 0 card appears empty until the user advances to step 1.
	// We force the load and seek to a tiny offset so the frame renders.
	onMount(() => {
		if (!videoEl) return;

		const prime = () => {
			try {
				videoEl.currentTime = 0.01;
			} catch {
				// no-op
			}
		};

		if (videoEl.readyState >= 1) {
			prime();
		} else {
			videoEl.addEventListener('loadedmetadata', prime, { once: true });
			try {
				videoEl.load();
			} catch {
				// no-op
			}
		}
	});
</script>

<section id="ritual" class="ritual">
	<div class="container ritual-inner">
		<div class="ritual-head flip-container">
			<p class="ritual-subtitle" data-anim="up" use:reveal>Un viaje hacia tu paladar</p>
			<h2 class="ritual-h2" use:reveal={{ threshold: 0.25 }}>
				<span class="flip-line">
					<span class="flip-word" style="--i: 0">El</span>
					<span class="flip-word" style="--i: 1">ritual</span>
				</span>
				<span class="flip-line">
					<span class="flip-word" style="--i: 2">del</span>
					<span class="flip-word" style="--i: 3">alfajor</span>
				</span>
			</h2>
		</div>

		<div
			class="ritual-carousel"
			data-anim="scale"
			use:reveal={{ threshold: 0.15 }}
		>
			<button class="arrow arrow--left" onclick={prev} aria-label="Paso anterior">
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</button>

			<article
				class="step-card"
				use:scrollLink={{ cssVar: '--card-scale', range: [0.94, 1.06] }}
			>
				<video
					bind:this={videoEl}
					class="step-video"
					src="/images/caja-1.mp4"
					poster="/images/caja-1-poster.jpg"
					muted
					playsinline
					disablepictureinpicture
					preload="auto"
					aria-hidden="true"
				></video>
				<p class="step-title">{current + 1}. {steps[current].title}</p>
				<p class="step-description">
					{#each steps[current].description.split('\n') as line, i}
						{#if i > 0}<br />{/if}{line}
					{/each}
				</p>

				<div class="pagination">
					{#each steps as _, i}
						<button
							class="dot"
							class:active={i === current}
							onclick={() => goTo(i)}
							aria-label={`Ir al paso ${i + 1}`}
						></button>
					{/each}
				</div>
			</article>

			<button class="arrow arrow--right" onclick={next} aria-label="Siguiente paso">
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</button>
		</div>
	</div>
</section>

<style>
	.ritual {
		background-color: var(--color-off-white);
		padding-block: var(--section-pad-y);
	}

	.ritual-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-2xl);
		text-align: center;
	}

	.ritual-head {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.ritual-subtitle {
		font-family: var(--font-display);
		font-style: italic;
		font-weight: 400;
		font-size: clamp(1rem, 2vw, 1.25rem);
		color: var(--color-bordeaux);
		letter-spacing: 0.02em;
		text-transform: none;
	}

	h2 {
		font-size: clamp(2.5rem, 6vw, 4.5rem);
		letter-spacing: 0.02em;
		color: var(--color-dark);
	}

	.flip-line {
		display: block;
	}

	.ritual-h2 :global(.flip-word) {
		margin-inline: 0.1em;
	}

	.ritual-carousel {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: var(--space-md);
		align-items: center;
		width: 100%;
		max-width: 640px;
	}

	.arrow {
		width: 40px;
		height: 40px;
		border: 1px solid rgba(38, 38, 38, 0.15);
		border-radius: 50%;
		color: var(--color-dark);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color var(--transition-fast),
		            border-color var(--transition-fast),
		            color var(--transition-fast);
	}

	.arrow:hover {
		background-color: var(--color-bordeaux);
		border-color: var(--color-bordeaux);
		color: var(--color-off-white);
	}

	.arrow svg {
		width: 18px;
		height: 18px;
	}

	.step-card {
		position: relative;
		background-color: transparent;
		border: 1px solid rgba(38, 38, 38, 0.15);
		border-radius: var(--radius-xl);
		padding: var(--space-2xl) var(--space-xl);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-md);
		min-height: 520px;
		overflow: hidden;
		transform: scale(var(--card-scale, 1));
		transform-origin: center center;
		will-change: transform;
		isolation: isolate;
	}

	.step-video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 117.65%;
		object-fit: cover;
		object-position: top center;
		z-index: -2;
		pointer-events: none;
	}

	.step-card::before {
		content: '';
		position: absolute;
		inset: 0 0 auto 0;
		height: 55%;
		background: linear-gradient(
			to bottom,
			var(--color-off-white) 0%,
			var(--color-off-white) 45%,
			rgba(253, 251, 247, 0) 100%
		);
		z-index: -1;
		pointer-events: none;
	}

	.step-title,
	.step-description,
	.pagination {
		position: relative;
		z-index: 1;
	}

	.pagination {
		margin-top: auto;
	}

	.step-title {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(1rem, 1.75vw, 1.25rem);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--color-dark);
	}

	.step-description {
		font-family: var(--font-body);
		font-size: 0.9375rem;
		color: rgba(38, 38, 38, 0.6);
		line-height: 1.6;
	}

	.pagination {
		display: flex;
		gap: var(--space-sm);
		margin-top: var(--space-sm);
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background-color: rgba(38, 38, 38, 0.2);
		transition: background-color var(--transition-fast), transform var(--transition-fast);
	}

	.dot:hover {
		background-color: rgba(38, 38, 38, 0.4);
	}

	.dot.active {
		background-color: var(--color-bordeaux);
		transform: scale(1.4);
	}

	@media (max-width: 600px) {
		.ritual-carousel {
			gap: var(--space-xs);
		}

		.step-card {
			padding: var(--space-xl) var(--space-md);
			min-height: 440px;
		}
	}
</style>
