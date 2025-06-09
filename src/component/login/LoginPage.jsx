import { useDispatch } from "react-redux";
import { useState } from "react";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import { registerUser, loginUser } from "../../redux/actions";
import "./LoginPage.css";

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
    <div className="login-page-background">
      <div id="login-form">
        <h1 className="app-title">Librum</h1>
        <h3>{isLogin ? "Login" : "Registrati"}</h3>
        {isLogin ? (
          <Form onSubmit={(event) => handleLogin(event)}>
            <Form.Label className="mb-2">username</Form.Label>
            <Form.Control type="text" className="mb-2" placeholder="Inserisci il tuo username" required />
            <Form.Label className="mb-2">password</Form.Label>
            <Form.Control type="password" className="mb-2" placeholder="Inserisci la tua password" required />
            <Button type="submit">Login</Button>
          </Form>
        ) : (
          <Form onSubmit={(event) => handleRegister(event)}>
            <FormLabel className="mb-2">Nome</FormLabel>
            <FormControl type="text" placeholder="Inserisci il tuo nome" className="mb-2" required />
            <FormLabel className="mb-2">Cognome</FormLabel>
            <FormControl type="text" placeholder="Inserisci il tuo cognome" className="mb-2" required />
            <FormLabel className="mb-2">Username</FormLabel>
            <FormControl type="text" placeholder="Scegli il tuo username" className="mb-2" required />
            <FormLabel className="mb-2">Email</FormLabel>
            <FormControl type="email" placeholder="Inserisci la tua email" className="mb-2" required />
            <FormLabel className="mb-2">Password</FormLabel>
            <FormControl type="password" placeholder="Scegli la password" className="mb-3" required />
            <Button type="submit">Registrati</Button>
          </Form>
        )}
        <div className="mt-2 button-container">
          <Button variant="secondary" onClick={() => setIsLogin(!isLogin)} id="login-button">
            {isLogin ? "Vai alla registrazione" : "Hai già un account? Login"}
          </Button>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
