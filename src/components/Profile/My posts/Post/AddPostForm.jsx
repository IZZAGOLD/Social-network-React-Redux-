import {Field, reduxForm} from "redux-form";
import React from "react";
import {maxLengthCreator, requiredField} from "../../../../utils/validatorss/validators";
import {Textarea} from "../../../common/FormsControl/FromsControl";

const maxLength =  maxLengthCreator(10)
const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'What is the news?'} name={"addPost"}
                       component={Textarea} validate={[requiredField, maxLength]}/>
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}
const AddPostReduxForm = reduxForm({form: "addPost"})(AddPostForm)


export default AddPostReduxForm;