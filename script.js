let graficaRecta; // Variable global para actualizar la gráfica

// Función para simplificar fracciones
function decimalAFraction(decimal) {
    if (Number.isInteger(decimal)) return decimal.toString();

    let sign = decimal < 0 ? "-" : "";
    decimal = Math.abs(decimal);

    let denominador = 1000000; 
    let numerador = Math.round(decimal * denominador);

    function mcd(a, b) {
        return b ? mcd(b, a % b) : a;
    }

    let divisor = mcd(numerador, denominador);
    numerador /= divisor;
    denominador /= divisor;

    return `${sign}${numerador}/${denominador}`;
}

function calcularTodo() {
    const x1 = parseFloat(document.getElementById("x1").value);
    const y1 = parseFloat(document.getElementById("y1").value);
    const x2 = parseFloat(document.getElementById("x2").value);
    const y2 = parseFloat(document.getElementById("y2").value);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
        document.getElementById("resultado").innerHTML = "⚠️ Por favor, ingresa todos los valores.";
        return;
    }

    let pendiente;
    if (x1 === x2) {
        pendiente = "Indefinida (recta vertical)";
    } else {
        pendiente = decimalAFraction((y2 - y1) / (x2 - x1));
    }

    let ecuacion;
    if (x1 === x2) {
        ecuacion = `x = ${x1}`;
    } else {
        const m = (y2 - y1) / (x2 - x1);
        const b = y1 - m * x1;
        ecuacion = `y = ${decimalAFraction(m)}x + ${decimalAFraction(b)}`;
    }

    const xm = decimalAFraction((x1 + x2) / 2);
    const ym = decimalAFraction((y1 + y2) / 2);

    document.getElementById("resultado").innerHTML = `
        <table>
            <tr><th>Cálculo</th><th>Resultado</th></tr>
            <tr><td>Pendiente (m)</td><td>${pendiente}</td></tr>
            <tr><td>Ecuación de la recta</td><td>${ecuacion}</td></tr>
            <tr><td>Punto medio</td><td>(${xm}, ${ym})</td></tr>
        </table>
    `;

    dibujarGrafica(x1, y1, x2, y2);
}

function dibujarGrafica(x1, y1, x2, y2) {
    const minX = Math.min(x1, x2) - 2;
    const maxX = Math.max(x1, x2) + 2;

    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;

    const datosX = [];
    const datosY = [];
    for (let x = minX; x <= maxX; x += 0.5) {
        datosX.push(x);
        datosY.push(m * x + b);
    }

    const ctx = document.getElementById("grafica").getContext("2d");

    if (graficaRecta) graficaRecta.destroy();

    graficaRecta = new Chart(ctx, {
        type: "line",
        data: {
            labels: datosX,
            datasets: [
                {
                    label: "Recta",
                    data: datosY,
                    borderColor: "#005baa",
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: "Puntos",
                    data: [
                        {x: x1, y: y1},
                        {x: x2, y: y2}
                    ],
                    borderColor: "red",
                    backgroundColor: "red",
                    type: "scatter",
                    pointRadius: 5
                }
            ]
        },
        options: {
            responsive: false,
            maintainAspectRatio: true,
            aspectRatio: 1.4,
            scales: {
                x: { type: 'linear', position: 'bottom', title: { display: true, text: 'X' } },
                y: { title: { display: true, text: 'Y' } }
            }
        }

    });
}
