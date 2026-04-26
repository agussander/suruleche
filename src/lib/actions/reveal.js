/**
 * Svelte action: toggles `revealed` class based on viewport intersection.
 * Default is bidirectional (once: false) — animations play on enter AND reverse on exit,
 * so the "frame" tracks the scroll direction.
 * Honors prefers-reduced-motion (reveals immediately without animation).
 *
 * Usage:
 *   <div use:reveal data-anim="up">...</div>
 *   <div use:reveal={{ once: true }}>...</div>
 */
export function reveal(node, options = {}) {
	const defaults = {
		threshold: 0.15,
		rootMargin: '-80px 0px -60px 0px',
		once: false
	};

	let opts = { ...defaults, ...options };

	if (typeof window === 'undefined') {
		return { destroy() {} };
	}

	const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
	if (prefersReduced) {
		node.classList.add('revealed');
		return { destroy() {} };
	}

	if (!('IntersectionObserver' in window)) {
		node.classList.add('revealed');
		return { destroy() {} };
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('revealed');
					if (opts.once) observer.unobserve(entry.target);
				} else if (!opts.once) {
					node.classList.remove('revealed');
				}
			}
		},
		{ threshold: opts.threshold, rootMargin: opts.rootMargin }
	);

	observer.observe(node);

	return {
		update(newOptions = {}) {
			opts = { ...defaults, ...newOptions };
		},
		destroy() {
			observer.disconnect();
		}
	};
}
