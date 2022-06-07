// import useFetch from "../hooks/useFetch";

import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchItem } from "../store/actions/itemActions";
export default function TableRow() {
  // const { data: posts } = useFetch("http://localhost:3001/posts");
  // const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item.items);
  const EditButtonHandler = (id) => {
    // navigate(`/edit/${id}`);
  };

  const DeleteButtonHandler = (id) => {
    // dispatch(deleteItem(id));
  };

  useEffect(() => {
    // console.log("Data updated");
    // eslint-disable-next-line
  }, [items]);

  useEffect(() => {
    dispatch(fetchItem());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {/* {isLoading && <h2>Loading...</h2>} */}
      {items.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.Manufacture.name}</td>
            {item.status && <td>Ready</td>}
            {!item.status && <td>-</td>}
            <td>
              <Button onClick={() => EditButtonHandler(item.id)}>Edit</Button>
              <Button
                variant="danger"
                onClick={() => DeleteButtonHandler(item.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        );
      })}
    </>
  );
}
