import { Table } from "react-bootstrap";
import TableRow from "../components/TableRow";
import NavBar from "../components/NavBar";
export default function HomeView() {
  return (
    <>
      <NavBar />
      <div className="container container-fluid col-10">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Manufacture</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <TableRow />
          </tbody>
        </Table>
      </div>
    </>
  );
}
