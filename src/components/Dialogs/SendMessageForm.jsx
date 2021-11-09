import {Field, reduxForm} from "redux-form";
import React from "react";
import {Textarea} from "../common/FormsControl/FromsControl";
import {maxLengthCreator, requiredField} from "../../utils/validatorss/validators";

const maxLength = maxLengthCreator(300)
// validate={[requiredField, maxLength]}
const SendMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Enter your message'} name={"sendMessage"} component={Textarea}
                       validate={[requiredField, maxLength]}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}
const SendMessageReduxForm = reduxForm({form: "sendMessage"})(SendMessageForm)


export default SendMessageReduxForm;