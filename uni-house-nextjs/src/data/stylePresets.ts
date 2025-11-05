/**
 * Style Presets
 * Predefined styling options for quick application
 */

export const spacingPresets = {
  none: { 
    padding: { top: '0', right: '0', bottom: '0', left: '0' },
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  },
  small: { 
    padding: { top: '8px', right: '8px', bottom: '8px', left: '8px' },
    margin: { top: '8px', right: '8px', bottom: '8px', left: '8px' }
  },
  medium: { 
    padding: { top: '16px', right: '16px', bottom: '16px', left: '16px' },
    margin: { top: '16px', right: '16px', bottom: '16px', left: '16px' }
  },
  large: { 
    padding: { top: '24px', right: '24px', bottom: '24px', left: '24px' },
    margin: { top: '24px', right: '24px', bottom: '24px', left: '24px' }
  }
}

export const shadowPresets = {
  none: 'none',
  small: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  medium: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
  large: '0 10px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)',
  'extra-large': '0 20px 40px rgba(0,0,0,0.2), 0 10px 20px rgba(0,0,0,0.1)'
}

export const fontPresets = [
  // Web-safe fonts
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia',
  'Verdana',
  'Courier New',
  'Trebuchet MS',
  
  // Google Fonts (popular choices)
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Inter',
  'Playfair Display',
  'Merriweather',
  'Raleway',
  'Ubuntu'
]

export const fontWeightPresets = [
  { label: 'Thin', value: '100' },
  { label: 'Extra Light', value: '200' },
  { label: 'Light', value: '300' },
  { label: 'Normal', value: '400' },
  { label: 'Medium', value: '500' },
  { label: 'Semi Bold', value: '600' },
  { label: 'Bold', value: '700' },
  { label: 'Extra Bold', value: '800' },
  { label: 'Black', value: '900' }
]

export const borderStylePresets = [
  { label: 'None', value: 'none' },
  { label: 'Solid', value: 'solid' },
  { label: 'Dashed', value: 'dashed' },
  { label: 'Dotted', value: 'dotted' }
]

export const textAlignPresets = [
  { label: 'Left', value: 'left', icon: '⬅️' },
  { label: 'Center', value: 'center', icon: '↔️' },
  { label: 'Right', value: 'right', icon: '➡️' },
  { label: 'Justify', value: 'justify', icon: '⬌' }
]

export const textDecorationPresets = [
  { label: 'None', value: 'none' },
  { label: 'Underline', value: 'underline' },
  { label: 'Overline', value: 'overline' },
  { label: 'Line Through', value: 'line-through' }
]

export const textTransformPresets = [
  { label: 'None', value: 'none' },
  { label: 'Uppercase', value: 'uppercase' },
  { label: 'Lowercase', value: 'lowercase' },
  { label: 'Capitalize', value: 'capitalize' }
]

// Icon libraries with sample icons
export const iconLibraries = {
  fontawesome: {
    name: 'Font Awesome',
    icons: [
      'fa-home', 'fa-user', 'fa-cog', 'fa-heart', 'fa-star',
      'fa-check', 'fa-times', 'fa-search', 'fa-envelope', 'fa-phone',
      'fa-calendar', 'fa-camera', 'fa-file', 'fa-folder', 'fa-image',
      'fa-video', 'fa-music', 'fa-shopping-cart', 'fa-credit-card', 'fa-map'
    ]
  },
  material: {
    name: 'Material Icons',
    icons: [
      'home', 'person', 'settings', 'favorite', 'star',
      'check', 'close', 'search', 'mail', 'phone',
      'event', 'camera', 'description', 'folder', 'image',
      'videocam', 'music_note', 'shopping_cart', 'credit_card', 'map'
    ]
  },
  heroicons: {
    name: 'Heroicons',
    icons: [
      'home', 'user', 'cog', 'heart', 'star',
      'check', 'x', 'search', 'mail', 'phone',
      'calendar', 'camera', 'document', 'folder', 'photograph',
      'video-camera', 'music-note', 'shopping-cart', 'credit-card', 'map'
    ]
  }
}
