import { useEffect, useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import Admin from './Admin'

function App() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [token, setToken] = useState<string | null>(null)
	const [role, setRole] = useState<string | null>(null)
	const [candidates, setCandidates] = useState<Array<{ id: number; name: string }>>([])
	const [results, setResults] = useState<Array<{ id: number; name: string; voteCount: number }>>([])
	const { address, isConnected } = useAccount()
	const { connect, connectors, isPending } = useConnect()
	const { disconnect } = useDisconnect()

	useEffect(() => {
		fetch('/vote/candidates')
			.then(r => r.json())
			.then(d => setCandidates(d.candidates || []))
			.catch(() => {})
		fetch('/vote/results')
			.then(r => r.json())
			.then(d => setResults(d.candidates || []))
			.catch(() => {})
	}, [])

	async function onLogin(e: React.FormEvent) {
		e.preventDefault()
		const res = await fetch('/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		})
		if (res.ok) {
			const data = await res.json()
			setToken(data.token)
			setRole(data.role)
		}
	}

	async function vote(candidateId: number) {
		if (!token) return alert('Login dulu')
		const res = await fetch('/vote/cast', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
			body: JSON.stringify({ candidateId })
		})
		const d = await res.json()
		if (!res.ok) return alert(d.message || 'Gagal vote')
		alert(`Berhasil vote. Tx: ${d.txHash}`)
	}

	return (
		<div style={{ maxWidth: 640, margin: '40px auto', fontFamily: 'sans-serif' }}>
			<h1>E-Voting Blockchain (Amoy)</h1>
			<section style={{ marginBottom: 24 }}>
				<h3>Login</h3>
				<form onSubmit={onLogin} style={{ display: 'flex', gap: 8 }}>
					<input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
					<input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
					<button type="submit">Login</button>
				</form>
				{role && <div>Role: {role}</div>}
			</section>

			<section style={{ marginBottom: 24 }}>
				<h3>Wallet</h3>
				{isConnected ? (
					<div>
						<div>Connected: {address}</div>
						<button onClick={() => disconnect()}>Disconnect</button>
					</div>
				) : (
					<button onClick={() => connect({ connector: connectors[0] }) } disabled={isPending}>Connect Wallet</button>
				)}
			</section>

			<section style={{ marginBottom: 24 }}>
				<h3>Daftar Kandidat</h3>
				<ul>
					{candidates.map(c => (
						<li key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
							<span>{c.name}</span>
							<button onClick={() => vote(c.id)}>Vote</button>
						</li>
					))}
				</ul>
				{token && role === 'admin' && <Admin token={token} />}
			</section>

			<section>
				<h3>Hasil (On-Chain)</h3>
				<ul>
					{results.map(r => (
						<li key={r.id}>{r.name}: {r.voteCount}</li>
					))}
				</ul>
			</section>
		</div>
	)
}

export default App
