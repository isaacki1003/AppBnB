import React from "react";
import { NavLink } from "react-router-dom";
import "./CategoryBar.css";
import all from "../../assets/all.png"
import beach from "../../assets/beach.png"
import camper from "../../assets/camper.png"
import castle from "../../assets/castle.png"
import cave from "../../assets/cave.png"
import container from "../../assets/container.png"
import farm from "../../assets/farm.png"
import hut from "../../assets/hut.png"
import tent from "../../assets/tent.png"
import treehouse from "../../assets/treehouse.png"
import tower from "../../assets/tower.png"

function CategoryBar() {
    return (
        <div className="category-bar">
            <NavLink className="category-container" to={"/"}>
                <img className="category-icon" src={all} />
                <div className="category-name">All</div>
            </NavLink>

            <NavLink className="category-container" to={"/?categ=camper"}>
                <img className="category-icon" src={camper} />
                <div className="category-name">Camper</div>
            </NavLink>

            <NavLink className="category-container" to={"/?categ=castle"}>
                <img className="category-icon" src={castle} />
                <div className="category-name">Castle</div>
            </NavLink>

            <NavLink className="category-container" to={"/?categ=cave"}>
                <img className="category-icon" src={cave} />
                <div className="category-name">Cave</div>
            </NavLink>

            <NavLink className="category-container" to={"/?categ=container"}>
                <img className="category-icon" src={container} />
                <div className="category-name">Container</div>
            </NavLink>

            <NavLink className="category-container" to={"/?categ=farm"}>
                <img className="category-icon" src={farm} />
                <div className="category-name">Farm</div>
            </NavLink>

            <NavLink className="category-container" to={"/?categ=hut"}>
                <img className="category-icon" src={hut} />
                <div className="category-name">Hut</div>
            </NavLink>

            <NavLink className="category-container" to={"/?categ=island"}>
                <img className="category-icon" src={beach} />
                <div className="category-name">Island</div>
            </NavLink>

            <NavLink className="category-container" to={"/?categ=tent"}>
                <img className="category-icon" src={tent} />
                <div className="category-name">Tent</div>
            </NavLink>

            <NavLink className="category-container" to={"/?categ=treehouse"}>
                <img className="category-icon" src={treehouse} />
                <div className="category-name">Treehouse</div>
            </NavLink>

            <NavLink className="category-container" to={"/?categ=tower"}>
                <img className="category-icon" src={tower} />
                <div className="category-name">Tower</div>
            </NavLink>
        </div>
    )
}

export default CategoryBar;
