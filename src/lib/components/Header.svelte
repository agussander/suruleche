<script>
	let menuOpen = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}
</script>

<header>
	<div class="nav-inner">
		<span class="nav-spacer" aria-hidden="true"></span>

		<a class="logo" href="/" onclick={closeMenu} aria-label="Suruleche — inicio">
			<img
				class="logo-img"
				src="/SVG/logo.svg"
				alt="Suruleche Alfajorería"
				width="267"
				height="75"
				decoding="async"
			/>
		</a>

		<button
			class="menu-toggle"
			aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
			aria-expanded={menuOpen}
			onclick={toggleMenu}
		>
			<span class:rotated={menuOpen}></span>
			<span class:hidden={menuOpen}></span>
			<span class:rotated-inv={menuOpen}></span>
		</button>
	</div>

	{#if menuOpen}
		<nav>
			<ul>
				<li><a href="/#sabores" onclick={closeMenu}>Sabores</a></li>
				<li><a href="/#caja" onclick={closeMenu}>La Caja</a></li>
				<li><a href="/locales" onclick={closeMenu}>Locales</a></li>
				<li><a href="/nosotros" onclick={closeMenu}>Nosotros</a></li>
				<li><a href="/#ritual" onclick={closeMenu}>El Ritual</a></li>
			</ul>
		</nav>
	{/if}
</header>

<style>
	header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		height: var(--header-height);
		/* Gradient shadow — darker at top, transparent at bottom.
		   No solid bg, no border: nothing divides the nav from the section below. */
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.55) 0%,
			rgba(0, 0, 0, 0.4) 45%,
			rgba(0, 0, 0, 0.12) 80%,
			rgba(0, 0, 0, 0) 100%
		);
		pointer-events: none;
	}

	.nav-inner,
	nav {
		pointer-events: auto;
	}

	.nav-inner {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		height: 100%;
		padding-inline: var(--section-pad-x);
	}

	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		transition: opacity var(--transition-fast);
	}

	.logo:hover {
		opacity: 0.85;
	}

	.logo-img {
		display: block;
		height: 2rem;
		width: auto;
		max-width: min(58vw, 11.5rem);
		object-fit: contain;
	}

	/* Hamburger */
	.menu-toggle {
		justify-self: end;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 5px;
		width: 40px;
		height: 40px;
		padding: 10px;
		cursor: pointer;
	}

	.menu-toggle span {
		display: block;
		width: 20px;
		height: 1.5px;
		background-color: var(--color-off-white);
		border-radius: 2px;
		transition: transform var(--transition-base), opacity var(--transition-base);
		transform-origin: center;
	}

	.menu-toggle span.rotated {
		transform: translateY(6.5px) rotate(45deg);
	}

	.menu-toggle span.hidden {
		opacity: 0;
		transform: scaleX(0);
	}

	.menu-toggle span.rotated-inv {
		transform: translateY(-6.5px) rotate(-45deg);
	}

	.nav-spacer {
		/* balances the grid so logo stays centered */
		display: block;
	}

	/* Dropdown panel */
	nav {
		position: absolute;
		top: var(--header-height);
		left: 0;
		right: 0;
		background-color: var(--color-bordeaux-dark);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding: var(--space-xl) var(--section-pad-x) var(--space-2xl);
	}

	nav ul {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-md);
	}

	nav a {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--color-cream);
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	nav a:hover {
		color: var(--color-off-white);
	}

	@media (max-width: 480px) {
		.logo-img {
			height: 1.65rem;
			max-width: min(62vw, 10rem);
		}
	}
</style>
