<!-- src/lib/components/Spinner.svelte -->
<style>
    .spinner {
      border: 16px solid #f3f3f3;
      border-top: 16px solid rgba(99,19,178,255);
      border-radius: 50%;
      width: 120px;
      height: 120px;
      animation: spin 2s linear infinite;
      margin: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
  
  <div class="spinner"></div>
  