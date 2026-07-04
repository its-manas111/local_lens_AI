import { useState, useEffect } from 'react';
import { localHosts } from '../data/localHosts';

// Phase 2 — Firestore swap: replace the setHosts(localHosts) line with:
//   const snap = await getDocs(query(collection(db, 'hosts'), orderBy('rating', 'desc')));
//   setHosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
// Components that consume this hook require no changes.

export function useLocalHosts() {
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setHosts(localHosts);
    setLoading(false);
  }, []);

  return { hosts, loading };
}