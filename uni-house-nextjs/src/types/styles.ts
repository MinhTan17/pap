/**
 * Style Settings Interface
 * Defines all possible styling options for content sections
 */

export interface StyleSettings {
    // Typography
    fontFamily?: string
    fontSize?: string
    fontWeight?: string | number
    lineHeight?: string | number
    textAlign?: 'left' | 'center' | 'right' | 'justify'
    textDecoration?: 'none' | 'underline' | 'overline' | 'line-through'
    textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
    letterSpacing?: string
    color?: string

    // Background
    backgroundColor?: string
    backgroundGradient?: {
        type: 'linear' | 'radial'
        colors: string[]
        angle?: number
    }

    // Spacing
    padding?: {
        top?: string
        right?: string
        bottom?: string
        left?: string
    }
    margin?: {
        top?: string
        right?: string
        bottom?: string
        left?: string
    }

    // Border
    borderWidth?: string
    borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none'
    borderColor?: string
    borderRadius?: string

    // Shadow
    boxShadow?: string

    // Icon (for services/products)
    icon?: {
        name: string
        library: 'fontawesome' | 'material' | 'heroicons'
        size?: string
        color?: string
    }
}

/**
 * Icon Configuration Interface
 */
export interface IconConfig {
    name: string
    library: 'fontawesome' | 'material' | 'heroicons'
    size?: string
    color?: string
}

/**
 * Gradient Configuration Interface
 */
export interface GradientConfig {
    type: 'linear' | 'radial'
    colors: string[]
    angle?: number
}

/**
 * Spacing Configuration Interface
 */
export interface SpacingConfig {
    top?: string
    right?: string
    bottom?: string
    left?: string
}
