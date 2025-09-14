import { useState } from 'react'

export default function Admin({ token }: { token: string }) {
	const [name, setName] = useState('')
	const [busy, setBusy] = useState(false)

	async function createCandidate(e: React.FormEvent) {
		e.preventDefault()
		if (!name) return
		setBusy(true)
		try {
			const res = await fetch('/admin/candidates', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
				body: JSON.stringify({ name })
			})
			const d = await res.json()
			if (!res.ok) return alert(d.message || 'Gagal membuat kandidat')
			alert(`Kandidat dibuat. Tx: ${d.txHash || '-'}`)
			setName('')
		} finally {
			setBusy(false)
		}
	}

	async function startVoting() {
		setBusy(true)
		try {
			const res = await fetch('/admin/start', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } })
			const d = await res.json()
			if (!res.ok) return alert(d.message || 'Gagal memulai voting')
			alert(`Voting dimulai. Tx: ${d.txHash || '-'}`)
		} finally {
			setBusy(false)
		}
	}

	async function closeVoting() {
		setBusy(true)
		try {
			const res = await fetch('/admin/close', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } })
			const d = await res.json()
			if (!res.ok) return alert(d.message || 'Gagal menutup voting')
			alert(`Voting ditutup. Tx: ${d.txHash || '-'}`)
		} finally {
			setBusy(false)
		}
	}

	return (
		<div style={{ border: '1px solid #ddd', padding: 16, borderRadius: 8, marginTop: 24 }}>
			<h3>Admin Panel</h3>
			<form onSubmit={createCandidate} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
				<input placeholder="Nama kandidat" value={name} onChange={e => setName(e.target.value)} />
				<button type="submit" disabled={busy}>Tambah Kandidat</button>
			</form>
			<div style={{ display: 'flex', gap: 8 }}>
				<button onClick={startVoting} disabled={busy}>Mulai Voting</button>
				<button onClick={closeVoting} disabled={busy}>Tutup Voting</button>
			</div>
		</div>
	)
}
