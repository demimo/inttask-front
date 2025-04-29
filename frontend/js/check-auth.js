document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/checkauth', {
            method: 'GET',
            credentials: 'include' // Важно для отправки cookies
        });
        
        if (!response.ok) {
            window.location.href = '/login';
            return false;
        }

        return true;
    } catch (error) {
        console.error('Auth check failed:', error);
        window.location.href = '/login';
        return false;
    }

});