const express = require("express")
const app = express();
const mysql = require('mysql2');
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"empleados"
});

//Empleados

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) Values(?,?,?,?,?)',[nombre,edad,pais,cargo,anios],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Empleado registrado con exito")
        }
    }
    );
});

app.get("/empleados",(req,res)=>{
    db.query('SELECT * FROM empleados',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});

app.put("/update",(req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?',[nombre,edad,pais,cargo,anios,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Empleado actualizado con exito")
        }
    }
    ); 
});

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM empleados WHERE id=?',id,
    (err,result)=>{ 
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    ); 
});

//Gerentes

app.post("/create-Gerentes",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;

    db.query('INSERT INTO gerentes(nombre,edad,pais,cargo) Values(?,?,?,?)',[nombre,edad,pais,cargo],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Empleado registrado con exito")
        }
    }
    );
});

app.get("/gerentes",(req,res)=>{
    db.query('SELECT * FROM gerentes',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});

app.put("/update-gerentes",(req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;

    db.query('UPDATE gerentes SET nombre=?,edad=?,pais=?,cargo=? WHERE id=?',[nombre,edad,pais,cargo,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Empleado actualizado con exito")
        }
    }
    ); 
});

app.delete("/delete-gerentes/:id",(req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM gerentes WHERE id=?',id,
    (err,result)=>{ 
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    ); 
});

//Horarios

app.post("/create-turnos",(req,res)=>{
    const horario = req.body.horario;
    const empleadosid = req.body.empleadosid;
    const detalle = req.body.detalle;

    db.query('INSERT INTO turnos(horario,empleadosid,detalle) Values(?,?,?)',[horario,empleadosid,detalle],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("turno registrado con exito")
        }
    }
    );
});

app.get("/turnos",(req,res)=>{
    db.query('SELECT * FROM turnos',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    );
});

app.put("/update-turnos",(req,res)=>{
    const id = req.body.id;
    const horario = req.body.horario;
    const empleadosid = req.body.empleadosid;
    const detalle = req.body.detalle;

    db.query('UPDATE turnos SET horario=?,empleadosid=?,detalle=? WHERE id=?',[horario,empleadosid,detalle,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("turno actualizado con exito")
        }
    }
    ); 
});

app.delete("/delete-turnos/:id",(req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM turnos WHERE id=?',id,
    (err,result)=>{ 
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    }
    ); 
});

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})