<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { scrollLink } from '$lib/actions/scroll-link.js';
</script>

<section class="cafe">
	<div class="container cafe-inner">
		<article
			class="cafe-card stagger"
			use:reveal={{ threshold: 0.2 }}
			use:scrollLink={{ cssVar: '--card-lift', range: [12, -12], unit: 'px' }}
		>
			<p class="section-eyebrow" style="--i: 0">Sin prisas, en su mejor punto</p>

			<h2 class="cafe-title" style="--i: 1">Nuestro Café</h2>

			<p class="cafe-lede" style="--i: 2">
				En los locales trabajamos el café con el mismo criterio que el producto:
				sencillo, bien hecho y sin complicaciones.
			</p>

			<div class="cafe-icons" style="--i: 3" aria-hidden="true">
				<div class="icon-tile icon-tile--alfajor">
					<svg viewBox="0 0 56 56" aria-hidden="true">
						<circle cx="28" cy="28" r="22" fill="none" stroke="currentColor" stroke-width="2" />
						<circle cx="28" cy="28" r="14" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.6" />
						<path d="M14 28h28" stroke="currentColor" stroke-width="1.4" opacity="0.45" />
					</svg>
				</div>

				<span class="icon-plus" aria-hidden="true">+</span>

				<div class="icon-tile icon-tile--cup">
					<svg viewBox="0 0 56 56" aria-hidden="true">
						<path
							d="M14 18h26v14a10 10 0 0 1-10 10h-6a10 10 0 0 1-10-10V18z"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						/>
						<path
							d="M40 22h4a5 5 0 0 1 0 10h-4"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						/>
						<path
							d="M22 8c0 3 4 4 4 7M30 8c0 3 4 4 4 7"
							fill="none"
							stroke="currentColor"
							stroke-width="1.6"
							stroke-linecap="round"
							opacity="0.7"
						/>
					</svg>
				</div>
			</div>

			<p class="cafe-natural" style="--i: 4">La combinación es natural</p>

			<p class="cafe-balance" style="--i: 5">
				Un café equilibrado y un alfajor en su punto.
			</p>

			<div class="cafe-closing" style="--i: 6">
				<p>Un café mejora el día.</p>
				<p>Un alfajor lo hace perfecto.</p>
			</div>
		</article>
	</div>
</section>

<style>
	.cafe {
		background-color: var(--color-off-white);
		padding-block: var(--space-3xl);
		position: relative;
		overflow: hidden;
	}

	.cafe::before,
	.cafe::after {
		content: "";
		position: absolute;
		width: 380px;
		aspect-ratio: 1;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(168, 213, 229, 0.18), transparent 65%);
		pointer-events: none;
	}

	.cafe::before {
		top: -8%;
		left: -10%;
	}

	.cafe::after {
		bottom: -12%;
		right: -8%;
		background: radial-gradient(circle, rgba(137, 26, 36, 0.07), transparent 65%);
	}

	.cafe-inner {
		display: flex;
		justify-content: center;
		position: relative;
		z-index: 1;
	}

	.cafe-card {
		max-width: 640px;
		width: 100%;
		background-color: var(--color-off-white);
		border: 1px solid rgba(38, 38, 38, 0.1);
		border-radius: var(--radius-xl);
		padding: clamp(2.5rem, 5vw, 4rem) clamp(1.75rem, 4vw, 3rem);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--space-md);
		box-shadow:
			0 1px 0 rgba(38, 38, 38, 0.04),
			0 24px 60px -28px rgba(38, 38, 38, 0.12);
		transform: translateY(var(--card-lift, 0));
		will-change: transform;
	}

	.cafe-title {
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		color: var(--color-dark);
		letter-spacing: 0.02em;
	}

	.cafe-lede {
		font-size: 0.9375rem;
		color: rgba(38, 38, 38, 0.65);
		line-height: 1.7;
		max-width: 44ch;
	}

	.cafe-icons {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-lg);
		margin-block: var(--space-md);
	}

	.icon-tile {
		width: 64px;
		height: 64px;
		border: 1.5px solid rgba(38, 38, 38, 0.18);
		border-radius: var(--radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-bordeaux);
		transition: transform 350ms cubic-bezier(0.22, 1, 0.36, 1),
		            border-color 200ms ease,
		            background-color 200ms ease;
	}

	.icon-tile svg {
		width: 36px;
		height: 36px;
	}

	.cafe-card:hover .icon-tile--alfajor {
		transform: rotate(-6deg) translateY(-3px);
		border-color: var(--color-bordeaux);
	}

	.cafe-card:hover .icon-tile--cup {
		transform: rotate(6deg) translateY(-3px);
		border-color: var(--color-bordeaux);
		background-color: rgba(137, 26, 36, 0.04);
	}

	.icon-plus {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.5rem;
		color: rgba(38, 38, 38, 0.4);
	}

	.cafe-natural {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(1rem, 1.6vw, 1.25rem);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-dark);
	}

	.cafe-balance {
		font-size: 0.875rem;
		color: rgba(38, 38, 38, 0.6);
		max-width: 36ch;
		line-height: 1.6;
	}

	.cafe-closing {
		margin-top: var(--space-md);
		padding-top: var(--space-md);
		border-top: 1px solid rgba(38, 38, 38, 0.1);
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		width: 100%;
	}

	.cafe-closing p {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(0.95rem, 1.4vw, 1.0625rem);
		color: var(--color-bordeaux);
		letter-spacing: 0.02em;
		line-height: 1.4;
	}

	@media (max-width: 600px) {
		.cafe-card {
			padding: var(--space-2xl) var(--space-lg);
		}

		.icon-tile {
			width: 56px;
			height: 56px;
		}

		.icon-tile svg {
			width: 32px;
			height: 32px;
		}
	}
</style>
