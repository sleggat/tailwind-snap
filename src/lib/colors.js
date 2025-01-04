// src/lib/colors.js
export const tailwindColors = [
	{ name: 'white', hex: '#ffffff' },
	{ name: 'black', hex: '#000000' },
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

// Convert hex to RGB
function hexToRgb(hex) {
	const bigint = parseInt(hex.substring(1), 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;
	return [r, g, b];
}

// RGB Distance (simple matching)
export function rgbDistance(hex1, hex2) {
	const rgb1 = hexToRgb(hex1);
	const rgb2 = hexToRgb(hex2);
	return Math.sqrt(
		Math.pow(rgb2[0] - rgb1[0], 2) + Math.pow(rgb2[1] - rgb1[1], 2) + Math.pow(rgb2[2] - rgb1[2], 2)
	);
}

// Convert RGB to XYZ
function rgbToXyz(rgb) {
	let [r, g, b] = rgb.map((val) => {
		val = val / 255;
		return val > 0.04045 ? Math.pow((val + 0.055) / 1.055, 2.4) : val / 12.92;
	});

	r *= 100;
	g *= 100;
	b *= 100;

	const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
	const y = r * 0.2126729 + g * 0.7151522 + b * 0.072175;
	const z = r * 0.0193339 + g * 0.119192 + b * 0.9503041;

	return [x, y, z];
}

// Convert XYZ to LAB
function xyzToLab(xyz) {
	let [x, y, z] = xyz;
	x = x / 95.047;
	y = y / 100;
	z = z / 108.883;

	[x, y, z] = [x, y, z].map((val) => {
		return val > 0.008856 ? Math.pow(val, 1 / 3) : 7.787 * val + 16 / 116;
	});

	const l = 116 * y - 16;
	const a = 500 * (x - y);
	const b = 200 * (y - z);

	return [l, a, b];
}

// Convert hex to LAB
export function hexToLab(hex) {
	const rgb = hexToRgb(hex);
	const xyz = rgbToXyz(rgb);
	return xyzToLab(xyz);
}

// Calculate delta E (color difference) using CIE94 formula
export function deltaE94(lab1, lab2) {
	const [L1, a1, b1] = lab1;
	const [L2, a2, b2] = lab2;

	const dL = L1 - L2;
	const da = a1 - a2;
	const db = b1 - b2;

	const C1 = Math.sqrt(a1 * a1 + b1 * b1);
	const C2 = Math.sqrt(a2 * a2 + b2 * b2);
	const dC = C1 - C2;

	const dH = Math.sqrt(Math.max(0, da * da + db * db - dC * dC));

	const sL = 1;
	const sC = 1 + 0.045 * C1;
	const sH = 1 + 0.015 * C1;

	const dL2 = Math.pow(dL / sL, 2);
	const dC2 = Math.pow(dC / sC, 2);
	const dH2 = Math.pow(dH / sH, 2);

	return Math.sqrt(dL2 + dC2 + dH2);
}

export function findNearestTailwindColor(hex, method = 'lab') {
	if (method === 'rgb') {
		return tailwindColors
			.map((color) => ({
				...color,
				distance: rgbDistance(hex, color.hex)
			}))
			.sort((a, b) => a.distance - b.distance)[0];
	}

	// Default LAB method (most accurate)
	const inputLab = hexToLab(hex);
	return tailwindColors
		.map((color) => ({
			...color,
			distance: deltaE94(inputLab, hexToLab(color.hex))
		}))
		.sort((a, b) => a.distance - b.distance)[0];
}

export function getRandomHexColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
