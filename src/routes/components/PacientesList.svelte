<script>
	import { createEventDispatcher } from 'svelte';

	export let pacientes;
	const dispatch = createEventDispatcher();

	function selectPaciente(id) {
		dispatch('select', id);
	}
</script>

<ul class="list-group">
	{#each $pacientes as paciente}
		<button
			class="list-group-item list-group-item-action paciente-item"
			on:click={() => selectPaciente(paciente.id)}
		>
			{paciente.nombre} - {paciente.edad} - {paciente.enfermedad}
		</button>
	{/each}
</ul>

<style>
	.paciente-item {
		cursor: pointer;
		margin: 0.5rem 0;
		padding: 0.5rem;
	}
	.paciente-item:hover {
		background-color: #f0f0f0;
	}
</style>
