import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editPost, fetchPostDetail } from "../store/actions/postActions";
import { fetchCategory } from "../store/actions/categoryActions";
export default function FormPost(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.categories);
  const postDetail = useSelector((state) => state.posts.postDetail);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  // console.log(props.id);
  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchPostDetail(props.id));
    // console.log(postDetail);
    if (props.id) {
      setTitle(postDetail.post?.title);
      setContent(postDetail.post?.content);
      setImgUrl(postDetail.post?.imgUrl);
      setCategory(postDetail.post?.categoryId);
      setTags(postDetail.stringTag);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // console.log(props.id, postDetail.post?.id);
  }, [postDetail]);

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

  const editPostHandler = (event) => {
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

    dispatch(editPost(props.id, obj));
    navigate("/");
  };

  return (
    <>
      {/* {isLoading && <h1>Loading...</h1>} */}

      <div className="container">
        <Form onSubmit={editPostHandler}>
          <Form.Group className="mb-3 col-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              onInput={titleChangeHandler}
              defaultValue={postDetail.post?.title}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-3" controlId="Form.ControlTextarea1">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter content"
              onInput={contentChangeHandler}
              defaultValue={postDetail.post?.content}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-3" controlId="formBasicImgUrl">
            <Form.Label>Image Url</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image Url"
              onInput={imgUrlChangeHandler}
              defaultValue={postDetail.post?.imgUrl}
            />
          </Form.Group>

          <Form.Group className="mb-3 col-3" controlId="formSelectCategory">
            <Form.Label>Category</Form.Label>
            <Form.Select
              onSelect={categoryChangeHandler}
              defaultValue={postDetail.post?.categoryId}
            >
              <option disabled>Select Category</option>
              {categories.map((category) => {
                return (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3 col-3" controlId="formBasicTags">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              placeholder="Insert tag"
              onInput={tagsChangeHandler}
              defaultValue={postDetail.stringTag}
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
