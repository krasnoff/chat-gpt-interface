import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './ChatGPTComponent.module.scss';

interface IFormInput {
    email: string;
    password: string;
}

function ChatGPTComponent() {
    const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = data => submitToChatGPT(data);

    const submitToChatGPT = async (data: IFormInput) => {
        console.log('submitToChatGPT', data);
    }

    return (
        <div className={styles.wrapper}>
            <form className="row" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="text" className="form-control" {...register("email", { required: true, pattern: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/i })} id="email"/>
                    {errors.email?.type === 'required' && <div className={["invalid-feedback", styles.active].join(' ')}>Mandatory field</div>}
                    {errors.email?.type === 'pattern' && <div className={["invalid-feedback", styles.active].join(' ')}>Email is not valid</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Password</label>
                    <input type="text" className="form-control" {...register("password", { required: true })} id="password"/>
                    {errors.password?.type === 'required' && <div className={["invalid-feedback", styles.active].join(' ')}>Mandatory field</div>}
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" type="submit">Submit form</button>
                </div>
            </form>
        </div>
    );
}

export default ChatGPTComponent;