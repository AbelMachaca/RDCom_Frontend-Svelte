<script>
	import { pacientes, selectedPaciente, tratamientos } from '../stores';

	async function selectPaciente(id) {
		const resPaciente = await fetch(`https://demo-rdcom.vercel.app/paciente/${id}`);
		const pacienteData = await resPaciente.json();
		selectedPaciente.set(pacienteData);

		const resTratamientos = await fetch(`https://demo-rdcom.vercel.app/tratamientos/${id}`);
		const tratamientosData = await resTratamientos.json();
		tratamientos.set(tratamientosData);
	}
</script>

<table>
	<thead>
		<tr>
			<th>Nombre</th>
			<th>Edad</th>
			<th>Enfermedad</th>
			<th>Acción</th>
		</tr>
	</thead>
	<tbody>
		{#each $pacientes as paciente}
			<tr>
				<td>{paciente.nombre}</td>
				<td>{paciente.edad}</td>
				<td>{paciente.enfermedad}</td>
				<td><button on:click={() => selectPaciente(paciente.id)}>Ver detalles</button></td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
	}
	th,
	td {
		border: 1px solid #ddd;
		padding: 8px;
	}
	th {
		background-color: #f2f2f2;
		text-align: left;
	}
	tr:hover {
		background-color: #f5f5f5;
	}
</style>
