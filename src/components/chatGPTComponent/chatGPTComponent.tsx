import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './ChatGPTComponent.module.scss';

interface IFormInput {
    email: string;
    password: string;
}

function ChatGPTComponent() {
    const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

    return (
        <div className={styles.wrapper}>
            <form className="row" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="text" className="form-control" {...register("email", { required: true })} id="email"/>
                    {errors.email?.type === 'required' && <div className={["invalid-feedback", styles.active].join(' ')}>Mandatory field</div>}
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