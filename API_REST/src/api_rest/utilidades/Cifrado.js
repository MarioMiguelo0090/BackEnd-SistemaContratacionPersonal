import crypto from 'crypto'

const ALGORITMO =  process.env.ALGORITMO
const CLAVE = Buffer.from(process.env.CLAVE, 'hex')
const LONGITUD = parseInt(process.env.LONGITUD)

export function Cifrar(texto){
    if (texto !== null && texto !== undefined && texto !== ""){
        const textoCadena = String(texto);
        const iv = crypto.randomBytes(LONGITUD);
        const cipher = crypto.createCipheriv(ALGORITMO,CLAVE,iv);
        const cifrado = Buffer.concat([
            cipher.update(textoCadena,'utf-8'),
            cipher.final()
        ])
        return `${iv.toString('hex')}:${cifrado.toString('hex')}`;
    }
    return null;
}

export function Descifrar(texto){
    if(texto !== null && texto !== undefined && texto !== ""){
        const [ivHex, cifradoHex] = texto.split(':');
        const iv       = Buffer.from(ivHex, 'hex');
        const cifrado  = Buffer.from(cifradoHex, 'hex');
        const decipher = crypto.createDecipheriv(ALGORITMO, CLAVE, iv);
        
        const resultado = Buffer.concat([
            decipher.update(cifrado),
            decipher.final()
        ]).toString('utf8');
        const posibleNumero = Number(resultado);
        return !isNaN(posibleNumero) && resultado.trim() !== '' 
            ? posibleNumero 
            : resultado;
    }
    return null;
}