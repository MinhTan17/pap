'use client'

import { useState } from 'react'
import { StyleSettings } from '@/types/styles'
import { 
  fontPresets, 
  fontWeightPresets,
  textAlignPresets,
  textDecorationPresets,
  textTransformPresets,
  spacingPresets,
  shadowPresets,
  borderStylePresets,
  iconLibraries
} from '@/data/stylePresets'

export interface StylePanelProps {
  targetElement: string
  currentStyles: StyleSettings
  onStyleChange: (styles: StyleSettings) => void
  onReset: () => void
  onCopyStyle: () => void
  onPasteStyle: () => void
}

export default function StylePanel({
  targetElement,
  currentStyles,
  onStyleChange,
  onReset,
  onCopyStyle,
  onPasteStyle
}: StylePanelProps) {
  console.log('🎨 StylePanel rendered!', { targetElement, currentStyles })
  
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    typography: true,
    textStyling: false,
    colors: false,
    spacing: false,
    border: false,
    icon: false
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 space-y-4 sticky top-4 max-h-[calc(100vh-100px)] overflow-y-auto">
      <div className="flex justify-between items-center border-b pb-3 bg-white sticky top-0 z-10">
        <h3 className="text-lg font-bold text-gray-800">🎨 Style Panel</h3>
        <div className="flex gap-2">
          <button
            onClick={onCopyStyle}
            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
            title="Copy Style"
          >
            📋 Copy
          </button>
          <button
            onClick={onPasteStyle}
            className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
            title="Paste Style"
          >
            📄 Paste
          </button>
          <button
            onClick={onReset}
            className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
            title="Reset to Default"
          >
            🔄 Reset
          </button>
        </div>
      </div>

      <div className="text-xs text-gray-500 mb-2">
        Target: <code className="bg-gray-100 px-1 rounded">{targetElement}</code>
      </div>

      <div className="space-y-2">
        {/* Typography Section */}
        <div className="border rounded-lg">
          <button
            onClick={() => toggleSection('typography')}
            className="w-full flex justify-between items-center p-3 hover:bg-gray-50"
          >
            <span className="font-semibold text-sm">📝 Typography</span>
            <span>{expandedSections.typography ? '▼' : '▶'}</span>
          </button>
          {expandedSections.typography && (
            <div className="p-3 space-y-3 border-t">
              {/* Font Family */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Font Family
                </label>
                <select
                  value={currentStyles.fontFamily || ''}
                  onChange={(e) => onStyleChange({ ...currentStyles, fontFamily: e.target.value })}
                  className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Default</option>
                  {fontPresets.map(font => (
                    <option key={font} value={font} style={{ fontFamily: font }}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>

              {/* Font Size */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Font Size (12-72px)
                </label>
                <div className="flex gap-2">
                  <input
                    type="range"
                    min="12"
                    max="72"
                    value={parseInt(currentStyles.fontSize || '16')}
                    onChange={(e) => onStyleChange({ ...currentStyles, fontSize: `${e.target.value}px` })}
                    className="flex-1"
                  />
                  <input
                    type="number"
                    min="12"
                    max="72"
                    value={parseInt(currentStyles.fontSize || '16')}
                    onChange={(e) => onStyleChange({ ...currentStyles, fontSize: `${e.target.value}px` })}
                    className="w-16 px-2 py-1 text-sm border rounded"
                  />
                </div>
              </div>

              {/* Font Weight */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Font Weight
                </label>
                <select
                  value={currentStyles.fontWeight || '400'}
                  onChange={(e) => onStyleChange({ ...currentStyles, fontWeight: e.target.value })}
                  className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500"
                >
                  {fontWeightPresets.map(weight => (
                    <option key={weight.value} value={weight.value}>
                      {weight.label} ({weight.value})
                    </option>
                  ))}
                </select>
              </div>

              {/* Line Height */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Line Height (1.0-3.0)
                </label>
                <div className="flex gap-2">
                  <input
                    type="range"
                    min="1.0"
                    max="3.0"
                    step="0.1"
                    value={parseFloat(currentStyles.lineHeight?.toString() || '1.5')}
                    onChange={(e) => onStyleChange({ ...currentStyles, lineHeight: parseFloat(e.target.value) })}
                    className="flex-1"
                  />
                  <input
                    type="number"
                    min="1.0"
                    max="3.0"
                    step="0.1"
                    value={parseFloat(currentStyles.lineHeight?.toString() || '1.5')}
                    onChange={(e) => onStyleChange({ ...currentStyles, lineHeight: parseFloat(e.target.value) })}
                    className="w-16 px-2 py-1 text-sm border rounded"
                  />
                </div>
              </div>

              {/* Text Color */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Text Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={currentStyles.color || '#000000'}
                    onChange={(e) => onStyleChange({ ...currentStyles, color: e.target.value })}
                    className="w-12 h-8 border rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={currentStyles.color || ''}
                    onChange={(e) => onStyleChange({ ...currentStyles, color: e.target.value })}
                    placeholder="#000000"
                    className="flex-1 px-2 py-1 text-sm border rounded"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Text Styling Section */}
        <div className="border rounded-lg">
          <button
            onClick={() => toggleSection('textStyling')}
            className="w-full flex justify-between items-center p-3 hover:bg-gray-50"
          >
            <span className="font-semibold text-sm">✏️ Text Styling</span>
            <span>{expandedSections.textStyling ? '▼' : '▶'}</span>
          </button>
          {expandedSections.textStyling && (
            <div className="p-3 space-y-3 border-t">
              {/* Text Align */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Text Alignment
                </label>
                <div className="grid grid-cols-4 gap-1">
                  {textAlignPresets.map(align => (
                    <button
                      key={align.value}
                      onClick={() => onStyleChange({ ...currentStyles, textAlign: align.value as any })}
                      className={`px-2 py-1 text-xs border rounded ${
                        currentStyles.textAlign === align.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-white hover:bg-gray-50'
                      }`}
                      title={align.label}
                    >
                      {align.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Decoration */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Text Decoration
                </label>
                <select
                  value={currentStyles.textDecoration || 'none'}
                  onChange={(e) => onStyleChange({ ...currentStyles, textDecoration: e.target.value as any })}
                  className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500"
                >
                  {textDecorationPresets.map(decoration => (
                    <option key={decoration.value} value={decoration.value}>
                      {decoration.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Text Transform */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Text Transform
                </label>
                <select
                  value={currentStyles.textTransform || 'none'}
                  onChange={(e) => onStyleChange({ ...currentStyles, textTransform: e.target.value as any })}
                  className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500"
                >
                  {textTransformPresets.map(transform => (
                    <option key={transform.value} value={transform.value}>
                      {transform.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Letter Spacing */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Letter Spacing (-2px to 10px)
                </label>
                <div className="flex gap-2">
                  <input
                    type="range"
                    min="-2"
                    max="10"
                    step="0.5"
                    value={parseFloat(currentStyles.letterSpacing || '0')}
                    onChange={(e) => onStyleChange({ ...currentStyles, letterSpacing: `${e.target.value}px` })}
                    className="flex-1"
                  />
                  <input
                    type="number"
                    min="-2"
                    max="10"
                    step="0.5"
                    value={parseFloat(currentStyles.letterSpacing || '0')}
                    onChange={(e) => onStyleChange({ ...currentStyles, letterSpacing: `${e.target.value}px` })}
                    className="w-16 px-2 py-1 text-sm border rounded"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Colors Section */}
        <div className="border rounded-lg">
          <button
            onClick={() => toggleSection('colors')}
            className="w-full flex justify-between items-center p-3 hover:bg-gray-50"
          >
            <span className="font-semibold text-sm">🎨 Colors & Background</span>
            <span>{expandedSections.colors ? '▼' : '▶'}</span>
          </button>
          {expandedSections.colors && (
            <div className="p-3 space-y-3 border-t">
              {/* Background Color */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Background Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={currentStyles.backgroundColor || '#ffffff'}
                    onChange={(e) => onStyleChange({ ...currentStyles, backgroundColor: e.target.value })}
                    className="w-12 h-8 border rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={currentStyles.backgroundColor || ''}
                    onChange={(e) => onStyleChange({ ...currentStyles, backgroundColor: e.target.value })}
                    placeholder="#ffffff"
                    className="flex-1 px-2 py-1 text-sm border rounded"
                  />
                  <button
                    onClick={() => onStyleChange({ ...currentStyles, backgroundColor: undefined })}
                    className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Gradient Background */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Gradient Background
                </label>
                <div className="space-y-2">
                  <select
                    value={currentStyles.backgroundGradient?.type || 'linear'}
                    onChange={(e) => onStyleChange({
                      ...currentStyles,
                      backgroundGradient: {
                        type: e.target.value as 'linear' | 'radial',
                        colors: currentStyles.backgroundGradient?.colors || ['#ffffff', '#000000'],
                        angle: currentStyles.backgroundGradient?.angle || 0
                      }
                    })}
                    className="w-full px-2 py-1 text-sm border rounded"
                  >
                    <option value="linear">Linear</option>
                    <option value="radial">Radial</option>
                  </select>

                  {/* Gradient Colors */}
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-xs text-gray-600">Color 1</label>
                      <input
                        type="color"
                        value={currentStyles.backgroundGradient?.colors?.[0] || '#ffffff'}
                        onChange={(e) => {
                          const colors = [...(currentStyles.backgroundGradient?.colors || ['#ffffff', '#000000'])]
                          colors[0] = e.target.value
                          onStyleChange({
                            ...currentStyles,
                            backgroundGradient: {
                              ...currentStyles.backgroundGradient,
                              type: currentStyles.backgroundGradient?.type || 'linear',
                              colors
                            }
                          })
                        }}
                        className="w-full h-8 border rounded cursor-pointer"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-gray-600">Color 2</label>
                      <input
                        type="color"
                        value={currentStyles.backgroundGradient?.colors?.[1] || '#000000'}
                        onChange={(e) => {
                          const colors = [...(currentStyles.backgroundGradient?.colors || ['#ffffff', '#000000'])]
                          colors[1] = e.target.value
                          onStyleChange({
                            ...currentStyles,
                            backgroundGradient: {
                              ...currentStyles.backgroundGradient,
                              type: currentStyles.backgroundGradient?.type || 'linear',
                              colors
                            }
                          })
                        }}
                        className="w-full h-8 border rounded cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Gradient Angle (for linear) */}
                  {currentStyles.backgroundGradient?.type === 'linear' && (
                    <div>
                      <label className="text-xs text-gray-600">Angle (0-360°)</label>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={currentStyles.backgroundGradient?.angle || 0}
                        onChange={(e) => onStyleChange({
                          ...currentStyles,
                          backgroundGradient: {
                            ...currentStyles.backgroundGradient!,
                            angle: parseInt(e.target.value)
                          }
                        })}
                        className="w-full"
                      />
                      <div className="text-xs text-center">{currentStyles.backgroundGradient?.angle || 0}°</div>
                    </div>
                  )}

                  <button
                    onClick={() => onStyleChange({ ...currentStyles, backgroundGradient: undefined })}
                    className="w-full px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Clear Gradient
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Spacing Section */}
        <div className="border rounded-lg">
          <button
            onClick={() => toggleSection('spacing')}
            className="w-full flex justify-between items-center p-3 hover:bg-gray-50"
          >
            <span className="font-semibold text-sm">📏 Spacing</span>
            <span>{expandedSections.spacing ? '▼' : '▶'}</span>
          </button>
          {expandedSections.spacing && (
            <div className="p-3 space-y-3 border-t">
              {/* Spacing Presets */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Quick Presets
                </label>
                <div className="grid grid-cols-4 gap-1">
                  {Object.keys(spacingPresets).map(preset => (
                    <button
                      key={preset}
                      onClick={() => onStyleChange({
                        ...currentStyles,
                        padding: spacingPresets[preset as keyof typeof spacingPresets].padding,
                        margin: spacingPresets[preset as keyof typeof spacingPresets].margin
                      })}
                      className="px-2 py-1 text-xs border rounded bg-white hover:bg-gray-50 capitalize"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Padding */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Padding (0-100px)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-600">Top</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={parseInt(currentStyles.padding?.top || '0')}
                      onChange={(e) => onStyleChange({
                        ...currentStyles,
                        padding: { ...currentStyles.padding, top: `${e.target.value}px` }
                      })}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Right</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={parseInt(currentStyles.padding?.right || '0')}
                      onChange={(e) => onStyleChange({
                        ...currentStyles,
                        padding: { ...currentStyles.padding, right: `${e.target.value}px` }
                      })}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Bottom</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={parseInt(currentStyles.padding?.bottom || '0')}
                      onChange={(e) => onStyleChange({
                        ...currentStyles,
                        padding: { ...currentStyles.padding, bottom: `${e.target.value}px` }
                      })}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Left</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={parseInt(currentStyles.padding?.left || '0')}
                      onChange={(e) => onStyleChange({
                        ...currentStyles,
                        padding: { ...currentStyles.padding, left: `${e.target.value}px` }
                      })}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Margin */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Margin (0-100px)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-600">Top</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={parseInt(currentStyles.margin?.top || '0')}
                      onChange={(e) => onStyleChange({
                        ...currentStyles,
                        margin: { ...currentStyles.margin, top: `${e.target.value}px` }
                      })}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Right</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={parseInt(currentStyles.margin?.right || '0')}
                      onChange={(e) => onStyleChange({
                        ...currentStyles,
                        margin: { ...currentStyles.margin, right: `${e.target.value}px` }
                      })}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Bottom</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={parseInt(currentStyles.margin?.bottom || '0')}
                      onChange={(e) => onStyleChange({
                        ...currentStyles,
                        margin: { ...currentStyles.margin, bottom: `${e.target.value}px` }
                      })}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Left</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={parseInt(currentStyles.margin?.left || '0')}
                      onChange={(e) => onStyleChange({
                        ...currentStyles,
                        margin: { ...currentStyles.margin, left: `${e.target.value}px` }
                      })}
                      className="w-full px-2 py-1 text-sm border rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Border Radius */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Border Radius (0-50px)
                </label>
                <div className="flex gap-2">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={parseInt(currentStyles.borderRadius || '0')}
                    onChange={(e) => onStyleChange({ ...currentStyles, borderRadius: `${e.target.value}px` })}
                    className="flex-1"
                  />
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={parseInt(currentStyles.borderRadius || '0')}
                    onChange={(e) => onStyleChange({ ...currentStyles, borderRadius: `${e.target.value}px` })}
                    className="w-16 px-2 py-1 text-sm border rounded"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Border & Shadow Section */}
        <div className="border rounded-lg">
          <button
            onClick={() => toggleSection('border')}
            className="w-full flex justify-between items-center p-3 hover:bg-gray-50"
          >
            <span className="font-semibold text-sm">🔲 Border & Shadow</span>
            <span>{expandedSections.border ? '▼' : '▶'}</span>
          </button>
          {expandedSections.border && (
            <div className="p-3 space-y-3 border-t">
              {/* Border Width */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Border Width (0-10px)
                </label>
                <div className="flex gap-2">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={parseInt(currentStyles.borderWidth || '0')}
                    onChange={(e) => onStyleChange({ ...currentStyles, borderWidth: `${e.target.value}px` })}
                    className="flex-1"
                  />
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={parseInt(currentStyles.borderWidth || '0')}
                    onChange={(e) => onStyleChange({ ...currentStyles, borderWidth: `${e.target.value}px` })}
                    className="w-16 px-2 py-1 text-sm border rounded"
                  />
                </div>
              </div>

              {/* Border Style */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Border Style
                </label>
                <select
                  value={currentStyles.borderStyle || 'solid'}
                  onChange={(e) => onStyleChange({ ...currentStyles, borderStyle: e.target.value as any })}
                  className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500"
                >
                  {borderStylePresets.map(style => (
                    <option key={style.value} value={style.value}>
                      {style.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Border Color */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Border Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={currentStyles.borderColor || '#000000'}
                    onChange={(e) => onStyleChange({ ...currentStyles, borderColor: e.target.value })}
                    className="w-12 h-8 border rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={currentStyles.borderColor || ''}
                    onChange={(e) => onStyleChange({ ...currentStyles, borderColor: e.target.value })}
                    placeholder="#000000"
                    className="flex-1 px-2 py-1 text-sm border rounded"
                  />
                </div>
              </div>

              {/* Box Shadow Presets */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Box Shadow
                </label>
                <select
                  value={currentStyles.boxShadow || 'none'}
                  onChange={(e) => onStyleChange({ ...currentStyles, boxShadow: e.target.value })}
                  className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(shadowPresets).map(([key, value]) => (
                    <option key={key} value={value}>
                      {key.charAt(0).toUpperCase() + key.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Shadow */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Custom Shadow
                </label>
                <input
                  type="text"
                  value={currentStyles.boxShadow || ''}
                  onChange={(e) => onStyleChange({ ...currentStyles, boxShadow: e.target.value })}
                  placeholder="0 4px 6px rgba(0,0,0,0.1)"
                  className="w-full px-2 py-1 text-sm border rounded"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Format: x y blur spread color
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Icon Section */}
        <div className="border rounded-lg">
          <button
            onClick={() => toggleSection('icon')}
            className="w-full flex justify-between items-center p-3 hover:bg-gray-50"
          >
            <span className="font-semibold text-sm">⭐ Icon Settings</span>
            <span>{expandedSections.icon ? '▼' : '▶'}</span>
          </button>
          {expandedSections.icon && (
            <div className="p-3 space-y-3 border-t">
              {/* Icon Library */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Icon Library
                </label>
                <select
                  value={currentStyles.icon?.library || 'fontawesome'}
                  onChange={(e) => onStyleChange({
                    ...currentStyles,
                    icon: {
                      ...currentStyles.icon,
                      library: e.target.value as any,
                      name: currentStyles.icon?.name || ''
                    }
                  })}
                  className="w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(iconLibraries).map(([key, lib]) => (
                    <option key={key} value={key}>
                      {lib.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Icon Picker */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Select Icon
                </label>
                <div className="grid grid-cols-5 gap-1 max-h-40 overflow-y-auto border rounded p-2">
                  {iconLibraries[currentStyles.icon?.library || 'fontawesome'].icons.map(icon => (
                    <button
                      key={icon}
                      onClick={() => onStyleChange({
                        ...currentStyles,
                        icon: {
                          ...currentStyles.icon,
                          library: currentStyles.icon?.library || 'fontawesome',
                          name: icon
                        }
                      })}
                      className={`p-2 text-sm border rounded hover:bg-gray-50 ${
                        currentStyles.icon?.name === icon ? 'bg-blue-100 border-blue-500' : ''
                      }`}
                      title={icon}
                    >
                      {icon.substring(0, 3)}
                    </button>
                  ))}
                </div>
                {currentStyles.icon?.name && (
                  <p className="text-xs text-gray-600 mt-1">
                    Selected: {currentStyles.icon.name}
                  </p>
                )}
              </div>

              {/* Icon Size */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Icon Size (16-128px)
                </label>
                <div className="flex gap-2">
                  <input
                    type="range"
                    min="16"
                    max="128"
                    value={parseInt(currentStyles.icon?.size || '24')}
                    onChange={(e) => onStyleChange({
                      ...currentStyles,
                      icon: {
                        ...currentStyles.icon,
                        library: currentStyles.icon?.library || 'fontawesome',
                        name: currentStyles.icon?.name || '',
                        size: `${e.target.value}px`
                      }
                    })}
                    className="flex-1"
                  />
                  <input
                    type="number"
                    min="16"
                    max="128"
                    value={parseInt(currentStyles.icon?.size || '24')}
                    onChange={(e) => onStyleChange({
                      ...currentStyles,
                      icon: {
                        ...currentStyles.icon,
                        library: currentStyles.icon?.library || 'fontawesome',
                        name: currentStyles.icon?.name || '',
                        size: `${e.target.value}px`
                      }
                    })}
                    className="w-16 px-2 py-1 text-sm border rounded"
                  />
                </div>
              </div>

              {/* Icon Color */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Icon Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={currentStyles.icon?.color || '#000000'}
                    onChange={(e) => onStyleChange({
                      ...currentStyles,
                      icon: {
                        ...currentStyles.icon,
                        library: currentStyles.icon?.library || 'fontawesome',
                        name: currentStyles.icon?.name || '',
                        color: e.target.value
                      }
                    })}
                    className="w-12 h-8 border rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={currentStyles.icon?.color || ''}
                    onChange={(e) => onStyleChange({
                      ...currentStyles,
                      icon: {
                        ...currentStyles.icon,
                        library: currentStyles.icon?.library || 'fontawesome',
                        name: currentStyles.icon?.name || '',
                        color: e.target.value
                      }
                    })}
                    placeholder="#000000"
                    className="flex-1 px-2 py-1 text-sm border rounded"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
