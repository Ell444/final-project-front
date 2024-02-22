//funzione che mi serve in tutta l'applicazione da mettere nelle chiamate axios, per avere il token nel header della chiamata
export const axiosHeaders = (token) =>{
    return {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    }
}

