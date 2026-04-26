/**
 * Svelte action: links a CSS custom property to the element's progress through the viewport.
 *
 * Progress is 0 when the element's top edge is at the viewport bottom (about to enter),
 * 0.5 when its center is at the viewport center,
 * 1 when its bottom edge is at the viewport top (about to leave).
 *
 * Every registered element shares a single scroll listener and a single rAF loop,
 * so the cost stays flat as the page grows.
 *
 * Usage:
 *   <div use:scrollLink={{ range: [0.92, 1.08] }}>
 *   <style> div { transform: scale(var(--progress, 1)); } </style>
 *
 * Options:
 *   cssVar: name of the property to write (default '--progress')
 *   range:  [fromProgress0, toProgress1] output interpolation (default [0, 1])
 *   unit:   suffix appended to the value (e.g. 'px', 'deg'); default none
 */

const subs = new Set();
let rafId = null;
let installed = false;

function updateAll() {
	rafId = null;
	if (typeof window === 'undefined') return;
	const vh = window.innerHeight;

	for (const entry of subs) {
		const rect = entry.node.getBoundingClientRect();
		// Progress 0: element just about to enter from below (top === vh)
		// Progress 1: element just left from above (top === -height)
		const raw = (vh - rect.top) / (vh + rect.height);
		const clamped = raw < 0 ? 0 : raw > 1 ? 1 : raw;
		const value = entry.range[0] + clamped * (entry.range[1] - entry.range[0]);
		entry.node.style.setProperty(entry.cssVar, entry.unit ? value + entry.unit : value);
	}
}

function schedule() {
	if (rafId !== null) return;
	rafId = requestAnimationFrame(updateAll);
}

function install() {
	if (installed || typeof window === 'undefined') return;
	installed = true;
	window.addEventListener('scroll', schedule, { passive: true });
	window.addEventListener('resize', schedule, { passive: true });
}

export function scrollLink(node, options = {}) {
	const prefersReduced =
		typeof window !== 'undefined' &&
		window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

	const entry = {
		node,
		cssVar: options.cssVar || '--progress',
		range: options.range || [0, 1],
		unit: options.unit || ''
	};

	if (prefersReduced) {
		const mid = (entry.range[0] + entry.range[1]) / 2;
		node.style.setProperty(entry.cssVar, entry.unit ? mid + entry.unit : mid);
		return { destroy() {} };
	}

	if (typeof window === 'undefined') {
		return { destroy() {} };
	}

	install();
	subs.add(entry);
	schedule();

	return {
		update(newOpts = {}) {
			if (newOpts.range) entry.range = newOpts.range;
			if (newOpts.cssVar) entry.cssVar = newOpts.cssVar;
			if (newOpts.unit !== undefined) entry.unit = newOpts.unit;
			schedule();
		},
		destroy() {
			subs.delete(entry);
		}
	};
}
