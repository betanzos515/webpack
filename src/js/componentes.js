import '../css/componentes.css';

export const saludar = ( nombre )=>{
    console.log('Creando etiqueta h1');
    const h1 = document.createElement('h1');
    h1.innerText = `Hola, ${ nombre } como estas ?`;
    document.body.append(h1)
}
console.log('Bienvenidos al archivo js');