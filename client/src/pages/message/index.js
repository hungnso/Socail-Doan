import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LeftSide from "../../components/message/LeftSide";
import UserCard from "../../components/UserCard";
import { MESS_TYPES } from "../../redux/actions/messageAction";
import { useHistory, useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

import "bootstrap/dist/css/bootstrap.min.css";
import { getDataAPI } from "../../utils/fetchData";

const Message = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchUsers, setSearchUsers] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { auth } = useSelector((state) => state);
  const listSuggestDefault = auth.user.following;
  const [listSuggest, setListSuggest] = useState(listSuggestDefault);

  const handleAddUser = (user) => {
    dispatch({
      type: MESS_TYPES.ADD_USER,
      payload: { ...user, text: "", media: [] },
    });
    // dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online });
    return history.push(`/message/${user._id}`);
    setShow(false);
  };
  const handleSearch = async (value) => {
    console.log(value.length);
    // if (value.length > 0) {
    //   setSearch(true);
    // } else {
    //   setSearchUsers(listSuggestDefault);
    // }

    try {
      const res = await getDataAPI(`search?username=${value}`, auth.token);
      if (value.length > 0) {
        setSearch(true);
        setSearchUsers(res.data.users);
      } else {
        setSearchUsers(listSuggestDefault);
      }
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const isActive = (user) => {
    if (id === user._id) return "active";
    return "";
  };

  return (
    <div className="message d-flex">
      <div className="col-md-4 border-right px-0">
        <LeftSide />
      </div>

      <div className="col-md-8 px-0 right_mess">
        <div
          className="d-flex justify-content-center 
                align-items-center flex-column h-100"
        >
          <svg
            aria-label="Direct"
            className="_8-yf5 "
            color="#262626"
            fill="#262626"
            height="96"
            role="img"
            viewBox="0 0 96 96"
            width="96"
          >
            <circle
              cx="48"
              cy="48"
              fill="none"
              r="47"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></circle>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="69.286"
              x2="41.447"
              y1="33.21"
              y2="48.804"
            ></line>
            <polygon
              fill="none"
              points="47.254 73.123 71.376 31.998 24.546 32.002 41.448 48.805 47.254 73.123"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            ></polygon>
          </svg>
          <h3 className="mt-3">Tin nhắn của bạn</h3>
          <div className="note-message">
            Gửi ảnh và tin nhắn riêng tư cho bạn bè.
          </div>
          <div className="btn-sendMessage">
            <>
              <Button variant="primary" onClick={handleShow} className="mt-3">
                Gửi tin nhắn
              </Button>

              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Tin nhắn mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="modal-body-search">
                    <span>Tới: </span>
                    <input
                      type="text"
                      name="search"
                      // value={search}
                      id="search"
                      title="Enter to Search"
                      onChange={
                        (e) => handleSearch(e.target.value)
                        // setSearch(
                        //   e.target.value.toLowerCase().replace(/ /g, "")
                        // )
                      }
                      className="search_input"
                      style={{
                        height: "40px",
                        padding: "20px",
                        width: "100%",
                        border: "none",
                        outline: "none",
                      }}
                    />
                  </div>
                  <div className="modal-body-list mt-3">
                    <p> Gợi ý: </p>
                    {search === false ? (
                      <div className="modal-body-item">
                        {listSuggest.map((user) => (
                          <div
                            key={user._id}
                            className={`message_user ${isActive(user)}`}
                            onClick={() => handleAddUser(user)}
                          >
                            <UserCard user={user} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="modal-body-item">
                        {searchUsers.map((user) => (
                          <div
                            key={user._id}
                            className={`message_user ${isActive(user)}`}
                            onClick={() => handleAddUser(user)}
                          >
                            <UserCard user={user} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Modal.Body>
              </Modal>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
