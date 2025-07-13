// Scrivi una funzione retry<T>(fn: () => Promise<T>, retries: number): Promise<T> che:
// esegue la funzione fn
// se fallisce (Promise.reject), riprova fino a un massimo di retries volte
// se alla fine fallisce sempre, rilancia l’ultimo errore

async function retry<T>(fn: () => Promise<T>, retries: number): Promise<T> {
    let lastError: unknown;

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            return await fn();
        } catch (err) {
            lastError = err;
        }
    }

    throw lastError;
}
