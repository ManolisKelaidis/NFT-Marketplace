import { Button, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const PageError = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleGoBack = () => {
    history.replace("/");
  };

  return (
    <Container>
      <div className="page-404">
        <div className="page-404__wrap">
          <div className="page-404__content">
            <h1 className="page-404__title">404</h1>
            <p className="page-404__text">{t("page-404.message")}</p>
            <Button
              block
              variant="primary"
              className="page-404__btn"
              onClick={handleGoBack}
            >
              {t("page-404.back")}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PageError;
