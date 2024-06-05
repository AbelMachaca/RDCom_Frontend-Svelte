<script>
    import { selectedPaciente, tratamientos } from '../stores';
    import { get } from 'svelte/store';
  
    export let onTratamientoAdded;
  
    async function addTratamiento(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);
      const paciente = get(selectedPaciente);
  
      data.paciente_id = paciente.sf_id;
      data.sf_id = paciente.sf_id;
  
      await fetch('http://localhost:5000/tratamiento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
  
      const res = await fetch(`http://localhost:5000/tratamientos/${paciente.id}`);
      const updatedTratamientos = await res.json();
      tratamientos.set(updatedTratamientos);
      event.target.reset();
  
      if (onTratamientoAdded) {
        onTratamientoAdded();
      }
    }
  </script>
  
  <form on:submit={addTratamiento} class="form-inline mb-4">
    <div class="form-group mr-2">
      <input class="form-control" type="text" name="nombre" placeholder="Nombre del tratamiento" required>
    </div>
    <div class="form-group mr-2">
      <input class="form-control" type="text" name="descripcion" placeholder="Descripción" required>
    </div>
    <div class="form-group mr-2">
      <input class="form-control" type="date" name="fecha_inicio" required>
    </div>
    <div class="form-group mr-2">
      <input class="form-control" type="date" name="fecha_fin" required>
    </div>
    <button class="btn btn-primary" type="submit"><i class="fas fa-plus"></i> Añadir Tratamiento</button>
  </form>
  
<style>
  button{
    background-color: #5703ee;
  }
</style>