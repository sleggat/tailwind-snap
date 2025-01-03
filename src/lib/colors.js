// src/lib/colors.js
export const tailwindColors = [
	{ name: 'gray-50', hex: '#f9fafb' },
	{ name: 'gray-100', hex: '#f3f4f6' },
	{ name: 'gray-200', hex: '#e5e7eb' },
	{ name: 'gray-300', hex: '#d1d5db' },
	{ name: 'gray-400', hex: '#9ca3af' },
	{ name: 'gray-500', hex: '#64748b' },
	{ name: 'gray-600', hex: '#475569' },
	{ name: 'gray-700', hex: '#334155' },
	{ name: 'gray-800', hex: '#1e293b' },
	{ name: 'gray-900', hex: '#111827' },
	{ name: 'red-50', hex: '#fef2f2' },
	{ name: 'red-100', hex: '#fee2e2' },
	{ name: 'red-200', hex: '#fecaca' },
	{ name: 'red-300', hex: '#fca5a5' },
	{ name: 'red-400', hex: '#f87171' },
	{ name: 'red-500', hex: '#ef4444' },
	{ name: 'red-600', hex: '#dc2626' },
	{ name: 'red-700', hex: '#b91c1c' },
	{ name: 'red-800', hex: '#991b1b' },
	{ name: 'red-900', hex: '#7f1d1d' },
	{ name: 'yellow-50', hex: '#fffbeb' },
	{ name: 'yellow-100', hex: '#fef3c7' },
	{ name: 'yellow-200', hex: '#fde68a' },
	{ name: 'yellow-300', hex: '#fcd34d' },
	{ name: 'yellow-400', hex: '#fbbf24' },
	{ name: 'yellow-500', hex: '#f59e0b' },
	{ name: 'yellow-600', hex: '#d97706' },
	{ name: 'yellow-700', hex: '#b45309' },
	{ name: 'yellow-800', hex: '#92400e' },
	{ name: 'yellow-900', hex: '#78350f' },
	{ name: 'green-50', hex: '#ecfdf5' },
	{ name: 'green-100', hex: '#d1fae5' },
	{ name: 'green-200', hex: '#a7f3d0' },
	{ name: 'green-300', hex: '#6ee7b7' },
	{ name: 'green-400', hex: '#34d399' },
	{ name: 'green-500', hex: '#10b981' },
	{ name: 'green-600', hex: '#059669' },
	{ name: 'green-700', hex: '#047857' },
	{ name: 'green-800', hex: '#065f46' },
	{ name: 'green-900', hex: '#064e3b' },
	{ name: 'blue-50', hex: '#eff6ff' },
	{ name: 'blue-100', hex: '#dbeafe' },
	{ name: 'blue-200', hex: '#bfdbfe' },
	{ name: 'blue-300', hex: '#93c5fd' },
	{ name: 'blue-400', hex: '#60a5fa' },
	{ name: 'blue-500', hex: '#3b82f6' },
	{ name: 'blue-600', hex: '#2563eb' },
	{ name: 'blue-700', hex: '#1d4ed8' },
	{ name: 'blue-800', hex: '#1e40af' },
	{ name: 'blue-900', hex: '#1e3a8a' },
	{ name: 'indigo-50', hex: '#eef2ff' },
	{ name: 'indigo-100', hex: '#e0e7ff' },
	{ name: 'indigo-200', hex: '#c7d2fe' },
	{ name: 'indigo-300', hex: '#a5b4fc' },
	{ name: 'indigo-400', hex: '#818cf8' },
	{ name: 'indigo-500', hex: '#6366f1' },
	{ name: 'indigo-600', hex: '#4f46e5' },
	{ name: 'indigo-700', hex: '#4338ca' },
	{ name: 'indigo-800', hex: '#3730a3' },
	{ name: 'indigo-900', hex: '#312e81' },
	{ name: 'purple-50', hex: '#f5f3ff' },
	{ name: 'purple-100', hex: '#ede9fe' },
	{ name: 'purple-200', hex: '#ddd6fe' },
	{ name: 'purple-300', hex: '#c4b5fd' },
	{ name: 'purple-400', hex: '#a78bfa' },
	{ name: 'purple-500', hex: '#8b5cf6' },
	{ name: 'purple-600', hex: '#7c3aed' },
	{ name: 'purple-700', hex: '#6d28d9' },
	{ name: 'purple-800', hex: '#5b21b6' },
	{ name: 'purple-900', hex: '#4c1d95' },
	{ name: 'pink-50', hex: '#fdf2f8' },
	{ name: 'pink-100', hex: '#fce7f3' },
	{ name: 'pink-200', hex: '#fbcfe8' },
	{ name: 'pink-300', hex: '#f9a8d4' },
	{ name: 'pink-400', hex: '#f472b6' },
	{ name: 'pink-500', hex: '#ec4899' },
	{ name: 'pink-600', hex: '#db2777' },
	{ name: 'pink-700', hex: '#be185d' },
	{ name: 'pink-800', hex: '#9d174d' },
	{ name: 'pink-900', hex: '#831843' }
];

export function hexToRgb(hex) {
	const bigint = parseInt(hex.substring(1), 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;
	return [r, g, b];
}

export function colorDistance(rgb1, rgb2) {
	return Math.sqrt(
		Math.pow(rgb2[0] - rgb1[0], 2) + Math.pow(rgb2[1] - rgb1[1], 2) + Math.pow(rgb2[2] - rgb1[2], 2)
	);
}

export function findNearestTailwindColor(hex) {
	const rgb = hexToRgb(hex);
	const distances = tailwindColors.map((color) => ({
		name: color.name,
		hex: color.hex,
		distance: colorDistance(rgb, hexToRgb(color.hex))
	}));
	return distances.sort((a, b) => a.distance - b.distance)[0];
}
