import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/actions/userActions";
import { useNavigate } from "react-router-dom";
export default function LoginView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usernameChangeHandler = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setUsername(value);
  };

  const passwordChangeHandler = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setPassword(value);
  };

  const loginHandler = (event) => {
    event.preventDefault();
    dispatch(loginUser({ username: username, password: password }))
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <Form onSubmit={loginHandler}>
        <Form.Group className="mb-3 col-3" controlId="formBasicUsername">
          <Form.Label>username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            onChange={usernameChangeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={passwordChangeHandler}
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
        {/* <Form.Text className="text-muted">
          Need an account ? <Link to="/register">Signup</Link>
        </Form.Text> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
