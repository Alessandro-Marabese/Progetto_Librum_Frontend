import { useDispatch } from "react-redux";
import { useState } from "react";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import { registerUser, loginUser } from "../../redux/actions";

function LoginPage() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault(event);

    const userData = {
      nome: event.target[0].value,
      cognome: event.target[1].value,
      username: event.target[2].value,
      email: event.target[3].value,
      password: event.target[4].value,
    };

    dispatch(registerUser(userData)).finally(() => {
      window.location.href = "/homepage";
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const username = event.target[0].value;
    const password = event.target[1].value;

    dispatch(loginUser(username, password)).finally(() => {
      window.location.href = "/homepage";
    });
  };

  return (
    <div className="w-50 h-75 m-auto">
      <h1>{isLogin ? "Login" : "Registrazione"}</h1>
      {isLogin ? (
        <Form onSubmit={(event) => handleLogin(event)}>
          <Form.Label>username</Form.Label>
          <Form.Control type="text" />
          <Form.Label>password</Form.Label>
          <Form.Control type="password" />
          <Button type="submit">login</Button>
        </Form>
      ) : (
        <Form onSubmit={(event) => handleRegister(event)}>
          <FormLabel>Nome</FormLabel>
          <FormControl type="text" placeholder="Nome" />
          <FormLabel>Cognome</FormLabel>
          <FormControl type="text" placeholder="Cognome" />
          <FormLabel>Username</FormLabel>
          <FormControl type="text" placeholder="username" />
          <FormLabel>Email</FormLabel>
          <FormControl type="email" placeholder="email" />
          <FormLabel>Password</FormLabel>
          <FormControl type="password" placeholder="password" />
          <Button type="submit">Registrati</Button>
        </Form>
      )}
      <div className="mt-3">
        <Button variant="secondary" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Vai alla registrazione" : "Hai già un account? Login"}
        </Button>
      </div>
    </div>
  );
}
export default LoginPage;
