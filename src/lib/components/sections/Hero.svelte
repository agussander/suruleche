<script>
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal.js';

	// layer: back (slow, small, soft), middle, front (fast, big, sharp)
	// sp = scroll speed multiplier, bd = bob duration (s), bl = bob delay (s)
	// bx/by = bob target offset px, r = rotation deg
	// Desktop y moved up for lower alfajores so nothing gets clipped at hero bottom.
	// mobileY keeps the original positions (user wants bottom mobile layout unchanged).
	// showMobile: back-layer alfajores are hidden on mobile by default; toggle to keep.
	const alfajores = [
		// BACK — distant, slow
		{ src: 'alfajor-04.png', l: 'back',   x: 18, y: 10,                sz: 'clamp(46px, 5.2vw, 72px)',  r:  18, sp: 0.05, bd: 5.8, bl: 0,   bx:  4, by:  -8 },
		{ src: 'alfajor-09.png', l: 'back',   x: 66, y: 18,                sz: 'clamp(42px, 4.6vw, 66px)',  r: -24, sp: 0.07, bd: 6.3, bl: 1.2, bx: -5, by: -10 },
		{ src: 'alfajor-11.png', l: 'back',   x: 48, y:  4, showMobile: true, sz: 'clamp(44px, 5vw, 70px)',  r:  32, sp: 0.06, bd: 5.9, bl: 2.3, bx:  3, by:  -7 },
		{ src: 'alfajor-14.png', l: 'back',   x: 84, y: 52,                sz: 'clamp(48px, 5.4vw, 78px)',  r:  12, sp: 0.08, bd: 6.6, bl: 0.7, bx:  6, by: -11 },
		{ src: 'alfajor-18.png', l: 'back',   x:  6, y: 68, mobileY: 74,   sz: 'clamp(50px, 5.4vw, 80px)',  r: -16, sp: 0.09, bd: 6.1, bl: 1.9, bx: -4, by:  -9 },

		// MIDDLE
		{ src: 'alfajor-02.png', l: 'middle', x:  2, y: 32, mobileY: 14,   sz: 'clamp(88px, 10vw, 148px)',  r: -30, sp: 0.17, bd: 7.1, bl: 0.4, bx:  8, by: -14 },
		{ src: 'alfajor-06.png', l: 'middle', x: 80, y: 58, mobileY: 60,   sz: 'clamp(84px, 9.4vw, 140px)', r:  44, sp: 0.19, bd: 6.9, bl: 1.7, bx: -7, by: -13 },
		{ src: 'alfajor-12.png', l: 'middle', x: 26, y: 74, mobileY: 80,   sz: 'clamp(94px, 10.4vw, 158px)', r: -12, sp: 0.22, bd: 7.6, bl: 0.9, bx:  6, by: -16 },
		{ src: 'alfajor-17.png', l: 'middle', x: 62, y: 78, mobileY: 84,   sz: 'clamp(88px, 9.6vw, 148px)', r:  28, sp: 0.21, bd: 7.3, bl: 2.5, bx: -8, by: -14 },
		{ src: 'alfajor-22.png', l: 'middle', x: 72, y:  6,                sz: 'clamp(92px, 10vw, 152px)',  r: -42, sp: 0.24, bd: 6.8, bl: 1.0, bx:  5, by: -15 },

		// FRONT — close, fast, large. These two bleed past the viewport bottom on desktop.
		{ src: 'alfajor-05.png', l: 'front',  x: -6, y: 44, mobileY: 46,   sz: 'clamp(150px, 17vw, 250px)', r:  22, sp: 0.32, bd: 8.0, bl: 0,    bx: 10, by: -18 },
		{ src: 'alfajor-08.png', l: 'front',  x: 86, y: 24, mobileY: 28,   sz: 'clamp(158px, 18vw, 268px)', r: -14, sp: 0.38, bd: 7.9, bl: 1.3,  bx: -12, by: -20 },
		{ src: 'alfajor-13.png', l: 'front',  x:  8, y: 82, mobileY: 76,   sz: 'clamp(168px, 19vw, 288px)', r:   8, sp: 0.44, bd: 8.6, bl: 0.5,  bx: 14, by: -22 },
		{ src: 'alfajor-20.png', l: 'front',  x: 50, y: 94, mobileY: 86,   sz: 'clamp(158px, 18vw, 268px)', r: -28, sp: 0.5,  bd: 8.3, bl: 2.0,  bx: -10, by: -19 }
	];

	let heroEl = $state(null);

	onMount(() => {
		if (typeof window === 'undefined' || !heroEl) return;

		const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
		if (prefersReduced) return;

		const items = [...heroEl.querySelectorAll('.alfajor-parallax')].map((el) => ({
			el,
			speed: parseFloat(el.dataset.speed)
		}));

		let rafPending = false;

		function update() {
			rafPending = false;
			const y = window.scrollY;
			for (const { el, speed } of items) {
				el.style.setProperty('--parallax-y', y * speed * -1 + 'px');
			}
		}

		function onScroll() {
			if (!rafPending) {
				rafPending = true;
				requestAnimationFrame(update);
			}
		}

		update();
		window.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	});
</script>

<section id="inicio" class="hero" bind:this={heroEl}>
	<div class="hero-bg" aria-hidden="true">
		<div class="hero-bg-fill"></div>
		<img
			class="hero-chorreado"
			src="/images/chorreado-svg.svg"
			alt=""
			aria-hidden="true"
			draggable="false"
		/>
	</div>

	<div class="alfajores-layer" use:reveal={{ threshold: 0.05 }} aria-hidden="true">
		{#each alfajores as a, i}
			<div
				class="alfajor-parallax {a.l}{a.showMobile ? ' show-mobile' : ''}"
				data-speed={a.sp}
				style="--x: {a.x}%; --y: {a.y}%; --mobile-y: {a.mobileY ?? a.y}%; --mobile-x: {a.mobileX ?? a.x}%; --size: {a.sz}; --rotate: {a.r}deg; --bob-dur: {a.bd}s; --bob-delay: {a.bl}s; --bob-x: {a.bx}px; --bob-y: {a.by}px; --i: {i};"
			>
				<div class="alfajor-bob">
					<div class="alfajor-rotate">
						<img src="/alfajores%20volando/{a.src}" alt="" draggable="false" />
					</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="container hero-content flip-container">
		<h1 class="hero-title" use:reveal>
			<span class="line-mask">
				<span class="word-rise" style="--i: 0">Tu</span>
				<span class="word-rise" style="--i: 1">nuevo</span>
				<span class="word-rise" style="--i: 2">pecado</span>
				<span class="word-rise" style="--i: 3">dulce</span>
			</span>
		</h1>

		<p
			class="hero-subtitle"
			data-anim="up"
			style="transition-delay: 560ms"
			use:reveal
		>
			Alfajores 100% artesanales. Sin conservantes. Con materias primas de alta calidad.
		</p>

		<div
			class="hero-cta"
			data-anim="scale"
			style="transition-delay: 720ms"
			use:reveal
		>
			<a href="#caja" class="btn btn--cream">Prueba con una caja</a>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		background-color: var(--color-bordeaux);
		color: var(--color-off-white);
		padding-top: clamp(5rem, 10vw, 8rem);
		padding-bottom: clamp(5rem, 10vw, 8rem);
		/* Clip horizontally (no side scrollbar) but allow vertical overflow
		   so big alfajores near the bottom can bleed into the next bordeaux block. */
		overflow-x: clip;
		overflow-y: visible;
		min-height: clamp(600px, 85vh, 820px);
		display: flex;
		align-items: center;
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		z-index: 0;
		display: flex;
		flex-direction: column;
		pointer-events: none;
	}

	/* Rellena hacia arriba solo si el alto del hero supera la altura natural del chorreado */
	.hero-bg-fill {
		flex: 1 1 0;
		min-height: 0;
		background-color: var(--color-bordeaux);
	}

	.hero-chorreado {
		flex: 0 0 auto;
		display: block;
		width: 100%;
		height: auto;
		user-select: none;
		-webkit-user-drag: none;
	}

	/* ==== Floating alfajores ==== */
	.alfajores-layer {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 1;
	}

	.alfajor-parallax {
		position: absolute;
		left: var(--x);
		top: var(--y);
		width: var(--size);
		transform: translate3d(0, var(--parallax-y, 0px), 0);
		will-change: transform, opacity;
	}

	.alfajor-parallax.back   { z-index: 1; }
	.alfajor-parallax.middle { z-index: 2; }
	.alfajor-parallax.front  { z-index: 3; }

	.alfajor-bob {
		animation: alfajor-bob var(--bob-dur) ease-in-out var(--bob-delay) infinite alternate;
		will-change: transform;
	}

	@keyframes alfajor-bob {
		from { transform: translate3d(0, 0, 0); }
		to   { transform: translate3d(var(--bob-x), var(--bob-y), 0); }
	}

	.alfajor-rotate {
		display: block;
		transform: rotate(var(--rotate));
	}

	.alfajor-rotate img {
		width: 100%;
		height: auto;
		display: block;
		-webkit-user-drag: none;
		user-select: none;
	}

	/* Reveal: each alfajor fades in + un-blurs, staggered, after parent is in view.
	   :global(.has-js) keeps Svelte from pruning these scoped selectors. */
	:global(.has-js) .alfajor-parallax {
		opacity: 0;
		filter: blur(14px);
		transition:
			opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1),
			filter 1.4s cubic-bezier(0.22, 1, 0.36, 1);
		transition-delay: calc(var(--i, 0) * 55ms + 120ms);
	}

	:global(.has-js) .alfajores-layer:global(.revealed) .alfajor-parallax.back {
		opacity: 0.55;
		filter: blur(1px);
	}

	:global(.has-js) .alfajores-layer:global(.revealed) .alfajor-parallax.middle {
		opacity: 0.9;
		filter: none;
	}

	:global(.has-js) .alfajores-layer:global(.revealed) .alfajor-parallax.front {
		opacity: 1;
		filter: none;
	}

	/* ==== Hero content ==== */
	.hero-content {
		position: relative;
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--space-lg);
	}

	.hero-title {
		font-size: clamp(1.75rem, 4.2vw, 3.25rem);
		font-weight: 800;
		line-height: 1;
		letter-spacing: -0.01em;
		color: var(--color-off-white);
		max-width: 20ch;
	}

	.hero-title :global(.line-mask) {
		display: block;
	}

	.hero-title :global(.word-rise) {
		margin-inline: 0.06em;
	}

	.hero-subtitle {
		font-size: clamp(0.8125rem, 1.1vw, 0.9375rem);
		color: rgba(253, 251, 247, 0.82);
		line-height: 1.65;
		max-width: 52ch;
	}

	.hero-cta {
		display: inline-flex;
		margin-top: var(--space-sm);
	}

	/* Cream-colored CTA for contrast on bordeaux */
	:global(.btn--cream) {
		background-color: var(--color-cream);
		color: var(--color-bordeaux);
		border-color: var(--color-cream);
	}

	:global(.btn--cream:hover) {
		background-color: var(--color-off-white);
		border-color: var(--color-off-white);
	}

	/* ==== Mobile: swap to mobile positions, hide back layer (except flagged ones) ==== */
	@media (max-width: 640px) {
		.hero {
			min-height: 640px;
		}
		.alfajor-parallax {
			left: var(--mobile-x);
			top: var(--mobile-y);
		}
		.alfajor-parallax.back:not(.show-mobile) {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.alfajor-bob {
			animation: none;
		}
	}
</style>
