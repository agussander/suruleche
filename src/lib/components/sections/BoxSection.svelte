<section id="caja" class="box-section">
	<div class="box-image" aria-hidden="true">
		<div class="box-photo-frame">
			<img
				class="box-photo"
				src="/images/caja.png"
				alt=""
				loading="lazy"
				decoding="async"
			/>
		</div>
	</div>

	<div class="box-card">
		<div class="box-card-head">
			<h2>Caja de 6</h2>
			<div class="box-price">
				<span class="price-amount">14,90</span>
				<span class="price-currency">€</span>
			</div>
		</div>

		<p class="box-headline">
			Prepara tu caja combinando los sabores como quieras.
		</p>

		<ul class="box-features">
			<li>Envío gratis comprando 2 cajas</li>
			<li>Envíos en Madrid y Valencia</li>
			<li>Llega en menos de 48h</li>
		</ul>

		<a href="#pedido" class="btn btn--cream">Armar mi caja</a>
	</div>
</section>

<style>
	.box-section {
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		min-height: 560px;
		width: 100%;
		gap: 0;
		align-items: stretch;
	}

	/* Misma altura que .box-card (grid en una fila); recorte vía .box-photo-frame */
	.box-image {
		background: var(--color-off-white);
		position: relative;
		min-height: 0;
		align-self: stretch;
		padding: 0;
		margin: 0;
	}

	.box-photo-frame {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 0;
		overflow: hidden;
	}

	/* Recorte central + zoom; absolute para rellenar el alto del grid (desktop) */
	.box-photo {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		border: none;
		outline: none;
		box-shadow: none;
		transform: scale(1.14);
		transform-origin: center center;
	}

	.box-card {
		background-color: var(--color-dark);
		color: var(--color-off-white);
		padding: clamp(2.5rem, 5vw, 4rem) clamp(1.75rem, 4vw, 3rem);
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		justify-content: center;
	}

	.box-card-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--space-md);
		padding-bottom: var(--space-md);
		border-bottom: 1px solid rgba(255, 255, 255, 0.12);
	}

	.box-card-head h2 {
		font-size: clamp(1.5rem, 2.5vw, 2rem);
		color: var(--color-off-white);
		letter-spacing: 0.02em;
	}

	.box-price {
		display: flex;
		align-items: baseline;
		gap: 2px;
	}

	.price-amount {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(1.5rem, 2.5vw, 2rem);
		color: var(--color-off-white);
		line-height: 1;
	}

	.price-currency {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1rem;
		color: var(--color-cream);
		line-height: 1;
		margin-left: 2px;
	}

	.box-headline {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(1.125rem, 2vw, 1.375rem);
		color: var(--color-off-white);
		line-height: 1.25;
		text-transform: uppercase;
		letter-spacing: 0.01em;
	}

	.box-features {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		margin-block: var(--space-xs);
	}

	.box-features li {
		font-size: 0.875rem;
		color: rgba(253, 251, 247, 0.7);
		line-height: 1.5;
	}

	.box-card .btn {
		align-self: flex-start;
		margin-top: var(--space-md);
	}

	@media (max-width: 768px) {
		.box-section {
			grid-template-columns: 1fr;
			min-height: 0;
		}

		/* Sin separación con el div oscuro: la fila de imagen tiene altura explícita */
		.box-image {
			width: 100%;
			margin: 0;
			padding: 0;
			min-height: min(70vw, 380px);
			height: min(70vw, 380px);
		}

		.box-card .btn {
			align-self: stretch;
			justify-content: center;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.box-photo {
			transform: none;
		}
	}
</style>
