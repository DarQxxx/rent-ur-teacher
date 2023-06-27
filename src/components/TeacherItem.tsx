import React from "react";
import "./TeacherItem.scss";
import {Link} from "react-router-dom";
import {Teacher} from "../interfaces/interfaces";

const TeacherItem: React.FC<Teacher> = (props) => {
    return (
        <div className="col-8 col-lg-5 col-md-6 col-xl-4 xol-xxl-3 mt-3">
            <Link to={`teacher/${props.id}`} className="teacher">
                <div className="teacher__img">
                    <img src={props.img} alt={props.name + " " + props.surname} />
                </div>
                <div className="teacher__name font--20 fw-bold">
                    {props.name + " " + props.surname}
                </div>
                <div className="teacher__subject">
                    {props.subjects[0].subject + " " + props.subjects[0].price + " zł/h"}
                </div>
                <div className="teacher__about line-height--16 font--15 mt-2 mb-2">
                    {props.about.trim().length > 40
                        ? props.about.trim().slice(0, 40) + "..."
                        : props.about.trim()}
                </div>
            </Link>
        </div>
    );
};

export default TeacherItem;
