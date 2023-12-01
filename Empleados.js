import { useState, useEffect } from 'react'
import {post,put,destroy,get} from './helpers/request'

function Empleados() {

    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState();
    const [pais, setPais] = useState("");
    const [cargo, setCargo] = useState("");
    const [anios, setAnios] = useState();
    const [id, setId] = useState();

    const [editar, setEditar] = useState(false);

    const [empleadosList, setEmpleados] = useState([]);

    const add = () => {
        post("/create", {
            nombre: nombre,
            edad: edad,
            pais: pais,
            cargo: cargo,
            anios: anios
        }).then(() => {
            getEmpleados();
            limpiarCampos();
            alert('empleado registrado')
        });
    }

    const update = () => {
        put("/update", {
            id: id,
            nombre: nombre,
            edad: edad,
            pais: pais,
            cargo: cargo,
            anios: anios
        }).then(() => {
            getEmpleados();
            alert("Empleado actualizado")
            limpiarCampos();
        });
    }

    const deleteEmpleado = (id) => {
        destroy(`/delete/${id}`).then(() => {
            getEmpleados();
            alert("Empleado eliminado")
            limpiarCampos();
        });
    }

    const limpiarCampos = () => {
        setAnios("");
        setCargo("");
        setEdad("");
        setNombre("");
        setPais("");
        setId("");
        setEditar(false);
    }

    const editarEmpleado = (val) => {
        setEditar(true);

        setNombre(val.nombre);
        setEdad(val.edad);
        setCargo(val.cargo);
        setPais(val.pais);
        setAnios(val.anios);
        setId(val.id);
    }

    const getEmpleados = () => {
        get("/empleados",).then((response) => {
            setEmpleados(response.data);
        })
    }

    useEffect(() => {
        getEmpleados();
    }, []);

    return (
        <div className='container'>
            <div className="card text-center">
                <div className="card-header">
                    Gestion de empleados
                </div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Nombre: </span>
                        <input type="text" value={nombre}
                            onChange={(event) => {
                                setNombre(event.target.value);
                            }}
                            className="form-control" placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Edad: </span>
                        <input type="number" value={edad}
                            onChange={(event) => {
                                setEdad(event.target.value);
                            }}
                            className="form-control" placeholder="Ingrese la edad" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Pais: </span>
                        <input type="text" value={pais}
                            onChange={(event) => {
                                setPais(event.target.value);
                            }}
                            className="form-control" placeholder="Ingrese su pais" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Cargo: </span>
                        <input type="text" value={cargo}
                            onChange={(event) => {
                                setCargo(event.target.value);
                            }}
                            className="form-control" placeholder="Ingrese su cargo" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Años: </span>
                        <input type="number" value={anios}
                            onChange={(event) => {
                                setAnios(event.target.value);
                            }}
                            className="form-control" placeholder="Ingrese sus años de experiencia" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                </div>
                <div className="card-footer text-muted">
                    {editar ?
                        <>
                            <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
                            <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
                        </>
                        :
                        <button className='btn btn-success' onClick={add}>Registrar</button>
                    }

                </div>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">nombre</th>
                        <th scope="col">Edad</th>
                        <th scope="col">Pais</th>
                        <th scope="col">Cargo</th>
                        <th scope="col">Años</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        empleadosList.map((val, key) => {
                            return <tr key={val.id}>
                                <th>{val.id}</th>
                                <td>{val.nombre}</td>
                                <td>{val.edad}</td>
                                <td>{val.pais}</td>
                                <td>{val.cargo}</td>
                                <td>{val.anios}</td>
                                <td>
                                    <button type="button"
                                        onClick={() => {
                                            editarEmpleado(val);
                                        }}
                                        className="btn btn-outline-primary m-1">Editar</button>
                                    <button type="button" onClick={() => {
                                        deleteEmpleado(val.id);
                                    }} className="btn btn-outline-danger m-1">Eliminar</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Empleados;