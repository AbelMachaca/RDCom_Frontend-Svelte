<script>
	import { selectedPaciente, tratamientos } from '../stores';
	import { get } from 'svelte/store';

	export let onTratamientoAdded;

	let isSubmitting = false;

	async function addTratamiento(event) {
		event.preventDefault();

		if (isSubmitting) return;

		isSubmitting = true;

		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);
		const paciente = get(selectedPaciente);

		if (!paciente || !paciente.id) {
			alert('Paciente no seleccionado o ID no encontrado');
			isSubmitting = false;
			return;
		}
		data.paciente_id = paciente.id;

		try {
			const response = await fetch('https://demo-rdcom.vercel.app/tratamiento', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});

			if (!response.ok) {
				const errorData = await response.json();
				alert('Error al crear tratamiento: ' + errorData.error);
				isSubmitting = false;
				return;
			}

			const res = await fetch(`https://demo-rdcom.vercel.app/tratamientos/${paciente.id}`);
			if (!res.ok) {
				const errorData = await res.json();

				alert('Error al obtener tratamientos: ' + errorData.error);
				isSubmitting = false;
				return;
			}

			const updatedTratamientos = await res.json();
			tratamientos.set(updatedTratamientos);
			event.target.reset();

			if (onTratamientoAdded) {
				onTratamientoAdded();
			}
		} catch (error) {
			alert('Error de red');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<form on:submit={addTratamiento} class="form-inline mb-4">
	<div class="form-group mr-2">
		<input
			class="form-control"
			type="text"
			name="nombre"
			placeholder="Nombre del tratamiento"
			required
		/>
	</div>
	<div class="form-group mr-2">
		<input class="form-control" type="text" name="descripcion" placeholder="Descripción" required />
	</div>
	<div class="form-group mr-2">
		<input class="form-control" type="date" name="fecha_inicio" required />
	</div>
	<div class="form-group mr-2">
		<input class="form-control" type="date" name="fecha_fin" required />
	</div>
	<button class="btn btn-primary" type="submit" disabled={isSubmitting}
		><i class="fas fa-plus"></i> Añadir Tratamiento</button
	>
</form>

<style>
	button {
		background-color: #5703ee;
	}
</style>
