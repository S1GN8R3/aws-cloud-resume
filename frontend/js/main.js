// AWS Cloud Resume visitor counter
// API Gateway HTTP API -> Lambda -> DynamoDB
const visitorApi = 'https://xjhg9uh5y0.execute-api.us-east-2.amazonaws.com/visitors';

window.addEventListener('DOMContentLoaded', getVisitCount);

async function getVisitCount() {
  const counter = document.getElementById('counter');
  if (!counter) return;

  counter.textContent = '…';

  try {
    const response = await fetch(visitorApi, { method: 'GET', cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    // Expected Lambda response: { "count": 123 }
    const count = data.count;
    if (typeof count !== 'number' && !(typeof count === 'string' && /^\d+$/.test(count))) {
      throw new Error('API response did not contain a numeric count');
    }

    counter.textContent = String(count);
  } catch (error) {
    console.error('AWS visitor counter error:', error);
    counter.textContent = 'N/A';
  }
}
