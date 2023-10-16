// renderer.js
const form = document.getElementById('requestForm');
const responseDiv = document.getElementById('response');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

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
  } catch (error) {
    responseDiv.innerText = JSON.stringify({ error: error.message }, null, 2);
  }
});