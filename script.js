let chart;

function fraccionSimplificada(valor) {
    let frac = new Fraction(valor);
    return frac.d === 1 ? `${frac.n}` : `${frac.n}/${frac.d}`;
}

function calcularRecta() {
    const x1 = parseFloat(document.getElementById("x1").value);
    const y1 = parseFloat(document.getElementById("y1").value);
    const x2 = parseFloat(document.getElementById("x2").value);
    const y2 = parseFloat(document.getElementById("y2").value);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
        alert("Por favor, ingresa todos los valores");
        return;
    }

    if (x1 === x2) {
        alert("La pendiente es indefinida (recta vertical)");
        return;
    }

    // Calcular pendiente
    const m = (y2 - y1) / (x2 - x1);
    document.getElementById("pendiente").textContent = fraccionSimplificada(m);

    // Calcular intercepto
    const b = y1 - m * x1;
    document.getElementById("ecuacion").textContent = `y = ${fraccionSimplificada(m)}x + ${fraccionSimplificada(b)}`;

    // Calcular punto medio
    const xm = (x1 + x2) / 2;
    const ym = (y1 + y2) / 2;
    document.getElementById("puntoMedio").textContent = `(${fraccionSimplificada(xm)}, ${fraccionSimplificada(ym)})`;

    // Graficar
    graficarRecta(m, b, x1, x2);
}

function graficarRecta(m, b, x1, x2) {
    const ctx = document.getElementById("grafica").getContext("2d");

    let xValores = [];
    let yValores = [];
    for (let x = -10; x <= 10; x += 0.5) {
        xValores.push(x);
        yValores.push(m * x + b);
    }

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValores,
            datasets: [{
                label: 'Recta',
                data: yValores,
                borderColor: '#0f766e',
                borderWidth: 2,
                fill: false,
                tension: 0
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: true,
            aspectRatio: 1.4,
            scales: {
                x: { type: 'linear', position: 'bottom', min: -10, max: 10 },
                y: { min: -10, max: 10 }
            }
        }
    });
}
