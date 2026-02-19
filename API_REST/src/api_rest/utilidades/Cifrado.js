import crypto from 'crypto'

const ALGORITMO =  process.env.ALGORITMO
const CLAVE = Buffer.from(process.env.CLAVE, 'hex')
const LONGITUD = parseInt(process.env.LONGITUD)

export function Cifrar(texto){
    const iv = crypto.randomBytes(LONGITUD);
    const cipher = crypto.createCipheriv(ALGORITMO,CLAVE,iv);
    const cifrado = Buffer.concat([
        cipher.update(texto,'utf-8'),
        cipher.final()
    ])
    return `${iv.toString('hex')}:${cifrado.toString('hex')}`;
}

export function Descifrar(texto){
    const [ivHex, cifradoHex] = texto.split(':');
    const iv       = Buffer.from(ivHex, 'hex');
    const cifrado  = Buffer.from(cifradoHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITMO, CLAVE, iv);
    
    return Buffer.concat([
        decipher.update(cifrado),
        decipher.final()
    ]).toString('utf8');
}