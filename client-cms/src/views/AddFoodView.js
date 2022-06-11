import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { addPost } from "../store/actions/postActions";
// import { fetchCategory } from "../store/actions/categoryActions";
export default function LoginView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.categories);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    // dispatch(fetchCategory());
    // eslint-disable-next-line
  }, []);

  const titleChangeHandler = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  const contentChangeHandler = (event) => {
    const value = event.target.value;
    setContent(value);
  };

  const imgUrlChangeHandler = (event) => {
    const value = event.target.value;
    setImgUrl(value);
  };

  const categoryChangeHandler = (event) => {
    const value = event.target.value;
    setCategory(value);
  };

  const tagsChangeHandler = (event) => {
    const value = event.target.value;
    setTags(value);
  };

  const addPostHandler = (event) => {
    event.preventDefault();
    let obj = {
      title: title,
      content: content,
      imgUrl: imgUrl,
      categoryId: category,
    };
    if (tags) {
      obj = { ...obj, tags: tags };
    }

    // dispatch(addPost(obj));
    navigate("/");
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <Form onSubmit={addPostHandler}>
          <Form.Group className="mb-3 col-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              onChange={titleChangeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-3" controlId="Form.ControlTextarea1">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter content"
              onChange={contentChangeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-3" controlId="formBasicImgUrl">
            <Form.Label>Image Url</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image Url"
              onChange={imgUrlChangeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-3" controlId="formSelectCategory">
            <Form.Label>Category</Form.Label>
            <Form.Select onChange={categoryChangeHandler}>
              <option disabled selected>
                Select Category
              </option>
              {/* {categories.map((category) => {
                return (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                );
              })} */}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3 col-3" controlId="formBasicTags">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              placeholder="Insert tag (example: tag_1, tag_2, etc...."
              onChange={tagsChangeHandler}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
