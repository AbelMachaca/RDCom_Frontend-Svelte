<script>
	import { selectedPaciente, tratamientos } from '../stores';
	import TratamientoForm from './TratamientoForm.svelte';
	import TratamientosChart from './TratamientosChart.svelte';
	function clearSelection() {
		selectedPaciente.set(null);
	}

	let chartComponent;

	function handleTratamientoAdded() {
		if (chartComponent) {
			chartComponent.drawTratamientosChart();
		}
	}
</script>

{#if $selectedPaciente}
	<div class="detalle card mt-4">
		<div class="card-header">
			<h5>Detalles del Paciente</h5>
			<button class="btn btn-secondary btn-sm" on:click={clearSelection}
				><i class="fas fa-arrow-left"></i> Volver</button
			>
		</div>
		<div class="card-body">
			<p><strong>Nombre:</strong> {$selectedPaciente.nombre}</p>
			<p><strong>Edad:</strong> {$selectedPaciente.edad}</p>
			<p><strong>Enfermedad:</strong> {$selectedPaciente.enfermedad}</p>
		</div>
	</div>
	<div class="card mt-4">
		<div class="card-header">
			<h5>Tratamientos</h5>
		</div>
		<div class="card-body">
			<TratamientoForm onTratamientoAdded={handleTratamientoAdded} />
			<table class="table">
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Descripción</th>
						<th>Fecha de Inicio</th>
						<th>Fecha de Fin</th>
					</tr>
				</thead>
				<tbody>
					{#each $tratamientos as tratamiento}
						<tr>
							<td>{tratamiento.nombre}</td>
							<td>{tratamiento.descripcion}</td>
							<td>{tratamiento.fecha_inicio}</td>
							<td>{tratamiento.fecha_fin}</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<h5>Dias del tratamiento del paciente</h5>
			<TratamientosChart bind:this={chartComponent} />
		</div>
	</div>
{/if}

<style>
	p {
		font-family: 'Raleway', sans-serif;
	}

	h5 {
		font-family: 'Raleway', sans-serif;
		font-size: 30px;
		font-weight: 800;
		line-height: 56px;
		color: #060221;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		padding: 0.75rem;
		text-align: left;
		border-bottom: 1px solid #ddd;
	}

	th {
		background-color: #f2f2f2;
	}

	tr:hover {
		background-color: #f5f5f5;
	}
</style>
