'use client'
import { useCallback, useEffect, useState } from 'react'
import { TLEditorSnapshot, Tldraw, getSnapshot, loadSnapshot, useEditor } from 'tldraw'
import 'tldraw/tldraw.css'

export function SnapshotToolbar() {
  const editor = useEditor()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showCheckMark, setShowCheckMark] = useState(false)

  const save = useCallback(async () => {
    setIsSaving(true)
    try {
      const { document, session } = getSnapshot(editor.store)
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ document, session }),
      })
      
      if (!response.ok) throw new Error('Save failed')
      setShowCheckMark(true)
    } catch (error) {
      console.error('Save error:', error)
      alert('Failed to save drawing')
    } finally {
      setIsSaving(false)
    }
  }, [editor])

  const load = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/load')
      if (!response.ok) throw new Error('Load failed')
      const snapshot = await response.json()
      loadSnapshot(editor.store, snapshot)
    } catch (error) {
      console.error('Load error:', error)
      alert('Failed to load drawing')
    } finally {
      setIsLoading(false)
    }
  }, [editor])

  useEffect(() => {
    if (showCheckMark) {
      const timeout = setTimeout(() => {
        setShowCheckMark(false)
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [showCheckMark])

  return (
    <div style={{ 
      position: 'absolute',
      top: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      pointerEvents: 'all',
      display: 'flex',
      gap: '10px',
      backgroundColor: 'black',
      padding: '8px',
      borderRadius: '8px',
      border: '2px solid #ec4899'
    }}>
      <span
        style={{
          display: 'inline-block',
          transition: 'transform 0.2s ease, opacity 0.2s ease',
          transform: showCheckMark ? `scale(1)` : `scale(0.5)`,
          opacity: showCheckMark ? 1 : 0,
          color: '#ec4899',
          marginRight: '8px'
        }}
      >
        Saved ✅
      </span>
      <button
        onClick={save}
        disabled={isSaving}
        style={{
          padding: '6px 12px',
          backgroundColor: '#ec4899',
          color: 'black',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer',
          opacity: isSaving ? 0.7 : 1
        }}
      >
        {isSaving ? 'Saving...' : 'Save Snapshot'}
      </button>
      <button 
        onClick={load}
        disabled={isLoading}
        style={{
          padding: '6px 12px',
          backgroundColor: 'black',
          color: '#ec4899',
          border: '2px solid #ec4899',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer',
          opacity: isLoading ? 0.7 : 1
        }}
      >
        {isLoading ? 'Loading...' : 'Load Snapshot'}
      </button>
    </div>
  )
}

export default function SnapshotExample() {
  return (
    <div className="tldraw__editor" style={{ position: 'fixed', inset: 0 }}>
      <Tldraw
        components={{
          SharePanel: SnapshotToolbar,
        }}
      >
        <SnapshotToolbar />
      </Tldraw>
    </div>
  )
}