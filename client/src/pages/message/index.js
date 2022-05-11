import React from "react";
import { useSelector } from "react-redux";
import LeftSide from "../../components/message/LeftSide";

const Message = () => {
  const { auth } = useSelector((state) => state);
  console.log(auth);

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
            class="_8-yf5 "
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            ></circle>
            <line
              fill="none"
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="2"
              x1="69.286"
              x2="41.447"
              y1="33.21"
              y2="48.804"
            ></line>
            <polygon
              fill="none"
              points="47.254 73.123 71.376 31.998 24.546 32.002 41.448 48.805 47.254 73.123"
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="2"
            ></polygon>
          </svg>
          <h3 className="mt-3">Tin nhắn của bạn</h3>
          <div className="note-message">
            Gửi ảnh và tin nhắn riêng tư cho bạn bè.
          </div>

          <div className="btn-sendMessage">
            <button
              type="button"
              className="btn btn-primary mt-3"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              Gửi tin nhắn
            </button>
            <div
              className="modal fade"
              id="exampleModalCenter"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-wrapper" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">
                      Tin nhắn mới
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="modal-body-search">
                      <span>Tới: </span>
                      <input
                        type="text"
                        name="search"
                        //   value={search}
                        id="search"
                        title="Enter to Search"
                        //   onChange={(e) =>
                        //     setSearch(
                        //       e.target.value.toLowerCase().replace(/ /g, "")
                        //     )
                        //   }
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
                      <div className="modal-body-item"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
