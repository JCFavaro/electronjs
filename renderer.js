// renderer.js
const form = document.getElementById('requestForm');
const responseDiv = document.getElementById('response');4
const { ipcRenderer } = require('electron');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const NOTIFICATION_TITLE = 'Buscando consulta'
  const NOTIFICATION_BODY = 'Cargando ...'  
  new window.Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })


  const url = document.getElementById('url').value.trim();
  const method = document.getElementById('method').value;
  const body = document.getElementById('body').value;

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    });

    const data = await response.json();
    responseDiv.innerText = JSON.stringify(data, null, 2);
    ipcRenderer.invoke('showDialog',"Consulta exitosa. Respuesta recibida.",false)
    
  } catch (error) {
    //responseDiv.innerText = JSON.stringify({ error: error.message }, null, 2);
    ipcRenderer.invoke('showDialog',"Consulta Fallida.",true)

  }
});