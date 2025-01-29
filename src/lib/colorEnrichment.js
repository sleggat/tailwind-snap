// src/lib/colorEnrichment.js

export const defaultColorInfo = {
	meaning:
		'A balanced mid-tone color that can be used for various UI elements while maintaining good contrast and visual appeal',
	usage: {
		ui: [
			'Interactive elements like buttons and links',
			'Secondary interface elements',
			'Visual indicators and status markers',
			'Decorative accents and highlights',
			'Background elements and containers'
		],
		bestPractices:
			'Consider the context and hierarchy of your interface when using this color. Test contrast ratios in both light and dark modes',
		combinations: [
			'Pair with neutrals for a balanced look',
			'Use lighter or darker shades within the same family for depth',
			'Consider complementary colors for emphasis',
			'Mix with grays for professional interfaces'
		]
	},
	accessibility: {
		textGuidelines: 'Check WCAG contrast requirements - 4.5:1 for normal text, 3:1 for large text',
		uiConsiderations: 'Ensure interactive elements are clearly distinguishable',
		colorBlindness: 'Test with common color vision deficiencies',
		wcag: {
			normalText: '4.5:1 minimum contrast ratio',
			largeText: '3:1 minimum contrast ratio',
			uiComponents: '3:1 minimum contrast ratio'
		}
	}
};

export const colorEnrichment = {
	slate: {
		meaning: 'Professional, neutral, sophisticated',
		usage: {
			ui: ['Backgrounds', 'Text', 'Borders'],
			bestPractices: 'Excellent for body text and UI elements that need to maintain neutrality',
			combinations: [
				'Pair with vibrant accent colors for contrast',
				'Works well with blues and teals'
			]
		},
		accessibility: {
			textGuidelines: 'Slate-900 on Slate-50 meets WCAG AAA requirements',
			uiConsiderations: 'Ensure sufficient contrast between adjacent shades'
		}
	},
	gray: {
		meaning: 'Balance, calmness, professionalism',
		usage: {
			ui: ['Backgrounds', 'Text', 'Subtle borders'],
			bestPractices: 'Perfect for text and UI elements requiring neutrality',
			combinations: ['Combines well with any accent color', 'Excellent with white space']
		},
		accessibility: {
			textGuidelines: 'Use darker shades (700+) for text on light backgrounds',
			uiConsiderations: 'Maintain sufficient contrast between adjacent gray shades'
		}
	},
	blue: {
		meaning: 'Trust, stability, professionalism',
		usage: {
			ui: ['Primary actions', 'Links', 'Brand elements'],
			bestPractices: 'Use darker shades for text, lighter shades for backgrounds',
			combinations: ['Pair with orange for striking CTAs', 'Works well with grays and whites']
		},
		accessibility: {
			textGuidelines: 'Blue-700 and darker meet WCAG AA on white backgrounds',
			uiConsiderations: 'Avoid blue text on red backgrounds'
		}
	},
	yellow: {
		meaning:
			'Optimistic, energetic, and attention-grabbing. Yellow symbolizes warmth, caution, and positivity',
		usage: {
			ui: [
				'Warning messages (softer than red)',
				'Highlighting important content',
				'Review or pending states',
				'Rating elements',
				'Attention-grabbing accents'
			],
			bestPractices:
				'Use sparingly for maximum impact. Ensure sufficient contrast, especially with white backgrounds',
			combinations: [
				'Pair with dark grays for readability',
				'Use with purple for high contrast',
				'Combine with blue for a professional look',
				'Works well with earth tones'
			]
		},
		accessibility: {
			textGuidelines:
				'Avoid using yellow for text except in very dark shades. Yellow-900 minimum for text on light backgrounds',
			uiConsiderations: 'Consider color blindness implications. Always pair with clear iconography',
			colorBlindness:
				'May be difficult to distinguish for some color-blind users. Use with additional visual cues'
		},
		technical: {
			gamut: 'May appear differently across devices due to wide gamut variations',
			implementation: 'Consider dark mode inversions carefully',
			displayConsiderations: 'Test on multiple screens for consistent visibility'
		}
	},

	purple: {
		meaning: 'Creative, luxurious, and mysterious. Purple suggests innovation and premium quality',
		usage: {
			ui: [
				'Premium features',
				'Creative tools',
				'Alternative primary actions',
				'Active states',
				'Featured content'
			],
			bestPractices:
				'Use for premium or creative features. Works well for highlighting special content',
			combinations: [
				'Excellent with gold for luxury themes',
				'Pair with teal for creative applications',
				'Use with gray for professional balance',
				'Combine with pink for playful interfaces'
			]
		},
		accessibility: {
			textGuidelines:
				'Use purple-800 or darker for text. Ensure sufficient contrast with backgrounds',
			uiConsiderations:
				'Test with both light and dark modes. Consider color blindness implications',
			colorBlindness:
				'May appear similar to blue for some users. Include additional visual differentiation'
		},
		technical: {
			gamut: 'Wide variation across different screens',
			implementation: 'Consider using with complementary yellows for maximum impact',
			displayConsiderations: 'May require adjustment in dark mode'
		}
	},

	orange: {
		meaning:
			'Energetic, friendly, and confident. Orange combines the energy of red with the cheerfulness of yellow',
		usage: {
			ui: [
				'Call-to-action buttons',
				'Promotional content',
				'Beta features',
				'Social sharing',
				'Entertainment elements'
			],
			bestPractices:
				'Use for drawing attention without the urgency of red. Effective for calls-to-action',
			combinations: [
				'Pair with blue for high contrast CTAs',
				'Use with neutral grays for balance',
				'Combine with green for nature themes',
				'Works well with dark blues'
			]
		},
		accessibility: {
			textGuidelines: 'Use orange-800 or darker for text. Test carefully on colored backgrounds',
			uiConsiderations: 'Ensure sufficient contrast for interactive elements',
			colorBlindness: 'May appear muted to some users. Include clear hover/focus states'
		},
		technical: {
			gamut: 'Generally consistent across devices',
			implementation: 'Effective for gradient implementations',
			displayConsiderations: 'Test saturation levels across devices'
		}
	},

	pink: {
		meaning: 'Playful, feminine, and modern. Pink suggests creativity and youthful energy',
		usage: {
			ui: [
				'Accent colors',
				'Brand elements',
				'Featured content',
				'Social media themes',
				'Creative applications'
			],
			bestPractices:
				'Use for standing out in modern interfaces. Effective for brands targeting younger audiences',
			combinations: [
				'Pair with navy for sophistication',
				'Use with gray for modern look',
				'Combine with purple for creative themes',
				'Works well with mint green'
			]
		},
		accessibility: {
			textGuidelines: 'Use pink-700 or darker for text. Ensure readability on light backgrounds',
			uiConsiderations: 'Test in both light and dark modes. Consider color blindness',
			colorBlindness: 'May appear grayish to some users. Include clear visual indicators'
		},
		technical: {
			gamut: 'Can be vibrant across modern displays',
			implementation: 'Consider using for gradient endings',
			displayConsiderations: 'May need adjustment for print materials'
		}
	}
};

export const technicalColorInfo = {
	50: {
		usage: 'Subtle backgrounds, hover states for light themes',
		contrast: 'Usually requires very dark text (800-900)',
		darkMode: 'Often inverted to 900 shade',
		accessibility: 'Rarely suitable for text, excellent for subtle backgrounds'
	},
	100: {
		usage: 'Page backgrounds, card highlights',
		contrast: 'Requires dark text (700-900)',
		darkMode: 'Often inverted to 800 shade',
		accessibility: 'Good for large background areas, poor for text'
	},
	200: {
		usage: 'Selected items in light themes, subtle borders',
		contrast: 'Requires dark text (600-900)',
		darkMode: 'Often inverted to 700 shade',
		accessibility: 'Suitable for decorative elements, not for text'
	},
	300: {
		usage: 'Soft UI elements, secondary backgrounds',
		contrast: 'Requires dark text (500-900)',
		darkMode: 'Often inverted to 600 shade',
		accessibility: 'Good for UI elements, poor for text contrast'
	},
	400: {
		usage: 'Disabled buttons, secondary text in dark themes',
		contrast: 'Requires dark text (700-900) for accessibility',
		darkMode: 'Often inverted to 500 shade',
		accessibility: 'Usually not suitable for primary text'
	},
	500: {
		usage: 'Primary brand colors, button backgrounds',
		contrast: 'Versatile, works with white or very dark text',
		darkMode: 'Often used as-is',
		accessibility: 'Test contrast carefully for text usage'
	},
	600: {
		usage: 'Primary button hover states, text on light backgrounds',
		contrast: 'Good with white text',
		darkMode: 'Often lightened to 400 shade',
		accessibility: 'Generally good for larger text on light backgrounds'
	},
	700: {
		usage: 'Primary text, interactive elements',
		contrast: 'Excellent with white text',
		darkMode: 'Often lightened to 300 shade',
		accessibility: 'Usually meets WCAG AA standards for text on light backgrounds'
	},
	800: {
		usage: 'Heavy text, high-contrast elements',
		contrast: 'Best with white text',
		darkMode: 'Often lightened to 200 shade',
		accessibility: 'Meets WCAG AAA standards for text on light backgrounds'
	},
	900: {
		usage: 'Darkest variant, text colors',
		contrast: 'Highest contrast with white',
		darkMode: 'Often lightened to 100 shade',
		accessibility: 'Excellent for text on light backgrounds'
	}
};

export const colorUseCases = {
	'blue-500': {
		webExamples: ["Facebook's primary brand color", "Twitter's action buttons"],
		commonUses: ['Primary buttons', 'Links', 'Brand accents'],
		industries: ['Tech', 'Finance', 'Healthcare']
	},
	'green-500': {
		webExamples: ["Spotify's brand color", "WhatsApp's theme"],
		commonUses: ['Success states', 'Environmental themes', 'Financial indicators'],
		industries: ['Environment', 'Finance', 'Health']
	}
};

function getShadeDescription(colorName) {
	const [family, shade] = colorName.split('-');

	// Shade-specific descriptions
	const shadeDescriptions = {
		50: `The lightest, most delicate shade of ${family}, perfect for subtle backgrounds and soft highlights`,
		100: `A very light ${family} tone, ideal for page backgrounds and gentle contrasts`,
		200: `A soft ${family} shade that works well for secondary elements and hover states`,
		300: `A light ${family} tone that balances visibility with subtlety`,
		400: `A medium-light ${family} shade, useful for secondary elements and soft accents`,
		500: `A balanced, vibrant ${family} that serves as a primary accent color`,
		600: `A rich ${family} tone that provides strong emphasis without overwhelming`,
		700: `A deep, bold ${family} shade excellent for text and primary actions`,
		800: `An intense ${family} tone that commands attention and ensures readability`,
		900: `The deepest, most powerful ${family} shade, perfect for high-contrast elements`,
		950: `The darkest ${family} variation, offering maximum contrast and impact`
	};

	return shadeDescriptions[shade] || defaultColorInfo.meaning;
}

export function getColorInfo(colorName, colorHex) {
	if (!colorName) return defaultColorInfo;

	const family = colorName.split('-')[0];
	const shade = colorName.split('-')[1];

	const baseInfo = colorEnrichment[family] || defaultColorInfo;
	const specificInfo = colorUseCases[colorName] || {};
	const technicalInfo = technicalColorInfo[shade] || {};

	return {
		...defaultColorInfo,
		...baseInfo,
		...specificInfo,
		meaning: getShadeDescription(colorName), // Use dynamic description
		technical: {
			...baseInfo.technical,
			...technicalInfo
		}
	};
}
