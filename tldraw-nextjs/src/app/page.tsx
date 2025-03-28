'use client'
import { Tldraw } from 'tldraw'
import { PageControl } from './components/PageControl'
import { SnapshotToolbar } from './components/SnapshotToolbar'

export default function Home() {
  return (
    <main className="bg-black">
      <div style={{ position: 'fixed', inset: 0 }}>
        <Tldraw>
          <SnapshotToolbar />
        </Tldraw>
      </div>
    </main>
  )
}