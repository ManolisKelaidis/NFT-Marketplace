import React, { useState,useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import UserFilters from "./UserFilters";
import UserItem from "./UserItem";
import Pagination from "../../components/pagination/Pagination";
import { useDispatch} from "react-redux";
import { retrieveUsers } from "../../store/UserSlice";

const Users = () => {
  const [userList,setUserList] = useState([])
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();


  const fetchUsers = ()=>{
    dispatch(retrieveUsers())
    .unwrap()
    .then((originalPromiseResult) => {
      console.log(originalPromiseResult);
      setUserList(originalPromiseResult.body.data);
    })
    .catch((rejectedValueOrSerializedError) => {
      console.log(rejectedValueOrSerializedError);
    });
  }

  useEffect(() => {
   fetchUsers();
  },[]);


  return (
    <Container>
      <Row className="row--grid">
        <Col className="col-12">
          <div className="main__title main__title--page">
            <h1>Users</h1>
          </div>
        </Col>

        <Col className="col-12">
          <UserFilters />
        </Col>
      </Row>

      <Row className="row--grid">
        {userList.map((u, index) => (
          <Col key={index} className="col-12 col-sm-6 col-lg-4 col-xl-3">
            <UserItem user={u} />
          </Col>
        ))}
      </Row>

      <Row className="row row--grid">
        <Col className="col-12">
          <Pagination
            page={page}
            sizePerPage={8}
            totalSize={169}
            onChange={setPage}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
