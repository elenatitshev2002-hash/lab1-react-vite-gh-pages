import { useState, useMemo } from 'react'

type User = {
  id: number
  name: string
  email: string
  phone: string
  website: string
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchEmail, setSearchEmail] = useState('')

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = useMemo(() => {
    if (!searchEmail.trim()) return users
    const term = searchEmail.trim().toLowerCase()
    return users.filter(user => user.email.toLowerCase().includes(term))
  }, [users, searchEmail])

  return (
    <div className="user-table-container">
      <button onClick={fetchUsers} disabled={loading}>
        {loading ? 'Загрузка...' : 'Загрузить пользователей'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Поиск — ВСЕГДА виден */}
      <div style={{ marginTop: '16px' }}>
        <label htmlFor="email-search" style={{ display: 'block', marginBottom: '6px' }}>
          Поиск по email:
        </label>
        <input
          id="email-search"
          type="text"
          placeholder="Введите часть email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          style={{
            padding: '6px',
            width: '100%',
            maxWidth: '400px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>

      {/* Таблица — только если есть пользователи */}
      {users.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          {filteredUsers.length > 0 ? (
            <table
              border={1}
              style={{
                borderCollapse: 'collapse',
                width: '100%',
                fontSize: '14px',
              }}
            >
              <thead>
                <tr>
                  <th>Имя</th>
                  <th>Email</th>
                  <th>Телефон</th>
                  <th>Сайт</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <a
                        href={`http://${user.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#007bff', textDecoration: 'none' }}
                      >
                        {user.website}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Нет пользователей с таким email.</p>
          )}
        </div>
      )}
    </div>
  )
}
