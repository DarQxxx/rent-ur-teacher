import React from "react";
import TeacherItem from "./TeacherItem";
import { useLoaderData } from "react-router-dom";
import {Teacher} from "../interfaces/interfaces";

const Teachers: React.FC = (props) => {
    const users: any = useLoaderData();
    return (
        <div className="row">
            {users.map((element : Teacher) => {
                return (
                    <TeacherItem
                        key={element.id}
                        teacher={element.teacher}
                        id={element.id}
                        name={element.name}
                        surname={element.surname}
                        mail={element.mail}
                        phone={element.phone}
                        subjects={element.subjects}
                        about={element.about}
                        img={element.img}
                    />
                );
            })}
        </div>
    );
};

export default Teachers;
