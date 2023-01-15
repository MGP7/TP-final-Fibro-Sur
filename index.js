const express = require('express');
const app = express();
const mysql2 = require('mysql2');
//Motor de plantilla
const hbs = require('hbs');
//Encontrar archivos
const path = require('path');
//Para enviar mails
const nodemailer = require('nodemailer');
//Para variables de entorno
require('dotenv').config();


//Configuramos el puerto
const PORT = process.env.PORT || 9000;


//Middelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Configuramos el motor de plantillas de HBS(Handelbars)
app.set('view engine', 'hbs');
//Configuramos la ubicación de las plantillas
app.set('views', path.join(__dirname, 'views'));
//Configuramos los parciales de los motores de plantillas
hbs.registerPartials(path.join(__dirname, 'views/partials'))

//Conexión a la base de datos
/*const conexion = mysql2.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT
})

conexion.connect((err) => {
    if (err) throw err;
    console.log(`Conectado a la Database ${process.env.DATABASE}`)
})*/



//Rutas de la aplicacion
app.get('/', (req, res) => {
    res.render('index')
});

app.get('/formulario', (req, res) => {
    res.render('formulario')
});

app.get('/sinDatos', (req, res) => {
    res.render('sinDatos')
});

app.get('/nuestrotaller', (req, res) => {
    res.render('nuestrotaller')
});

app.get('/productos', (req, res) => {
    

   /*let sql = "SELECT * from productos";
    conexion.query(sql, function(err, result){
        if (err) throw err;
            console.log(result);
            res.render('productos', {
        titulo: 'Trabajos',
        datos: result
    })
 
})*/
res.render('sinDatos')
})



app.get('/contacto', (req, res) => {
    res.render('contacto', {
        titulo: 'Contacto'
    }
    )
});





app.get('/respuesta', (req, res) => {
    res.render('contacto', {
        titulo: 'Contacto'
    }
    )
});

app.post('/formulario', (req, res) =>{
    
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const descripcion = req.body.descripcion;

    let datos = {
        nombre: nombre,
        precio: precio,
        descripcion: descripcion
    }

    /*let sql = "INSERT INTO productos set ?";

    conexion.query(sql, datos, function(err){
        if (err) throw err;
            console.log(`1 Registro insertado`);
            res.render('formulario');
    })*/
    res.render('sinDatos'
 )
})

app.post('/contacto', (req, res) =>{
    
    const nombre = req.body.nombre;
    const email = req.body.email;
    
    //Configuramos la cuenta del envío
    async function envioMail(){
        //Configuramos la cuenta del envío
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAILPASSWORD
            }
        });
    
        
        //Envío del mail
        let info = await transporter.sendMail({
            from: process.send.EMAIL,
            to: `${email}`,
            subject: "Gracias por visitar nuestra página",
            html:`Estimad@, gracias por dejarnos su correo. <br>
            Alguno de nuestros asesores estará contactandol@ a la brevedad. <br>
            ¡¡Muchas gracias!!
            `
        })

    }


    let datos = {
        nombre: nombre,
        email: email
    }

    /*let sql = "INSERT INTO contactos set ?";

    conexion.query(sql, datos, function(err){
        if (err) throw err;
            console.log(`1 Registro insertado`);
            //Email
            envioMail().catch(console.error);
            res.render('respuesta');
    })*/

    res.render('sinDatos')
})


app.post('/delete', (req, res) =>{

    console.log(req.body.idProducto);
    
   /* let sql = "DELETE FROM productos where idProducto = " + req.body.idProducto + "";
        console.log(sql);
        conexion.query(sql, function(err, result){
            if (err) throw err;
                console.log('Dato eliminado: ' + result.affectedRows);
                res.render('formulario')
        
            })*/
 res.render('sinDatos')
})
 

app.post('/update', (req, res) => {

    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const descripcion = req.body.descripcion;
    const idProducto = req.body.idProducto;

  /*  let sql = "UPDATE productos SET nombre = '" 
    + nombre 
    + "', precio = '" 
    + precio 
    + "', descripcion = '" 
    + descripcion 
    + "' WHERE idProducto = " 
    + idProducto;

    console.log(sql);

    //res.send(sql)

    conexion.query(sql, function(err, result){
        if (err) throw err;
            console.log('Dato Actualizado: ' + result.affectedRows);
            res.render('formulario')
    })  */    

    res.render('sinDatos')
            })
 


//Servidor a la escucha de las peticiones
app.listen(PORT, () => {
    console.log(`Servidor trabajando en el puerto`);
});






