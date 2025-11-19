'use client'

import { useState, useEffect } from 'react';
import { runLayoutValidation, RESPONSIVE_TEST_POINTS } from '@/utils/layout-validator';

export default function TestLayoutPage() {
  const [validationResults, setValidationResults] = useState<any>(null);
  const [currentWidth, setCurrentWidth] = useState(1024);

  useEffect(() => {
    const handleResize = () => {
      const results = runLayoutValidation();
      setValidationResults(results);
      setCurrentWidth(window.innerWidth);
    };

    // Initial validation
    handleResize();

    // Listen for resize events
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const testBreakpoint = (width: number) => {
    // Temporarily resize window for testing
    const originalWidth = window.innerWidth;
    
    // Simulate different screen sizes
    document.documentElement.style.width = `${width}px`;
    
    setTimeout(() => {
      const results = runLayoutValidation();
      setValidationResults(results);
      
      // Restore original width
      document.documentElement.style.width = '';
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Header Layout Validation Test
        </h1>

        {/* Current Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Status</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{currentWidth}px</div>
              <div className="text-sm text-gray-600">Screen Width</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${validationResults?.noWrap ? 'text-green-600' : 'text-red-600'}`}>
                {validationResults?.noWrap ? '✓' : '✗'}
              </div>
              <div className="text-sm text-gray-600">No Wrap</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${validationResults?.noOverflow ? 'text-green-600' : 'text-red-600'}`}>
                {validationResults?.noOverflow ? '✓' : '✗'}
              </div>
              <div className="text-sm text-gray-600">No Overflow</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">
                {validationResults?.layoutState?.navigationSpacing || 'N/A'}
              </div>
              <div className="text-sm text-gray-600">Spacing</div>
            </div>
          </div>
        </div>

        {/* Layout State Details */}
        {validationResults?.layoutState && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Layout State</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${validationResults.layoutState.showFullLogo ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>Full Logo</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${validationResults.layoutState.showDesktopNav ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>Desktop Nav</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${validationResults.layoutState.showMobileButton ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>Mobile Button</span>
              </div>
            </div>
          </div>
        )}

        {/* Breakpoint Testing */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Test Breakpoints</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {RESPONSIVE_TEST_POINTS.map((point) => (
              <button
                key={point.name}
                onClick={() => testBreakpoint(point.width)}
                className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="font-semibold">{point.name}</div>
                <div className="text-sm text-gray-600">{point.width}px</div>
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Testing Instructions
          </h3>
          <ul className="text-blue-800 space-y-1">
            <li>• Resize your browser window to test different breakpoints</li>
            <li>• Click the breakpoint buttons to simulate different screen sizes</li>
            <li>• Check that header elements don't wrap to new lines</li>
            <li>• Verify that no elements overflow the container</li>
            <li>• Test navigation dropdown functionality at different sizes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}