import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";

export default function ModalForm(props) { 
  const { isOpen, onClose, getData, editObj } = props;
  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });

  const HandleSubmit = async () => {
    try {
      if(editObj.isEdit) editData();
      else submitData();
    } catch (error) {}
  };

  const submitData = async () => {
    const response = await fetch(
      "/api/notes/add",
      {
        method: "POST",
        body: JSON.stringify(notes),
      }
    );
    const result = await response.json();
    if (result?.success) {
      getData();
      onClose();
    }
  };

  const editData = async () => {
    const response = await fetch(
      `/api/notes/edit/${editObj.id}`,
        {
        method: "PATCH",
        body: JSON.stringify({ title: notes?.title, description: notes?.description }),
        }
    );
    const result = await response.json();
    if (result?.success) {
      getData();
      onClose();
    }
  };

  useEffect(() => {
    if(editObj.id) {
      async function fetchingData() {
        const res = await fetch(`/api/notes/${editObj.id}`);
        const listNotes = await res.json();
        setNotes(listNotes?.data)
      }
      fetchingData();
    }
    setNotes({})
  }, [editObj.id]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'lg'} isCentered>
      <ModalOverlay 
        bg='blackAlpha.300'
        backdropFilter='blur(10px)'
      />
      <ModalContent>
        <ModalHeader>{editObj.isEdit ? 'Edit' : 'Add'} Notes</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid gap="5">
            <GridItem>
              <Text>Title</Text>
              <Input
                type="text"
                value={notes?.title || ""}
                onChange={(event) =>
                  setNotes({ ...notes, title: event.target.value })
                }
              />
            </GridItem>
            <GridItem>
            <Text>Description</Text>
              <Textarea
                value={notes?.description || ""}
                onChange={(event) =>
                  setNotes({ ...notes, description: event.target.value })
              }
            />
            </GridItem>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue" onClick={HandleSubmit}>
            {editObj.isEdit ? 'Edit' : 'Save'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

ModalForm.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  getData: PropTypes.func,
  editObj: PropTypes.object,
};