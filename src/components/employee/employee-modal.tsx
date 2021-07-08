import { Modal, ModalHeader, ModalBody, Row, Col, Button, ModalFooter } from 'reactstrap';

type EmployeeModalProps = {
  data: object,
  isOpen: boolean,
  toggle: () => void,
  onSuccess: () => void,
};

export const EmployeeUpdateModal: FunctionComponent<EmployeeModalProps> = ({
  data,
  isOpen,
  toggle,
  onSuccess,
}: EmployeeUpdateModal) => {

  return (
    <>
    Modal Employee
    </>
  );
};
