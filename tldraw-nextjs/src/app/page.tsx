'use client'
import { Tldraw, useEditor ,getSnapshot} from 'tldraw'
import { useState } from 'react'
import { SnapshotToolbar } from './components/savesnap'

export default function Home() {
  return (
    <main className="bg-black">
      <div style={{ position: 'fixed', inset: 0 }}>
        <Tldraw>
          <SnapshotToolbar />
        </Tldraw>
      </div>
      {/* <div style={{ position: 'fixed', inset: 0 }}>
        <Tldraw>
          <CustomToolbar />
        </Tldraw>
      </div> */}
    </main>
  )
}

function CustomToolbar() {
  const editor = useEditor()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
		const snapshot = editor.store.getSnapshot()
		console.log('snapshot:>> ', snapshot);
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(snapshot),
      })
      if (!response.ok) throw new Error('Save failed')
      alert('Drawing saved successfully!')
    } catch (error) {
      console.error('Save error:', error)
      alert('Failed to save drawing')
    } finally {
      setIsSaving(false)
    }
  }

  const handleLoad = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/load')
      if (!response.ok) throw new Error('Load failed')
      const snapshot = await response.json()
      editor.store.loadSnapshot(snapshot)
      alert('Drawing loaded successfully!')
    } catch (error) {
      console.error('Load error:', error)
      alert('Failed to load drawing')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999, // 设置极高的z-index确保在最前
      pointerEvents: 'auto' // 确保可以交互
    }}>
      <div className="flex gap-2 bg-black p-2 rounded-lg border-2 border-pink-500 shadow-lg">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2 bg-pink-500 text-black font-bold rounded hover:bg-pink-600 disabled:opacity-50 transition-colors"
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
        <button
          onClick={handleLoad}
          disabled={isLoading}
          className="px-4 py-2 bg-black text-pink-500 font-bold rounded border-2 border-pink-500 hover:bg-pink-900 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      </div>
    </div>
  )
}