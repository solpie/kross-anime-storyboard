export function ThumbnailGallery({
    snapshots,
    editor,
  }: {
    snapshots: Array<{ pageId: string; snapshot: any; thumbnail?: string }>;
    editor: ReturnType<typeof useEditor>;
  }) {
    return (
      <div
        style={{
          display: 'flex',
          gap: '10px',
          padding: '10px',
          backgroundColor: '#222',
          borderRadius: '4px',
          overflowX: 'auto',
          maxWidth: '80vw',
        }}
      >
        {snapshots.map((snapshot) => (
          <div
            key={snapshot.pageId}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              border: '2px solid #444',
              borderRadius: '4px',
              padding: '4px',
              backgroundColor: '#333',
            }}
            onClick={() => {
              if (!editor.getPage(snapshot.pageId)) {
                editor.createPage({ id: snapshot.pageId, name: snapshot.pageId.toUpperCase() });
              }
              editor.setCurrentPage(snapshot.pageId);
            //   loadSnapshot(editor.store, snapshot.snapshot, snapshot.pageId);
            }}
          >
            {snapshot.thumbnail ? (
              <img
                src={snapshot.thumbnail}
                alt={`Snapshot ${snapshot.pageId}`}
                style={{
                  width: '100px',
                  height: '80px',
                  objectFit: 'contain',
                  backgroundColor: 'white',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100px',
                  height: '80px',
                  backgroundColor: '#555',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                }}
              >
                No Preview
              </div>
            )}
            <div
              style={{
                marginTop: '4px',
                color: '#ec4899',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              {snapshot.pageId}
            </div>
          </div>
        ))}
      </div>
    );
  }