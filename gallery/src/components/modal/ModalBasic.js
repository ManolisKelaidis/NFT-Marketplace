import { Row, Col, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { ReactComponent as Close } from "../../assets/img/icons/close.svg";

import "./Modal.scss";

const ModalBasic = ({ title, show, onClose, children }) => {
  const { t } = useTranslation();

  return (
    <>
      {show ? (
        <div className="modal-basic">
          <div id="modal-item" className="modal">
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content modal--form">
                <div className="sign__title">
                  <Container>
                    <Row className="align-items-center justify-content-between">
                      <Col>
                        <div>{t(title)}</div>
                      </Col>
                      <Col className="text-right">
                        <button
                          className="modal__close"
                          onClick={onClose}
                          type="button"
                        >
                          <Close />
                        </button>
                      </Col>
                    </Row>
                  </Container>
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ModalBasic;
