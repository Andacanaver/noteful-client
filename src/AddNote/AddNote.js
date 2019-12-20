import React, { Component } from "react";
import ApiContext from "../ApiContext";
import config from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../CircleButton/CircleButton";
import ValidationError from "../ValidationError";
import NotefulForm from "../NotefulForm/NotefulForm";


export default class AddNote extends Component {
        static contextType = ApiContext;

    constructor() {
        super();
        this.state = {
            noteName: '',
            noteFolder: '',
            content: '',
            touched: false
        }
    }

}