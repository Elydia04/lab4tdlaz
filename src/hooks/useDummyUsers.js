import { useCallback, useEffect, useState } from 'react'
import { fetchUser, fetchUsers, getApiErrorMessage } from '../api/dummyApi'

export function useUsers(limit = 12) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  const reload = useCallback(() => {
    setLoading(true)
    setError('')
    setReloadKey((key) => key + 1)
  }, [])

  useEffect(() => {
    let cancelled = false

    fetchUsers(limit)
      .then((data) => {
        if (!cancelled) {
          setUsers(data)
          setError('')
        }
      })
      .catch((err) => {
        if (!cancelled) setError(getApiErrorMessage(err))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [limit, reloadKey])

  return { users, loading, error, reload }
}

export function useUser(id = 1) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  const reload = useCallback(() => {
    setLoading(true)
    setError('')
    setReloadKey((key) => key + 1)
  }, [])

  useEffect(() => {
    let cancelled = false

    fetchUser(id)
      .then((data) => {
        if (!cancelled) {
          setUser(data)
          setError('')
        }
      })
      .catch((err) => {
        if (!cancelled) setError(getApiErrorMessage(err))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id, reloadKey])

  return { user, loading, error, reload }
}
