import { Card, CardBody, Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSoap } from '@fortawesome/free-solid-svg-icons'

export const Home = () => {
  return (
    <>
      <Container>
        <Card>
          <CardBody>
            <FontAwesomeIcon icon={faSoap} style={{ color: "#FA79DA" }} size="3x" />
            <h1>Welcome Back!</h1>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};
