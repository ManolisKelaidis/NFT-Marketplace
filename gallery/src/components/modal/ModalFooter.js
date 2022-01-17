import { Col, Row, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ModalFooter = ({
  confirmButton,
  cancelButton = "ok",
  defaultButtons = true,
  onCancel,
  onSubmit,
  children,
}) => {
  const { t } = useTranslation();

  return (
    <div className="modal__footer">
      {children}

      {defaultButtons && (
        <Row>
          <Col>
            <Button
              block
              className="sign__btn"
              type="button"
              onClick={onCancel}
            >
              {t(cancelButton)}
            </Button>
          </Col>
          {confirmButton && (
            <Col>
              <Button
                block
                className="sign__btn"
                type="button"
                onClick={onSubmit}
              >
                {t(confirmButton)}
              </Button>
            </Col>
          )}
        </Row>
      )}
    </div>
  );
};

export default ModalFooter;
