export default function AdminPage() {
  return (
    <div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.location.href = '/admin/index.html';
          `,
        }}
      />
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Redirecting to Admin Panel...</h1>
        <p>If you&apos;re not redirected automatically, <a href="/admin/index.html">click here</a></p>
      </div>
    </div>
  )
} 