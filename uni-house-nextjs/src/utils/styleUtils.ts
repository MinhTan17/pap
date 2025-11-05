import { StyleSettings } from '@/types/styles'
import React from 'react'

/**
 * Convert StyleSettings object to React.CSSProperties
 * @param styles - StyleSettings object
 * @returns React.CSSProperties object for inline styling
 */
export function styleSettingsToCSS(styles: StyleSettings): React.CSSProperties {
  const cssProps: React.CSSProperties = {}
  
  // Typography
  if (styles.fontFamily) cssProps.fontFamily = styles.fontFamily
  if (styles.fontSize) cssProps.fontSize = styles.fontSize
  if (styles.fontWeight) cssProps.fontWeight = styles.fontWeight
  if (styles.lineHeight) cssProps.lineHeight = styles.lineHeight
  if (styles.textAlign) cssProps.textAlign = styles.textAlign
  if (styles.textDecoration) cssProps.textDecoration = styles.textDecoration
  if (styles.textTransform) cssProps.textTransform = styles.textTransform
  if (styles.letterSpacing) cssProps.letterSpacing = styles.letterSpacing
  if (styles.color) cssProps.color = styles.color
  
  // Background
  if (styles.backgroundColor) cssProps.backgroundColor = styles.backgroundColor
  if (styles.backgroundGradient) {
    const { type, colors, angle } = styles.backgroundGradient
    if (type === 'linear') {
      cssProps.background = `linear-gradient(${angle || 0}deg, ${colors.join(', ')})`
    } else {
      cssProps.background = `radial-gradient(circle, ${colors.join(', ')})`
    }
  }
  
  // Spacing
  if (styles.padding) {
    cssProps.paddingTop = styles.padding.top
    cssProps.paddingRight = styles.padding.right
    cssProps.paddingBottom = styles.padding.bottom
    cssProps.paddingLeft = styles.padding.left
  }
  if (styles.margin) {
    cssProps.marginTop = styles.margin.top
    cssProps.marginRight = styles.margin.right
    cssProps.marginBottom = styles.margin.bottom
    cssProps.marginLeft = styles.margin.left
  }
  
  // Border
  if (styles.borderWidth && styles.borderStyle && styles.borderColor) {
    cssProps.border = `${styles.borderWidth} ${styles.borderStyle} ${styles.borderColor}`
  }
  if (styles.borderRadius) cssProps.borderRadius = styles.borderRadius
  
  // Shadow
  if (styles.boxShadow) cssProps.boxShadow = styles.boxShadow
  
  return cssProps
}

/**
 * Copy styles to clipboard (sessionStorage)
 * @param styles - StyleSettings to copy
 */
export function copyStylesToClipboard(styles: StyleSettings): void {
  try {
    sessionStorage.setItem('copiedStyles', JSON.stringify(styles))
  } catch (error) {
    console.error('Failed to copy styles to clipboard:', error)
    throw new Error('Failed to copy styles')
  }
}

/**
 * Paste styles from clipboard (sessionStorage)
 * @returns StyleSettings or null if not found
 */
export function pasteStylesFromClipboard(): StyleSettings | null {
  try {
    const stored = sessionStorage.getItem('copiedStyles')
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error('Failed to paste styles from clipboard:', error)
    return null
  }
}

/**
 * Merge two StyleSettings objects
 * @param base - Base styles
 * @param override - Override styles
 * @returns Merged StyleSettings
 */
export function mergeStyles(base: StyleSettings, override: StyleSettings): StyleSettings {
  return {
    ...base,
    ...override,
    padding: override.padding || base.padding,
    margin: override.margin || base.margin,
    backgroundGradient: override.backgroundGradient || base.backgroundGradient,
    icon: override.icon || base.icon
  }
}

/**
 * Get default empty StyleSettings
 * @returns Empty StyleSettings object
 */
export function getDefaultStyles(): StyleSettings {
  return {}
}
