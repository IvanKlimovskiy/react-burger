import {Input, PasswordInput, EmailInput, Button,} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import styles from "./register-page.module.css";
import {Link, useNavigate} from "react-router-dom";
import authentication from "../../utils/authentication-api";
import {useDispatch, useSelector} from "react-redux";
import {setAccessToken, setProfileName, setProfileEmail, setIsLoggedIn} from "../../services/slices/profile-slice";
import {registrationURL, profileURL, refreshTokenURL} from "../../constants/constants";

const RegisterPage = () => {

    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const accessToken = useSelector(store => store.profile.accessToken);

    const getTokens = (email, password, name) => {
        authentication(registrationURL, {
            body: {
                email,
                name,
                password
            }
        })
            .then((data) => {
                dispatch(setAccessToken(data.accessToken))
                localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));
                authentication(profileURL, {
                    method: "GET",
                    headers: {
                        authorization: accessToken,
                        "Content-type": "application/json"
                    }
                })
                    .then(data => {
                        console.log(data)
                        if (data.success) {
                            dispatch(setProfileName(data.name));
                            dispatch(setProfileEmail(data.email));
                            dispatch(setIsLoggedIn(true));
                            navigate('/')
                        }
                        else {
                            authentication(refreshTokenURL, {
                                body: {
                                    token: JSON.parse(localStorage.getItem('refreshToken'))
                            }
                            })
                                .then((data) => {
                                    dispatch(setAccessToken(data.accessToken))
                                    localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));
                                    dispatch(setProfileName(data.name));
                                    dispatch(setProfileEmail(data.email));
                                    dispatch(setIsLoggedIn(true));
                                    navigate('/')
                                })
                        }
                    })
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setEmail("");
                setName("");
                setPassword("");
            });
    };

    const handleGetTokens = () => getTokens(email, password, name)

    return (
        <main className={styles.wrapper}>
            <h2 className={styles.header}>Регистрация</h2>
            <form style={{display: "flex", flexDirection: "column"}}>
                <Input
                    type={"text"}
                    placeholder={"Имя"}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    name={"name"}
                    error={false}
                    errorText={"Ошибка"}
                    size={"default"}
                    extraClass="mb-6"
                />
                <EmailInput
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    name={"email"}
                    isIcon={false}
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    name={"password"}
                    extraClass="mb-2"
                />
            </form>
            <Button
                extraClass="mt-4"
                htmlType="button"
                type="primary"
                size="large"
                disabled={!name || !password || !email}
                onClick={handleGetTokens}
            >
                Зарегистрироваться
            </Button>
            <p className="mt-20 mb-6">
                Уже зарегистрированы? <Link to={"/login"}>Войти</Link>
            </p>
        </main>
    );
};

export default RegisterPage;
