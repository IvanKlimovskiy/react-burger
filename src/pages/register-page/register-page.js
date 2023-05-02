import {
  Input,
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from "./register-page.module.css";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [passwordValue, setPasswordValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  return (
    <main className={styles.wrapper}>
      <h2 className={styles.header}>Регистрация</h2>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => setNameValue(e.target.value)}
          value={nameValue}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <EmailInput
          onChange={(e) => setEmailValue(e.target.value)}
          value={emailValue}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={(e) => setPasswordValue(e.target.value)}
          value={passwordValue}
          name={"password"}
          extraClass="mb-2"
        />
      </form>
      <Button extraClass="mt-4" htmlType="button" type="primary" size="large">
        Войти
      </Button>
      <p className="mt-20 mb-6">
        Уже зарегистрированы? <Link to={"/login"}>Войти</Link>
      </p>
    </main>
  );
};

export default RegisterPage;