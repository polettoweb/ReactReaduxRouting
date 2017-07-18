import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
    renderField(field) {
        const { meta: {touched, error} } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control"
                    type="text"
                    {...field.input}
                />
                {/*three status usable: 'pristine' , 'touched', 'invalid'*/}
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }
    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/'); //it needs to match one of the Route element in index.js            
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field 
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field 
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link className="btn btn-danger" to="/">Cancel</Link>
            </form>    
        
        );
    }
}

function validate(values) {
    //console.log(values) -> { title: 'afdfdf', categories: 'dfrgrg', content: 'dfgghyj'}
    const errors = {};
    //validate the inputs from 'values'
    
    if (!values.title) {
        errors.title = "Enter a title"; //.title must match the name of the Field above name="title"
    }
    if (!values.categories) {
        errors.categories = "Enter some categories";
    }
    if (!values.content) {
        errors.content = "Enter some content, please";
    }

    //if errors is empty, the form is fine to submit
    //if errors has any property, redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate, //validate: validate (es5)
    form: 'PostsNewForm'
})(
    connect(null,{ createPost })(PostsNew)
);