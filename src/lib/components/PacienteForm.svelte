<script>
    import { pacientes } from '../stores';
  
    async function addPaciente(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);
  
      await fetch('http://localhost:5000/paciente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
  
      const res = await fetch('http://localhost:5000/pacientes');
      const updatedData = await res.json();
      pacientes.set(updatedData);
      event.target.reset();
    }
  </script>
  
  <form on:submit={addPaciente} class="form-inline">
    <div class="form-group mr-2">
      <input class="form-control" type="text" name="nombre" placeholder="Nombre" required>
    </div>
    <div class="form-group mr-2">
      <input class="form-control" type="number" name="edad" placeholder="Edad" required>
    </div>
    <div class="form-group mr-2">
      <input class="form-control" type="text" name="enfermedad" placeholder="Enfermedad" required>
    </div>
    <button class="btn btn-primary" type="submit"><i class="fas fa-plus"></i> Añadir Paciente</button>
  </form>


  <style>
    button{
    background-color: #5703ee;
  }
  </style>
  