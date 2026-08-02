// مكون اختيار نوع المستخدم لتوجيه الرحلة في أقل من ثوانٍ
export default function UserRoleSelector({ onSelectRole }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: 'auto' }}>
      <button 
        onClick={() => onSelectRole('client')}
        style={{ padding: '1rem', background: '#F59E0B', color: '#0F172A', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>
        🛠️ أنا أبحث عن حرفي في الإسماعيلية
      </button>
      <button 
        onClick={() => onSelectRole('provider')}
        style={{ padding: '1rem', background: '#1E293B', color: '#FFFFFF', border: '1px solid #334155', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>
        👷 أنا حرفي وأريد استقبال طلبات عمل
      </button>
    </div>
  );
}
