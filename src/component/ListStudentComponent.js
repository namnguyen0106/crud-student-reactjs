import StudentService from '../service/StudentService'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

export default function ListStudentComponent() {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        StudentService.getStudents().then(response => {
            setStudents(response.data)
        })
    }, [])
    let addStudent = () => {
        return navigate('/students/create')
    }
    const studentDetail = (id) => {
        return navigate('/students/detail/' + id);
    }
    const updateStudent = (id) => {
        return navigate('/students/update/' + id);
    }
    const deleteStudent = (id) => {
        let isDel = window.confirm("Have you thought about it?");
        if (isDel) {
            StudentService.deleteStudentById(id).then(() => {
                alert("Delete Success")
                StudentService.getStudents().then(response => {
                    setStudents(response.data)
                })
            });
        }
    }
    return (
        <div>
            <h2 className="text-center">Students List</h2>
            <div className="row">
                <Button variant="primary" onClick={addStudent}>Add student</Button>{''}
            </div>
            <br></br>
            <div className="row">
                <table className="table table-striped table-bordered">

                    <thead>
                    <tr>
                        <th> Student Id</th>
                        <th> Student Name</th>
                        <th> Student Description</th>
                        <th> Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        students.map(
                            student =>
                                <tr key={student.id}>
                                    <td> {student.name} </td>
                                    <td> {student.description}</td>
                                    <td> {student.action}</td>
                                    <td>
                                        <button onClick={() => updateStudent(student.id)}
                                                className="btn btn-info">Update
                                        </button>
                                        <button style={{marginLeft: "10px"}}
                                                onClick={() => deleteStudent(student.id)}
                                                className="btn btn-danger">Delete
                                        </button>
                                        <button style={{marginLeft: "10px"}}
                                                onClick={() => studentDetail(student.id)}
                                                className="btn btn-info">View
                                        </button>
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>

            </div>

        </div>
    )
}
