// Función para simplificar fracciones
function decimalAFraction(decimal) {
    if (Number.isInteger(decimal)) return decimal.toString();

    let sign = decimal < 0 ? "-" : "";
    decimal = Math.abs(decimal);

    let denominador = 1000000; // Precisión
    let numerador = Math.round(decimal * denominador);

    // Simplificar con MCD
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

    // Pendiente
    let pendiente;
    if (x1 === x2) {
        pendiente = "Indefinida (recta vertical)";
    } else {
        pendiente = decimalAFraction((y2 - y1) / (x2 - x1));
    }

    // Ecuación de la recta
    let ecuacion;
    if (x1 === x2) {
        ecuacion = `x = ${x1}`;
    } else {
        const m = (y2 - y1) / (x2 - x1);
        const b = y1 - m * x1;
        ecuacion = `y = ${decimalAFraction(m)}x + ${decimalAFraction(b)}`;
    }

    // Punto medio
    const xm = decimalAFraction((x1 + x2) / 2);
    const ym = decimalAFraction((y1 + y2) / 2);

    // Mostrar en tabla
    document.getElementById("resultado").innerHTML = `
        <table>
            <tr><th>Cálculo</th><th>Resultado</th></tr>
            <tr><td>Pendiente (m)</td><td>${pendiente}</td></tr>
            <tr><td>Ecuación de la recta</td><td>${ecuacion}</td></tr>
            <tr><td>Punto medio</td><td>(${xm}, ${ym})</td></tr>
        </table>
    `;
}
