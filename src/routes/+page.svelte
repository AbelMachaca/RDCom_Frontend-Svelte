<script>
	import { onMount } from 'svelte';
	import { pacientes } from '../lib/stores';
	import PacienteForm from '../lib/components/PacienteForm.svelte';
	import PacienteList from '../lib/components/PacienteList.svelte';
	import PacienteDetails from '../lib/components/PacienteDetails.svelte';
	import Sidebar from '../lib/components/Sidebar.svelte';
	import Spinner from '../lib/components/Spinner.svelte';

	let loading = true;

	onMount(async () => {
		try {
			const res = await fetch('https://demo-rdcom.vercel.app/pacientes');
			const data = await res.json();
			pacientes.set(data);
		} catch (error) {
			console.error('Error fetching pacientes:', error);
		} finally {
			loading = false;
		}
	});
</script>

<div class="app">
	<Sidebar />
	<div style="width: 100%;">
		<div class="asd">
			<main class="container mt-5">
				{#if loading}
					<Spinner />
				{:else}
					<div class="detalle card mt-4">
						<div class="card-header pt-4">
							<h2 class="mb-4">Lista de Pacientes</h2>
						</div>

						<PacienteList />
						<div class="card-header">
							<h1 class="mb-4 mt-4">Gestión de Pacientes</h1>
							<div class="form-section">
								<PacienteForm />
							</div>
						</div>
						<PacienteDetails />
					</div>
				{/if}
			</main>
		</div>
	</div>
</div>

<style>
	.app {
		display: flex;
	}
	.asd {
		margin-left: 250px;
		padding: 1rem;
	}
	h1,
	h2 {
		font-family: 'Raleway', sans-serif;
		font-size: 30px;
		font-weight: 800;
		line-height: 25px;
		color: #060221;
	}
</style>
