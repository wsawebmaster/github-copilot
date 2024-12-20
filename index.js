const http = require('http');
const fs = require('fs');
const path = require('path');

const cardFlags = {
    'Mastercard': '5277959558870483',
    'Visa': '4111111111111111',
    'Elo': '6362970000457013',
    'American Express': '378282246310005',
    'Discover': '6011111111111117',
    'Hipercard': '6062825189259528',
    'JCB': '3530111333300000',
    'Diners Club': '30569309025904',
    'Voyager': '869940697287073',
    'Aura': '5078601870000127985'
};

// Exemplo de uso
const cardNumber = cardFlags['Voyager']; 

if (validateCreditCardNumber(cardNumber)) {
    const cardType = determineCardType(cardNumber);
    console.log(`O cartão é válido e a bandeira é ${cardType}`);
} else {
    console.log('Cartão Inválido');
}

function validateCreditCardNumber(cardNumber) {
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i));
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
}

function determineCardType(cardNumber) {
    const cardTypes = {
        Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        Mastercard: /^5[1-5][0-9]{14}$/,
        Elo: /^((636368)|(438935)|(504175)|(451416)|(636297)|(5067)|(4576)|(4011))\d+$/,
        "American Express": /^3[47][0-9]{13}$/,
        Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        Hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
        JCB: /^(?:2131|1800|35\d{3})\d{11}$/,
        "Diners Club": /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        Voyager: /^8699[0-9]{11}$/,
        Aura: /^50[0-9]{14,17}$/
    };

    for (const [type, pattern] of Object.entries(cardTypes)) {
        if (pattern.test(cardNumber)) {
            return type;
        }
    }
    return 'unknown';
}

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/card-type' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { cardNumber } = JSON.parse(body);
            const cardType = determineCardType(cardNumber);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ cardType }));
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(process.env.PORT || 3000)
