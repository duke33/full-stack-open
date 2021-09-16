const ticketsTotales = 150

const horaInicial = 0

const horaFinal = 7

/////////////////

const horasTotales = horaFinal - horaInicial

const ticketsPorHora = ticketsTotales / horasTotales



for (let index = horaInicial; index < horaFinal; index++) {

    const result = `${index} -${index+1} Tickets= ${(ticketsPorHora*(index-horaInicial+1)) }`
    console.log(result);

}