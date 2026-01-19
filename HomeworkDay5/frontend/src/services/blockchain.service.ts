export const getBlockchainValue = async () => {
    try {
        // Hapus '/api/' karena route di NestJS lo langsung /blockchain/value
        const response = await fetch('http://localhost:3000/blockchain/value'); 
        
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error fetching blockchain value:', error);
        throw error;
    }
};