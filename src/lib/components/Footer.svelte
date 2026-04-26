<footer>
	<div class="container footer-inner">
		<p class="footer-brand">Suruleche</p>
		<nav>
			<a href="/#sabores">Sabores</a>
			<a href="/#caja">La Caja</a>
			<a href="/locales">Locales</a>
			<a href="/nosotros">Nosotros</a>
		</nav>
		<p class="legal">© 2025 Suruleche · Madrid &amp; Valencia · Hecho con amor desde Argentina</p>
	</div>
</footer>

<style>
	footer {
		background-color: var(--color-dark-2);
		padding-block: var(--space-3xl);
		border-top: 1px solid rgba(255, 255, 255, 0.06);
	}

	.footer-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-xl);
		text-align: center;
	}

	.footer-brand {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: var(--fw-regular);
		color: var(--color-off-white);
		letter-spacing: 0.06em;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--space-md) var(--space-2xl);
	}

	nav a {
		font-size: 0.75rem;
		font-weight: var(--fw-bold);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.35);
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	nav a:hover {
		color: var(--color-off-white);
	}

	.legal {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.2);
		line-height: 1.6;
	}
</style>
