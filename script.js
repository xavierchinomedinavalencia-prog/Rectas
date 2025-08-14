let chart;

function fraccionSimplificada(valor) {
    if (Number.isInteger(valor)) {
        return valor.toString();
    }
    try {
        let frac = new Fraction(valor);
        return frac.d === 1 ? `${frac.n}` : `${frac.n}/${frac.d}`;
    } catch {
        return valor.toFixed(2); // Si hay error, mostrar decimal
    }
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
        document.getElementById("pendiente").textContent = "Indefinida (recta vertical)";
        document.getElementById("ecuacion").textContent = "x = " + fraccionSimplificada(x1);
        document.getElementById("puntoMedio").textContent = `(${fraccionSimplificada((x1+x2)/2)}, ${fraccionSimplificada((y1+y2)/2)})`;
        return;
    }

    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;

    document.getElementById("pendiente").textContent = fraccionSimplificada(m);
    document.getElementById("ecuacion").textContent = `y = ${fraccionSimplificada(m)}x + ${fraccionSimplificada(b)}`;
    document.getElementById("puntoMedio").textContent = `(${fraccionSimplificada((x1+x2)/2)}, ${fraccionSimplificada((y1+y2)/2)})`;

    graficarRecta(m, b);
}

function graficarRecta(m, b) {
    const ctx = document.getElementById("grafica").getContext("2d");

    let puntos = [];
    for (let x = -10; x <= 10; x += 0.5) {
        puntos.push({ x: x, y: m * x + b });
    }

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Recta',
                data: puntos,
                borderColor: '#0f766e',
                borderWidth: 2,
                fill: false,
                showLine: true,
                parsing: false
            }]
        },
        options: {
            responsive: false,
            scales: {
                x: { type: 'linear', min: -10, max: 10 },
                y: { min: -10, max: 10 }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}
