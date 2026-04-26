<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { scrollLink } from '$lib/actions/scroll-link.js';

	let email = $state('');
	let submitted = $state(false);
	let touched = $state(false);

	const isValid = $derived(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

	function onSubmit(event) {
		event.preventDefault();
		touched = true;
		if (!isValid) return;
		submitted = true;
	}
</script>

<section class="news">
	<div class="news-bg" aria-hidden="true">
		<div
			class="news-bg-glow"
			use:scrollLink={{ cssVar: '--glow-y', range: [40, -40], unit: 'px' }}
		></div>
	</div>

	<div class="container news-inner">
		<div class="news-content stagger" use:reveal={{ threshold: 0.2 }}>
			<p class="news-lede" style="--i: 0">
				Nuevas combinaciones, distintas texturas, pequeños ajustes que cambian
				mucho más de lo que parece. Es parte del proceso.
			</p>

			<h2 class="news-title" style="--i: 1">
				Muy pronto habrá<br />nuevos sabores
			</h2>

			<form
				class="news-form"
				style="--i: 2"
				onsubmit={onSubmit}
				novalidate
			>
				<label for="news-email" class="news-label">
					Entérate de todas las novedades
				</label>

				<div class="news-input-wrap" class:has-error={touched && !isValid && !submitted}>
					{#if !submitted}
						<input
							id="news-email"
							type="email"
							placeholder="Ingresa tu mail"
							bind:value={email}
							onblur={() => (touched = true)}
							required
							aria-invalid={touched && !isValid}
						/>
						<button type="submit" class="news-submit" aria-label="Suscribirme">
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
						</button>
					{:else}
						<p class="news-success" role="status">
							Listo. Vas a ser de los primeros en saberlo.
						</p>
					{/if}
				</div>

				{#if touched && !isValid && !submitted}
					<p class="news-error">Ingresa un email válido.</p>
				{/if}
			</form>
		</div>

		<div
			class="news-image"
			data-anim="scale"
			use:reveal={{ threshold: 0.2 }}
			use:scrollLink={{ cssVar: '--news-img-y', range: [28, -28], unit: 'px' }}
		>
			<div class="news-image-frame">
				<img src="/images/alfajores%202x.png" alt="" loading="lazy" decoding="async" />
			</div>
		</div>
	</div>
</section>

<style>
	.news {
		background-color: var(--color-dark);
		color: var(--color-off-white);
		position: relative;
		overflow: hidden;
		padding-block: var(--space-3xl);
	}

	.news-bg {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.news-bg-glow {
		position: absolute;
		top: -10%;
		left: -10%;
		width: 600px;
		height: 600px;
		border-radius: 50%;
		background: radial-gradient(
			circle,
			rgba(137, 26, 36, 0.4) 0%,
			rgba(137, 26, 36, 0.1) 40%,
			transparent 70%
		);
		filter: blur(60px);
		transform: translateY(var(--glow-y, 0));
		will-change: transform;
	}

	.news-inner {
		position: relative;
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: clamp(var(--space-xl), 5vw, var(--space-3xl));
		align-items: center;
		z-index: 1;
	}

	.news-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		max-width: 46ch;
	}

	.news-lede {
		font-size: 0.9375rem;
		color: rgba(253, 251, 247, 0.7);
		line-height: 1.7;
	}

	.news-title {
		font-size: clamp(1.75rem, 3.6vw, 2.75rem);
		color: var(--color-off-white);
		letter-spacing: 0.01em;
		line-height: 1.05;
	}

	.news-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		margin-top: var(--space-sm);
	}

	.news-label {
		font-size: 0.75rem;
		font-weight: var(--fw-bold);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: rgba(253, 251, 247, 0.5);
	}

	.news-input-wrap {
		position: relative;
		display: flex;
		align-items: center;
		background-color: rgba(255, 255, 255, 0.05);
		border: 1.5px solid rgba(255, 255, 255, 0.15);
		border-radius: var(--radius-full);
		padding: 0.35rem 0.4rem 0.35rem 1.25rem;
		transition: border-color var(--transition-base),
		            background-color var(--transition-base);
	}

	.news-input-wrap:focus-within {
		border-color: var(--color-cream);
		background-color: rgba(255, 255, 255, 0.08);
	}

	.news-input-wrap.has-error {
		border-color: rgba(248, 138, 138, 0.7);
	}

	.news-input-wrap input {
		flex: 1;
		min-width: 0;
		background: transparent;
		border: none;
		outline: none;
		font-family: var(--font-body);
		font-size: 0.9375rem;
		color: var(--color-off-white);
		padding-block: 0.5rem;
	}

	.news-input-wrap input::placeholder {
		color: rgba(253, 251, 247, 0.4);
	}

	.news-submit {
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: var(--color-cream);
		color: var(--color-bordeaux);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color var(--transition-fast),
		            transform var(--transition-fast);
	}

	.news-submit:hover {
		background-color: var(--color-off-white);
		transform: translateX(2px);
	}

	.news-submit svg {
		width: 18px;
		height: 18px;
	}

	.news-success {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 0.9375rem;
		color: var(--color-cream);
		padding-block: 0.5rem;
	}

	.news-error {
		font-size: 0.75rem;
		color: rgba(248, 138, 138, 0.85);
		letter-spacing: 0.04em;
		padding-left: 1.25rem;
	}

	.news-image {
		position: relative;
		width: 100%;
		max-width: 420px;
		justify-self: end;
	}

	.news-image-frame {
		position: relative;
		width: 100%;
		aspect-ratio: 1 / 1;
		border-radius: var(--radius-lg);
		overflow: hidden;
		background-color: rgba(255, 255, 255, 0.04);
		transform: translateY(var(--news-img-y, 0));
		will-change: transform;
		box-shadow: 0 30px 70px -30px rgba(0, 0, 0, 0.5);
	}

	.news-image-frame img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: brightness(0.9);
	}

	@media (max-width: 768px) {
		.news-inner {
			grid-template-columns: 1fr;
			gap: var(--space-2xl);
		}

		.news-image {
			grid-row: 1;
			justify-self: stretch;
			max-width: none;
		}

		.news-image-frame {
			aspect-ratio: 16 / 10;
		}
	}
</style>
