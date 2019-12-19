import React, {Component} from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../CircleButton/CircleButton";
import ValidationError from '../ValidationError';
export default class AddFolder extends Component {
    static contextType = ApiContext;
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false
            },
            id: ''
        };
    }
    updateName(name) {
        this.setState({ name: {value:name, touched: true} });
    }
    createFolderId() {
        let min = 1000;
        let max = 1000000;
        let folderId = Math.floor(Math.random() * (max - min + 1) + min);
        this.setState({id: folderId});
        console.log(folderId)
    }
    handleSubmit = e => {
        e.preventDefault();
        const folder = {
            id: this.state.id,
            name: this.state.name.value
        }
        console.log(folder);
        fetch(`${config.API_ENDPOINT}/folders`, {
          method: "POST",
          body: JSON.stringify(folder),
          headers: {
            "Content-type": "appliction/json",
            'Accept': 'application/json'
          }
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(data => {
            this.setState({
                name: {value: ''},
                id: ''
            })
            this.context.addFolder(data)
            console.log(this.context);
            this.props.history.push("/");
        })
        .catch(error => {
            console.error(error)
        })
    }
    
validateName() {
    const name = this.state.name.value.trim();
    if ( name.length === 0) {
        return 'Name is required';
    } else if (name.length < 3) {
        return 'Name must be at least 3 characters long';
    }
}   
 render() {
        const nameError = this.validateName();
        return (
          <div className="add-folder">
            <form 
                className="add__folder__form" 
                onSubmit={e => this.handleSubmit(e)}>
              <h2>Add Folder</h2>
              <div className="form-group">
                <label htmlFor="name">Enter Folder Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="name__field"
                  onChange={e => this.updateName(e.target.value)}
                />
                {this.state.name.touched && (
                  <ValidationError message={nameError} />
                )}
                <button type='button' onClick={() => this.createFolderId()}>Click for Id</button>
                <button type="submit">Save</button>
              </div>
            </form>
            <CircleButton
              tag="button"
              role="link"
              onClick={() => this.props.history.goBack()}
              className="NotePageNav__back-button">
              <FontAwesomeIcon icon="chevron-left" />
              <br />
              Back
            </CircleButton>
          </div>
        );
    }
}