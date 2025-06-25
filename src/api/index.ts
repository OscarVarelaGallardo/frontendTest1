
const getAllOrders = async () => {
    const url = import.meta.env.VITE_API_URL ;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

export {
    getAllOrders
}