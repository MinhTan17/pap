'use client'

import { useState } from 'react'
import { uploadToCloudinary } from '@/lib/cloudinary-upload'

export default function TestUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`])
    console.log(message)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setResult(null)
      setLogs([])
      addLog(`File selected: ${e.target.files[0].name} (${(e.target.files[0].size / 1024).toFixed(2)} KB)`)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setResult(null)
    addLog('Starting upload...')

    try {
      addLog('Calling uploadToCloudinary...')
      const uploadResult = await uploadToCloudinary(file, 'test')
      
      addLog(`Upload completed: ${uploadResult.success ? 'SUCCESS' : 'FAILED'}`)
      setResult(uploadResult)
    } catch (error: any) {
      addLog(`Error: ${error.message}`)
      setResult({ success: false, error: error.message })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Test Cloudinary Upload</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        style={{
          padding: '10px 20px',
          backgroundColor: uploading ? '#ccc' : '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: uploading ? 'not-allowed' : 'pointer',
        }}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {logs.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Logs:</h3>
          <pre style={{
            backgroundColor: '#f5f5f5',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '12px',
            overflow: 'auto',
          }}>
            {logs.join('\n')}
          </pre>
        </div>
      )}

      {result && (
        <div style={{ marginTop: '20px' }}>
          <h3>Result:</h3>
          <pre style={{
            backgroundColor: result.success ? '#d4edda' : '#f8d7da',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '12px',
            overflow: 'auto',
          }}>
            {JSON.stringify(result, null, 2)}
          </pre>

          {result.success && result.url && (
            <div style={{ marginTop: '10px' }}>
              <h4>Uploaded Image:</h4>
              <img
                src={result.url}
                alt="Uploaded"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
