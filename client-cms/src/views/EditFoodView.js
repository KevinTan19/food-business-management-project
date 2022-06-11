import FormPost from "../components/FormPost";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
export default function EditPostView() {
  const { id } = useParams();
  return (
    <div>
      <NavBar />
      <FormPost id={id} />
    </div>
  );
}
