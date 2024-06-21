<script>
    import { pacientes } from '../stores';


    let isSubmitting = false;

    async function addPaciente(event) {
      event.preventDefault();

      if (isSubmitting) return;

      isSubmitting = true;

      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);
  
      await fetch('https://demo-rdcom.vercel.app/paciente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
  
      const res = await fetch('https://demo-rdcom.vercel.app/pacientes');
      const updatedData = await res.json();
      pacientes.set(updatedData);
      event.target.reset();
      isSubmitting = false;
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
    <button class="btn btn-primary" type="submit" disabled={isSubmitting}><i class="fas fa-plus"></i> Añadir Paciente</button>
  </form>


  <style>
    button{
    background-color: #5703ee;
  }
  </style>
  