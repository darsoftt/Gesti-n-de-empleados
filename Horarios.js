import { useState, useEffect } from 'react'
import axios from 'axios';

function Horarios() {

    const [turnos, setTurnos] = useState("");
    const [horario, setHorario] = useState("");
    const [empleadosid, setEmpleadosid] = useState("");
    const [detalle, setDetalle] = useState("");
    const [id, setId] = useState();

    const [editar, setEditar] = useState(false);

    const [empleadosList, setEmpleados] = useState([]);

    const add = () => {
        axios.post("http://localhost:3001/create-turnos", {
            turnos: turnos,
            horario:horario,
            empleadosid: empleadosid,
            detalle:detalle
        }).then(() => {
            getTurno();
            limpiarCampos();
            alert('turno registrado')
        });
    }

    const update = () => {
        axios.put("http://localhost:3001/update-turnos", {
            id:id,
            turnos: turnos,
            horario:horario,
            empleadosid: empleadosid,
            detalle:detalle
        }).then(() => {
            getTurno();
            alert("turno actualizado")
            limpiarCampos();
        });
    }

    const deleteHorario = (id) => {
        axios.delete(`http://localhost:3001/delete-turnos/${id}`).then(() => {
            getTurno();
            alert("turno eliminado")
            limpiarCampos();
        });
    }

    const limpiarCampos = () => {
        setTurnos("");
        setHorario("");
        setDetalle("");
        setEmpleadosid("");
        setId("");
        setEditar(false);
    }

    const editarHorario = (val) => {
        setEditar(true);

        setDetalle(val.detalle);
        setHorario(val.horario)
        setTurnos(val.turnos);
        setEmpleadosid(val.empleadosid);
        setId(val.id);
    }

    const getTurno = () => {
        axios.get("http://localhost:3001/turnos",).then((response) => {
            setEmpleados(response.data);
        })
    }

    useEffect(() => {
        getTurno();
    }, []);

    return (
        <div className='container'>
            <div className="card text-center">
                <div className="card-header">
                    Gestion de Turnos
                </div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">horario: </span>
                        <input type="text" value={horario}
                            onChange={(event) => {
                                setHorario(event.target.value);
                            }}
                            className="form-control" placeholder="Ingrese el horario de trabajo" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Empleadoid: </span>
                        <input type="number" value={empleadosid}
                            onChange={(event) => {
                                setEmpleadosid(event.target.value);
                            }}
                            className="form-control" placeholder="Ingrese la id del empleado" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">detalle: </span>
                        <input type="text" value={detalle}
                            onChange={(event) => {
                                setDetalle(event.target.value);
                            }}
                            className="form-control" placeholder="Ingrese detalle del trabajo" aria-label="Username" aria-describedby="basic-addon1" />
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
                        <th scope="col">Horario</th>
                        <th scope="col">Empleadoid</th>
                        <th scope="col">detalle</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        empleadosList.map((val, key) => {
                            return <tr key={val.id}>
                                <th>{val.id}</th>
                                <td>{val.horario}</td>
                                <td>{val.empleadosid}</td>
                                <td>{val.detalle}</td>
                                <td>
                                    <button type="button"
                                        onClick={() => {
                                            editarHorario(val);
                                        }}
                                        className="btn btn-outline-primary m-1">Editar</button>
                                    <button type="button" onClick={() => {
                                        deleteHorario(val.id);
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

export default Horarios;